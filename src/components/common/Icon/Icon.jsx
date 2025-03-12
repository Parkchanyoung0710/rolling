import React from "react";
import * as svg from "../../../assets/icon";
import styled from "styled-components";

const Icon = ({ name, size, className, color = "currentColor", ...props }) => {
  return (
    <Wrapper $size={size} className={className}>
      {React.createElement(svg[name], {
        width: "100%",
        height: "100%",
        fill: color,
        ...props,
      })}
    </Wrapper>
  );
};

export default Icon;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
`;
