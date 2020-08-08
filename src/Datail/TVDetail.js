import React from "react";

import styled from "styled-components";
import useAsync from "../useAsync";

//
//
//styled-components
const DetailWallpaper = styled.section`
  width: 100%;
  height: 94vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) =>
    `https://image.tmdb.org/t/p/w500${props.bgImg}`});
  background-size: 100% 100%;
`;
const DetailContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const DetailPoster = styled.div`
  width: 800px;
  height: 600px;
  background-image: url(${(props) =>
    `https://image.tmdb.org/t/p/w500${props.bgImg}`});
  background-size: 100% 100%;
`;
const DetailContent = styled.div`
  width: 50%;
  h5 {
    font-size: 5rem;
    font-weight: 700;
  }
  div {
    margin-top: 0.8em;
    font-size: 1.8rem;
    font-weight: 600;
  }
  p {
    font-size: 1.8rem;
    width: 80%;
    line-height: 1.5;
    margin-top: 0.8em;
  }
`;

//styled-components
//
//

function TVDetail({ match }) {
  const { id } = match.params;
  const detailURL = `https://api.themoviedb.org/3/tv/${id}?api_key=cc3aed3fa1f0feef67c25879a942c3db&language=en-US`;
  const [state] = useAsync(detailURL);
  const { data, error, loading } = state;
  console.log(data);
  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생</div>;
  return (
    <DetailWallpaper bgImg={data && data.backdrop_path}>
      <DetailContainer>
        <DetailPoster bgImg={data && data.poster_path}></DetailPoster>
        <DetailContent>
          <h5>{data && data.name}</h5>
          <div>
            💖{data && data.vote_average}/10 --- 상영시간:
            {data && data.episode_run_time}분
          </div>
          <p>{data && data.overview}</p>
        </DetailContent>
      </DetailContainer>
    </DetailWallpaper>
  );
}

export default TVDetail;
