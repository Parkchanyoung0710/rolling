import styled from "styled-components";

import arrowLeftIcon from "../../../assets/images/arrow-left.png";
import arrowRightIcon from "../../../assets/images/arrow-right.png";

const ArrowButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(
    255,
    255,
    255,
    0.5
  ); // 색깔만 바꿨어요 조금만 더 투명으로
  border: 1px solid ${({ theme }) => theme.colors.grayScale[300]};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(4px);
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayScale[100]};
  }
`;

const imageMap = {
  left: arrowLeftIcon,
  right: arrowRightIcon,
};

const ArrowButton = ({ direction = "left", onClick }) => {
  return (
    <ArrowButtonWrapper onClick={onClick}>
      <img
        src={imageMap[direction]}
        alt={`${direction} arrow`}
        style={{ width: 16, height: 16 }}
      />
    </ArrowButtonWrapper>
  );
};

export default ArrowButton;
