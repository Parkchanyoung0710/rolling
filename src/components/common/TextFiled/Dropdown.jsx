import Select from "react-select";
import { useState } from "react";

const Dropdown = ({ options, onChange, color, textColor, borderColor }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    onChange(selectedOption); // 부모 컴포넌트에 선택된 값 전달
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: 320,
      height: 50,
      borderRadius: 8,
      borderColor: state.isFocused
        ? `${borderColor || "#555555"} !important` // 부모로부터 받은 borderColor 또는 기본값을 사용, !important 추가
        : `${color || "#CCCCCC"} !important`, // 부모로부터 받은 color 또는 기본값을 사용, !important 추가
      boxShadow: state.isFocused
        ? `0 0 0 2px ${borderColor || "#555555"} !important`
        : "none !important", // 포커스 상태가 아닐 때는 box-shadow 없앰, !important 추가
      outline: "none !important", // 포커스 시 outline 제거, !important 추가
    }),

    indicatorSeparator: () => ({ display: "none" }), // 분리선 제거
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#f0f0f0" // focus 되었을 때 배경색
        : "white", // 기본 배경
      color: state.isSelected
        ? "#555555" // 선택된 옵션의 텍스트 색상
        : state.isFocused
        ? "#333333" // focus 상태일 때 텍스트 색상
        : textColor || "black", // 기본 텍스트 색상
      transition: "background-color 0.3s ease, color 0.3s ease", // 애니메이션 효과
    }),

    singleValue: (provided) => ({
      ...provided,
      color: textColor || "#555555",
      transition: "color 0.3s ease", // 글자색 변화 부드럽게
    }),

    menu: (provided) => ({
      ...provided,
      width: 320,
    }),

    indicatorsContainer: (provided) => ({
      ...provided,
      padding: 0, // 오른쪽 아이콘과 텍스트 사이 간격 제거
    }),
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      styles={customStyles} // 부모 컴포넌트에서 전달된 스타일 적용
      isSearchable={false}
    />
  );
};

export default Dropdown;
