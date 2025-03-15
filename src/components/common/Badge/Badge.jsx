import React from "react";
import styled from "styled-components";
import { textStyle } from "../../../styles/textStyle";

// 관계별 배경색과 글자색 정의
const relationshipColors = {
  지인: { bg: "#FFF0D6", color: "#FF8832" },
  동료: { bg: "#F8F0FF", color: "#861DEE" },
  가족: { bg: "#E4FBDC", color: "#2BA600" },
  친구: { bg: "#E2F5FF", color: "#00A2FE" },
};

const BadgeWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0px 8px;
  border-radius: 4px;
  background-color: ${({ bg }) => bg};
  color: ${({ color }) => color};
  ${textStyle(14, 400)}
`;

const Badge = ({ relationship }) => {
  const { bg, color } = relationshipColors[relationship] || {
    bg: "#F6F6F6",
    color: "#555555",
  };

  return (
    <BadgeWrapper bg={bg} color={color}>
      {relationship}
    </BadgeWrapper>
  );
};

export default Badge;
