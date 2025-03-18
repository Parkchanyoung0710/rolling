import { css, styled } from "styled-components";

import {
  Add,
  ArrowDown,
  Check,
  Deleted,
  Plus,
  Share,
  Close,
  Complete,
  ArrowLeft,
  ArrowRight,
} from "../../../assets/images/icon/IconIndex";

const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  border: none;

  ${({ size, theme }) => {
    const buttonSize = theme.ButtonSize[size];
    return css`
      height: ${buttonSize.height};
      font-size: ${buttonSize.fontSize};
      font-weight: ${buttonSize.fontWeight};
      padding: ${buttonSize.padding};
      border-radius: ${buttonSize.borderRadius};
    `;
  }}

  ${({ variant, theme }) => variantStyles[variant](theme)}

  &:hover {
    ${({ variant, theme }) => hoverStyles[variant](theme)}
  }

  &:focus {
    ${({ variant, theme }) => focusStyles[variant](theme)}
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.grayScale[300]};
    color: ${({ theme }) => theme.colors.white};
    cursor: not-allowed;
  }

  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
`;

const variantStyles = {
  primary: (theme) => css`
    background-color: ${theme.colors.purple[600]};
    color: ${theme.colors.white};
  `,
  secondary: (theme) => css`
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.purple[600]};
    color: ${theme.colors.purple[700]};
  `,
  outlined: (theme) => css`
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.grayScale[300]};
    color: ${theme.colors.grayScale[900]};
  `,
};

const hoverStyles = {
  primary: (theme) =>
    css`
      background-color: ${theme.colors.purple[700]};
    `,
  secondary: (theme) =>
    css`
      background-color: ${theme.colors.purple[100]};
    `,
  outlined: (theme) =>
    css`
      background-color: ${theme.colors.grayScale[100]};
    `,
};

const focusStyles = {
  primary: (theme) =>
    css`
      border: 2px solid ${theme.colors.purple[900]};
    `,
  secondary: (theme) =>
    css`
      border: 1px solid ${theme.colors.purple[800]};
    `,
  outlined: (theme) =>
    css`
      border: 1px solid ${theme.colors.grayScale[500]};
    `,
};

const imageMap = {
  add: Add,
  arrowDown: ArrowDown,
  check: Check,
  trash: Deleted,
  plus: Plus,
  share: Share,
  close: Close,
  complete: Complete,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
};

const Button = ({
  variant = "primary",
  size = 40,
  state = "enabled",
  image = null,
  width,
  children = null,
  onClick,
}) => {
  return (
    <ButtonWrapper
      variant={variant}
      size={size}
      width={width}
      onClick={onClick}
      disabled={state === "disabled"}
    >
      {image &&
        (() => {
          const IconComponent = imageMap[image];
          return <IconComponent style={{ width: 24, height: 24 }} />;
        })()}
      {children}
    </ButtonWrapper>
  );
};

export default Button;
