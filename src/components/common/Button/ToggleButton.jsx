import { useState } from "react";
import styled, { css } from "styled-components";
import { theme } from "../../../styles/theme";

const ToggleContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.grayScale[100]};
  overflow: hidden;
  width: fit-content;
`;

const ToggleButtonWrapper = styled.button`
  flex: 1;
  min-width: 120px;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: normal;
  text-align: center;
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.grayScale[800]};
  position: relative;
  z-index: 1;

  ${({ active }) =>
    active &&
    css`
      color: ${theme.colors.purple[700]};
      font-weight: 700;
    `}
`;

const ToggleBackground = styled.div`
  position: absolute;
  height: 36px;
  padding: 8px 16px;
  width: calc(50% - 4px);
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.purple[600]};
  border-radius: 6px;
  z-index: 0;
  transition: left 0.2s ease-in-out;
  left: ${({ selected }) => `${selected * 50}%`};
`;

const ToggleButton = ({ options, defaultSelected = 0, onToggle }) => {
  const [selected, setSelected] = useState(defaultSelected);

  return (
    <ToggleContainer>
      <ToggleBackground selected={selected} />
      {options.map((option, index) => (
        <ToggleButtonWrapper
          key={index}
          active={selected === index}
          onClick={() => {
            setSelected(index);
            onToggle(index);
          }}
        >
          {option}
        </ToggleButtonWrapper>
      ))}
    </ToggleContainer>
  );
};

export default ToggleButton;
