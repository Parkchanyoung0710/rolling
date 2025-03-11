import { useState } from "react";
import styled from "styled-components";

const Bone = styled.div`
  width: 45rem;
  height: 10.5rem;
  display: flex;
  justify-content: space-between;
  margin: 2.813rem 0;
`;

const Color = styled.div`
  width: 10.5rem;
  height: 10.5rem;
  border: none;
  cursor: pointer;
  border-radius: 1rem;
  background-color: ${(props) => props.color};
  border: ${(props) => (props.selected ? "4px solid #00a2fe" : "none")};
  box-shadow: ${(props) =>
    props.selected ? "0 0 15px rgba(0, 162, 254, 0.8)" : "none"};
`;

const ColorPicker = () => {
  const [color, setColor] = useState(""); // 선택된 색상

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);
  };

  return (
    <div>
      <Bone>
        {/* 컬러 선택 버튼 */}
        {["#FFE2AD", "#ECD9FF", "#B1E4FF", "#D0F5C3"].map((colorCode) => (
          <Color
            key={colorCode}
            color={colorCode}
            onClick={() => handleColorChange(colorCode)}
          />
        ))}
      </Bone>
    </div>
  );
};

export default ColorPicker;
