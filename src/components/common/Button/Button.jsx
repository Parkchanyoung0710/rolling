import { css, styled } from "styled-components";

import plusIcon from "../../../assets/images/plus.png";
import trashIcon from "../../../assets/images/trash.png";
import shareIcon from "../../../assets/images/share.png";

const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  border: none;

  ${({ $width }) => $width && `width: ${$width}px;`}
  ${({ $height }) => $height && `height: ${$height}px;`} 
  ${({ $padding }) => $padding && `padding: ${$padding}px;`} 
  
  ${({ $borderRadius }) =>
    $borderRadius && `border-radius: ${$borderRadius}px;`} 
  
  ${({ $size, theme }) => {
    const buttonSize = theme.ButtonSize[$size] || theme.ButtonSize.default;
    return css`
      height: ${buttonSize?.height || "40px"};
      font-size: ${buttonSize?.fontSize || "16px"};
      font-weight: ${buttonSize?.fontWeight || "500"};
      padding: ${buttonSize?.padding || "8px 16px"};
    `;
  }}

  ${({ $variant, theme }) =>
    variantStyles[$variant] && variantStyles[$variant](theme)}

  &:hover {
    ${({ $variant, theme }) =>
      hoverStyles[$variant] && hoverStyles[$variant](theme)}
  }

  &:focus {
    ${({ $variant, theme }) =>
      focusStyles[$variant] && focusStyles[$variant](theme)}
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
  primary: (theme) => css`
    background-color: ${theme.colors.purple[700]};
  `,
  secondary: (theme) => css`
    background-color: ${theme.colors.purple[100]};
  `,
  outlined: (theme) => css`
    background-color: ${theme.colors.grayScale[100]};
  `,
};

const focusStyles = {
  primary: (theme) => css`
    border: 2px solid ${theme.colors.purple[900]};
  `,
  secondary: (theme) => css`
    border: 1px solid ${theme.colors.purple[800]};
  `,
  outlined: (theme) => css`
    border: 1px solid ${theme.colors.grayScale[500]};
  `,
};

const imageMap = {
  plus: plusIcon,
  trash: trashIcon,
  share: shareIcon,
};

const Button = ({
  variant = "primary",
  size = "default",
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
      {image && (
        <img
          src={imageMap[image]}
          alt={image}
          style={{ width: 24, height: 24 }}
        />
      )}
      {children}
    </ButtonWrapper>
  );
};

export default Button;
