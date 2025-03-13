import "../../../../styles/GlobalStyles";
import "../../../../styles/textStyle";
import "../../../../styles/theme";
import { useState, useEffect } from "react"; // useEffect 추가
import "react-quill/dist/quill.snow.css";
import "../../../../styles/font.css";
import ProfileInputTextFont from "./ProfileInputTextFont";
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

function ProfileInputText({ value, onChange, onError }) {
  const [hasError, setHasError] = useState(false);
  const options = ["Noto Sans", "프리텐다드", "나눔명조", "손글씨체"];
  const [selectedOption, setSelectedOption] = useState("Noto Sans");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    if (value) {
      setHasError(false);
      onError(false); // 에러 상태를 부모로 전달
    }
  }, [value, onError]);

  const handleBlur = () => {
    if (!value) {
      setHasError(true); // 값이 없으면 에러 상태로 변경
      onError(true); // 에러 상태를 부모로 전달
    }
  };

  const handleChange = (content) => {
    console.log("입력된 값:", content);
    onChange(content); // 부모 컴포넌트로 값 전달
  };

  return (
    <Bone>
      <RelationText />
      <ProfileInputTextFont
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <DropdownBox>
        <RelationText>폰트 선택</RelationText>
        <Dropdown
          currentValue={selectedOption}
          options={options}
          menuPlacement="auto"
          onSelect={handleOptionSelect}
        />
        {hasError && <ErrorMessage>내용을 입력해 주세요.</ErrorMessage>}
      </DropdownBox>
    </Bone>
  );
}
export default ProfileInputText;
