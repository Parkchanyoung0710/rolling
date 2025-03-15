import "../../../../styles/GlobalStyles";
import "../../../../styles/textStyle";
import "../../../../styles/theme";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import "../../../../styles/font.css";
import ProfileInputTextFont from "./ProfileInputTextFont"; // 외부 모듈
import styled from "styled-components";
import { textStyle } from "../../../../styles/textStyle";
import Dropdown from "./DropDown";

const Bone = styled.div`
  margin: 3.125rem auto 3.875rem;
  width: 44.813rem;
  height: auto;
`;

const RelationText = styled.div`
  ${(props) => textStyle(24, 700)(props)}
  margin-bottom: 0.75rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
`;

const DropdownBox = styled.div`
  margin: 50px 0;
  width: 20rem;
  height: 6.125rem;
`;

const WarningMessage = styled.div`
  color: #4a4a4a;
  position: absolute;
`;

// ProfileInputText 컴포넌트
function ProfileInputText({ value, onChange, onError, onFontSelect }) {
  const [hasError, setHasError] = useState(false);
  const options = [
    "Noto Sans",
    "Pretendard",
    "나눔명조",
    "나눔손글씨 손편지체",
  ];
  console.log(hasError);
  const [selectedOption, setSelectedOption] = useState("Noto Sans");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onFontSelect(option); // 선택된 폰트를 부모에게 전달
  };

  useEffect(() => {
    const isError = !value || value.trim().length === 0;
    setHasError(isError);
    onError(isError); // 부모 컴포넌트로 에러 상태 전달
  }, [value, onError]);

  return (
    <Bone>
      <RelationText>내용을 입력해 주세요</RelationText>
      <ProfileInputTextFont
        value={value}
        onChange={(content) => {
          onChange(content);
        }}
        selectedFont={selectedOption} // 선택된 폰트 전달
      />
      <WarningMessage>한 글자 이상 입력해 주세요.</WarningMessage>
      <DropdownBox>
        <RelationText>폰트 선택</RelationText>
        <Dropdown
          currentValue={selectedOption}
          options={options}
          menuPlacement="auto"
          onSelect={handleOptionSelect}
        />
      </DropdownBox>
    </Bone>
  );
}

export default ProfileInputText;
