import React from "react";
import useAsync from "../useAsync";
import styled from "styled-components";
import { Link } from "react-router-dom";
const popTVURL =
  "https://api.themoviedb.org/3/tv/popular?api_key=cc3aed3fa1f0feef67c25879a942c3db&language=en-US&page=1";

const PopTvWallpaper = styled.div`
  height: 800px;
  h3 {
    margin-left: 1.7em;
    margin-top: 2em;
    font-size: 2rem;
    font-weight: 700;
  }
`;
const PopTvGrid = styled.div`
  padding-top: 2em;
  margin: 0 auto;
  width: 95%;
  display: grid;
  grid-template-columns: repeat(8, 3fr);
  grid-gap: 10px;
`;
const PopTvGridItem = styled(Link)`
  cursor: pointer;
  margin-top: 1em;
  width: 200px;
  height: 200px;

  background-size: 100% 100%;
  background-image: url(${(props) =>
    `https://image.tmdb.org/t/p/w500${props.bgImg}`});

  &:hover {
    opacity: 70%;
    transform: scale(1.08);
  }
`;
function PopTv() {
  const [state] = useAsync(popTVURL);
  const { data, error, loading } = state;
  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생</div>;
  if (!data) return <div>받아온 데이터가 없습니다 ㅠㅠ</div>;
  return (
    <PopTvWallpaper>
      <h3>인기 있는 프로그램</h3>
      <PopTvGrid>
        {data &&
          data.results.map((item) => (
            <PopTvGridItem
              to={`TVDetail/${item.id}`}
              key={item.id}
              bgImg={item.poster_path}
            ></PopTvGridItem>
          ))}
      </PopTvGrid>
    </PopTvWallpaper>
  );
}

export default PopTv;
