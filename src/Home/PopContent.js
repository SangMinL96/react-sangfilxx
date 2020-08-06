import React, { useRef } from "react";
import useAsync from "./useAsync";

import styled from "styled-components";

const popURL =
  "https://api.themoviedb.org/3/movie/popular?api_key=cc3aed3fa1f0feef67c25879a942c3db&language=en-US&page=1";

const PopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  background-color: red;
`;
const PopItemContainer = styled.div`
  width: 96%;
  height: 100%;
  position: relative;
`;
const PopItemList = styled.ul`
  height: 100%;
  position: absolute;
  display: flex;
`;
const LeftBtn = styled.div`
  position: absolute;
  width: 40px;
  height: 200px;
  background-color: #000000de;
  color: #070014fa;
  left: -2.2%;
  z-index: 88;
  display: flex;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  align-items: center;
  cursor: pointer;
`;
const RightBtn = styled.div`
  position: absolute;
  width: 40px;
  height: 200px;
  background-color: #000000de;
  color: #070014fa;
  right: -2.2%;
  z-index: 88;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
  cursor: pointer;
`;
const PopItems = styled.li`
  position: relative;
  width: 305px;
  height: 200px;
  background-size: 305px 200px;
  background-image: url(${(props) =>
    `https://image.tmdb.org/t/p/w500${props.bgImg}`});
`;

const silde = (ev) => {
  console.log("안녕");
};
function PopContent() {
  const [state] = useAsync(popURL);
  const { data, error, loading } = state;

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생</div>;

  return (
    <PopContainer>
      <PopItemContainer>
        <PopItemList style={{}}>
          {data &&
            data.results.map((item) => (
              <PopItems key={item.id} bgImg={item.poster_path}>
                {item.title}
              </PopItems>
            ))}
        </PopItemList>
        <LeftBtn onClick={silde}>{`◀`}</LeftBtn>
        <RightBtn>{`▶`}</RightBtn>
      </PopItemContainer>
    </PopContainer>
  );
}

export default PopContent;
