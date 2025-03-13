import { useState } from "react";
import styled from "styled-components";
import { Check } from "../../../../assets/images/icon/IconIndex"; // Check 아이콘 불러오기

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
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${(props) => props.color};
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
const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <div>
      <Bone>
        {["#FFE2AD", "#ECD9FF", "#B1E4FF", "#D0F5C3"].map((colorCode) => (
          <Color
            key={colorCode}
            color={colorCode}
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
