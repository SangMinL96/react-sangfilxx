import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SearchWallpaper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchForm = styled.form`
  margin-top: 2em;
  input {
    padding-left: 20px;
    padding-right: 20px;
    width: 400px;
    height: 50px;
    border: none;
    outline: none;
    border-radius: 30px;
    font-size: 1.2rem;
    box-shadow: 0px 1px 5px 2px rgba(255, 255, 255, 0.8);
    &::placeholder {
      font-size: 1.2rem;
      font-weight: 700;
      color: #020202;
    }
  }
`;
const SearchItems = styled.div`
  color: white;
  padding-top: 6em;
  margin: 0 auto;
  width: 95%;
  display: grid;
  grid-template-columns: repeat(8, 6fr);
  grid-gap: 60px;
`;
const SearchItem = styled(Link)`
  cursor: pointer;
  width: 170px;
  height: 150px;
  position: relative;
  background-image: url(${(props) =>
    `https://image.tmdb.org/t/p/w500${props.bgImg}`});
  background-size: 100% 100%;
  &:hover {
    opacity: 70%;
    transform: scale(1.08);
  }
  div {
    font-size: 1.1rem;
    position: absolute;
    top: -20%;
  }
`;

function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovie] = useState([]);
  const focusSearch = useRef(null);

  useEffect(() => {
    focusSearch.current.focus();
  }, []);

  const getMovie = async (query) => {
    const results = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=cc3aed3fa1f0feef67c25879a942c3db&language=en-US&query=${query}&page=1&include_adult=false`
    );
    const movieData = await results.json();
    return movieData.results;
  };
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    let currentQuery = true;
    const controller = new AbortController();
    const loadMovies = async () => {
      if (!query) return setMovie([]);

      await sleep(350);
      if (currentQuery) {
        const movies = await getMovie(query, controller);
        setMovie(movies);
      }
    };
    loadMovies();

    return () => {
      currentQuery = false;
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <SearchWallpaper fluid>
        <SearchForm id="search-form">
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            ref={focusSearch}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          ></input>
        </SearchForm>
        <SearchItems>
          {movies.map((item) => (
            <SearchItem to={`Detail/${item.id}`} bgImg={item.poster_path}>
              <div>{item.title}</div>
            </SearchItem>
          ))}
        </SearchItems>
      </SearchWallpaper>
    </>
  );
}

export default Search;
