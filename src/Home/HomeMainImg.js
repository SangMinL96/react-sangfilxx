import React from "react";
import useAsync from "./useAsync";
import styled from "styled-components";
import axios from "axios";

const MainImgContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url(${(props) =>
    `https://image.tmdb.org/t/p/w500${props.bgImg}`});
  background-size: 100% 100%;
`;

const MainImgTitle = styled.h3`
  font-size: 5rem;
  margin-left: 80px;
  font-weight: 600;
`;
const MainImgRating = styled.div`
  margin-left: 80px;
  margin-top: 1em;
  font-size: 1.1rem;
  font-weight: 600;
`;
const MainImgContent = styled.p`
  margin-top: 1em;
  margin-left: 80px;
  width: 600px;
  font-size: 1.5rem;
  line-height: 1.5;
`;

const mainURL =
  "https://api.themoviedb.org/3/movie/583083?api_key=cc3aed3fa1f0feef67c25879a942c3db&language=en-US";

function HomeMainImg() {
  const [state] = useAsync(mainURL);
  const { data, error, loading } = state;
  console.log(data);
  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생</div>;
  if (!data) return "데이터가 없습니다";

  return (
    <>
      <MainImgContainer bgImg={data.backdrop_path}>
        <MainImgTitle>{data.original_title}</MainImgTitle>
        <MainImgRating>
          평점: {data.vote_average}점 상영시간: {data.runtime}분{" "}
        </MainImgRating>
        <MainImgContent>{data.overview}</MainImgContent>
      </MainImgContainer>
    </>
  );
}

export default HomeMainImg;
