import styled, { css } from "styled-components";

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

const IconButtonWrapper = styled.button`
  padding: 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grayScale[300]};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayScale[100]};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.grayScale[300]};
    cursor: not-allowed;
  }

  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
`;

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

const IconButton = ({ image, width, onClick, state = "enabled" }) => {
  const IconComponent = image ? imageMap[image] : null;
  return (
    <IconButtonWrapper
      onClick={onClick}
      width={width}
      disabled={state === "disabled"}
    >
      <IconComponent
        style={{ width: 24, height: 24 }}
        role="img"
        aria-label={image || "icon"}
      />
    </IconButtonWrapper>
  );
};

export default IconButton;
