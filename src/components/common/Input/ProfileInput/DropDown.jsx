import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { textStyle } from "../../../../styles/textStyle";
import { ArrowDown } from "../../../../assets/images/icon/IconIndex";

const SelectBox = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  position: relative;
  width: 20rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.125rem;
  padding: auto;
  border-radius: 8px;
  background-color: #ffffff;
  align-self: center;
  cursor: pointer;
  border: 1px solid #cccccc;
  transition: border 0.1s ease-in-out;
  ${(props) =>
    props.isOpen &&
    `border: 2px solid #555555;`} /* 목록이 열릴 때 테두리 변경 */
    
  &:hover {
    border: 2px solid #555555;
  }
`;

const Label = styled.label`
  margin-left: 1rem;
  text-align: center;
`;

const IconStyle = styled.label.withConfig({
  shouldForwardProp: (prop) => prop !== "isReversed",
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 1rem;
  cursor: pointer;
  transform: ${(props) =>
    props.$isReversed
      ? "rotate(180deg)"
      : "none"}; /* props 대신 $isReversed로 수정 */
`;

const SelectOptions = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  list-style: none;
  top: 3.8rem;
  left: 0;
  width: 100%;
  border: 1px solid #cccccc;
  padding: 0;
  border-radius: 8px;
  background-color: #ffffff;
  color: #181818;
  ${(props) => textStyle(16, 400)(props)}
  max-height: 300px;
  overflow-y: auto;
  z-index: 1;
`;

const Option = styled.li`
  ${(props) => textStyle(16, 400)(props)}
  padding: 12px 16px;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  &:hover {
    background-color: #f6f6f6;
  }
`;

function DropDown({ currentValue, options, onSelect }) {
  const [isShowOptions, setShowOptions] = useState(false);
  const [selectedValue, setSelectedValue] = useState(currentValue);
  const [isReversed, setIsReversed] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelectOption = (option, e) => {
    e.stopPropagation();
    setSelectedValue(option);
    onSelect(option);
    setShowOptions(false);
    setIsReversed(false);
  };

  // SelectBox 클릭 시 드롭다운 열기/닫기
  const handleSelectBoxClick = (e) => {
    e.stopPropagation(); // SelectBox 클릭 이벤트 전파 방지
    setShowOptions((prev) => !prev);
    setIsReversed((prev) => !prev);
  };

  // ArrowDown 클릭 시 드롭다운 열기/닫기
  const handleArrowDownClick = (e) => {
    e.stopPropagation(); // ArrowDown 클릭 이벤트 전파 방지
    setShowOptions((prev) => !prev);
    setIsReversed((prev) => !prev);
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <SelectBox
      onClick={handleSelectBoxClick}
      $isOpen={isShowOptions}
      ref={dropdownRef}
    >
      <Label>{selectedValue}</Label>
      <IconStyle onClick={handleArrowDownClick} $isReversed={isReversed}>
        <ArrowDown />
      </IconStyle>
      {isShowOptions && (
        <SelectOptions>
          {options.map((option, index) => (
            <Option key={index} onClick={(e) => handleSelectOption(option, e)}>
              {option}
            </Option>
          ))}
        </SelectOptions>
      )}
    </SelectBox>
  );
}

export default DropDown;
