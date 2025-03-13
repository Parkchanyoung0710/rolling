import { css } from "styled-components";

export const textStyle =
  (size = 16, weight = 400) =>
  ({ theme }) => {
    const typography = theme.Typography?.[size] || {};

    return css`
      font-weight: ${weight};
      font-size: ${typography.fontSize || "16px"}; // 기본값 "16px" 사용
      line-height: ${typography.lineHeight || "normal"}; // 기본값 "normal" 사용
      letter-spacing: ${typography.letterSpacing || "0"}; // 기본값 "0" 사용
    `;
  };
