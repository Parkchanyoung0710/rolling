import { css } from "styled-components";

export const textStyle =
  (size = 16, weight = 400) =>
  (props) =>
    css`
      font-weight: ${weight};
      font-size: ${props.theme.Typography[size]?.fontSize || "16px"};
      line-height: ${props.theme.Typography[size]?.lineHeight || "normal"};
      letter-spacing: ${props.theme.Typography[size]?.letterSpacing || "0"};
    `;
