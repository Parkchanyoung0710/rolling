import { css } from "styled-components";
import { theme } from "../theme";

export const textStyle = (size = 16, weight = 400) => {
  return css`
    font-weight: ${weight};
    font-size: theme.Typography[size].fontsize;
    line-height: theme.Typography[size].lineHeight;
    letter-spacing: theme.Typography[size].letterSpacing;
  `;
};
