import { useState } from "react";
import styled from "styled-components";
import { Check } from "../../../../assets/images/icon/IconIndex"; // Check 아이콘 불러오기

const Bone = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin: 45px 0;
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const Color = styled.div`
  width: 10.5rem;
  height: 10.5rem;
  border: none;
  cursor: pointer;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${(props) => props.color};
  @media (max-width: 768px) {
    width: 154px;
    height: 154px;
  }
`;

const IconWrapper = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #555555;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 토글 버튼 클릭시 컬러에 대한 컴포넌트트
const   ColorPicker = ({ onSelect }) => {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorChange = (color) => {
    setSelectedColor(color);
    onSelect(color);
  };

  const colorMap = {
    beige: "#FFE2AD",
    purple: "#ECD9FF",
    blue: "#B1E4FF",
    green: "#D0F5C3",
  };

  return (
    <div>
      <Bone>
        {Object.keys(colorMap).map((colorCode) => (
          <Color
            key={colorCode}
            color={colorMap[colorCode]}
            onClick={() => handleColorChange(colorCode)}
          >
            {selectedColor === colorCode && (
              <IconWrapper>
                <Check width={24} height={24} />
              </IconWrapper>
            )}
          </Color>
        ))}
      </Bone>
    </div>
  );
};

export default ColorPicker;
