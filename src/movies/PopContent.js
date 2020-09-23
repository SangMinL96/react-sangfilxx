import React from "react";
import useAsync from "../useAsync";
import Slider from "react-slick";
import styled from "styled-components";
import { Link } from "react-router-dom";
const popURL =
  "https://api.themoviedb.org/3/movie/popular?api_key=cc3aed3fa1f0feef67c25879a942c3db&language=en-US&page=1";
//
//
//styled-components
const PopContainer = styled.div`
  margin-top: 60px;
  height: 300px;
  width: 100%;

  .slick-initialized {
    height: 400px;
    width: 95%;
    margin: 0 auto;
  }
  .slick-active {
    margin-left: 3px;
    margin-right: 3px;
  }
  h3 {
    margin-left: 1.7em;
    margin-top: 2em;
    margin-bottom: 2em;
    font-size: 2rem;
    font-weight: 700;
  }
`;

const PopItems = styled(Link)`
  width: 250px;
  cursor: pointer;
  height: 400px;
  background-size: 100% 100%;
  background-image: url(${(props) =>
    `https://image.tmdb.org/t/p/w500${props.bgImg}`});
  &:hover {
    opacity: 70%;
  }
`;
//
//
//styled-components
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        backgroundColor: "#000000de",
        position: "absolute",
        right: "-46px",
        width: "45px",
        height: "400px",
        fontSize: "1.2rem",
        justifyContent: "center",

        alignItems: "center",
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className: sliderContainer, style, onClick } = props;
  return (
    <div
      className={sliderContainer}
      style={{
        ...style,
        display: "flex",
        backgroundColor: "#000000de",
        position: "absolute",
        left: "-46px",
        zIndex: "999",
        width: "45px",
        height: "400px",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
    />
  );
}

function PopContent() {
  const [state] = useAsync(popURL);
  const { data, error, loading } = state;

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생</div>;
  if (!data) return <div>받아온 데이터가 없습니다 ㅠㅠ</div>;
  const sliderSettings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    variableWidth: true,
    centerMode: false,
  };
  return (
    <PopContainer>
      <h3>인기있는 영화</h3>
      <Slider {...sliderSettings}>
        {data.results.map((item) => (
          <PopItems
            to={`MovieDetail/${item.id}`}
            style={{ width: 360 }}
            key={item.id}
            bgImg={item.poster_path}
          ></PopItems>
        ))}
      </Slider>
    </PopContainer>
  );
}

export default PopContent;
