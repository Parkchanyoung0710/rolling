import { css } from "styled-components";

export const textStyle =
  (size = 16, weight = 400) =>
  ({ theme }) => {
    const typography = theme.Typography[size];

    return css`
      font-weight: ${weight};
      font-size: ${typography.fontSize};
      line-height: ${typography.lineHeight};
      letter-spacing: ${typography.letterSpacing}px;
    `;
  };
