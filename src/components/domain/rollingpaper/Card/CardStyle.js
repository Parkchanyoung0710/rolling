// 스타일 컴포넌트 정의
import styled from "styled-components";
import React from "react";

const CardContainer = styled.div`
  width: 384px;
  height: 280px;
  background: #ffffff;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CircleButton = styled.button`
  position: absolute;
  width: 56px;
  height: 56px;
  left: calc(50% - 56px / 2);
  top: calc(50% - 56px / 2);
  background: #555555;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    background: #444444;
  }

  &:active {
    background: #333333;
  }
`;

const PlusIcon = styled.div`
  position: relative;
  width: 24px;
  height: 24px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: #ffffff;
  }

  &::before {
    width: 3px;
    height: 20.57px;
    left: 10.5px;
    top: 1.71px;
  }

  &::after {
    width: 20.57px;
    height: 3px;
    left: 1.71px;
    top: 10.5px;
  }
`;

const Card = ({ onClick }) => {
  return (
    <CardContainer>
      <CircleButton onClick={onClick}>
        <PlusIcon />
      </CircleButton>
    </CardContainer>
  );
};

export default Card;
