import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const SearchWallpaper = styled.section``;
const SearchItems = styled.div``;
const SearchForm = styled.form``;
const SearchItem = styled.div`
  width: 500px;
  height: 500px;
  color: white;
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

  let jokeComponents = movies.map((movie, index) => {
    return <SearchItems key={movie.id}>{movie.title}</SearchItems>;
  });

  return (
    <>
      <SearchWallpaper fluid>
        <SearchForm id="search-form">
          <h4>Dad Jokes</h4>
          <input
            type="text"
            placeholder="검색어"
            ref={focusSearch}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          ></input>
        </SearchForm>
        <SearchItem>{jokeComponents}</SearchItem>
      </SearchWallpaper>
    </>
  );
}

export default Search;

// const searchValue = useInput("");

// const { value } = searchValue;
// const [num, setNum] = useState(
//   `https://api.themoviedb.org/3/search/movie?api_key=cc3aed3fa1f0feef67c25879a942c3db&language=en-US&query=a&page=1&include_adult=false`
// );
// const [state, fatchData] = useAsync(num, [], false);
// const { data, error, loading } = state;
// if (loading) return <div>로딩중...</div>;
// if (error) return <div>에러가 발생</div>;

// <SearchWallpaper>
// <SearchContainer>
//   <SearchSubmit>
//     <SearchInput
//       type="text"
//       placeholder="검색어를 입력해주세요."
//       {...searchValue}
//     />
//     <button onClick={fatchData}>찾기</button>
//   </SearchSubmit>
//   {data &&
//     data.results.map((item) => (
//       <SearchItme
//         to={`Detail/${item.id}`}
//         key={item.id}
//         bgImg={item.poster_path}
//       >
//         {item.title}
//       </SearchItme>
//     ))}
// </SearchContainer>
// </SearchWallpaper>
