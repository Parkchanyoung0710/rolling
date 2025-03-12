import styled from "styled-components";

import plusIcon from "../../../assets/images/plus.png";
import trashIcon from "../../../assets/images/trash.png";

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
  plus: plusIcon,
  trash: trashIcon,
};

const IconButton = ({ image, onClick, state = "enabled" }) => {
  return (
    <IconButtonWrapper
      onClick={onClick}
      width={width}
      disabled={state === "disabled"}
    >
      <img src={imageMap[image]} alt="icon" style={{ width: 24, height: 24 }} />
    </IconButtonWrapper>
  );
};

export default IconButton;
