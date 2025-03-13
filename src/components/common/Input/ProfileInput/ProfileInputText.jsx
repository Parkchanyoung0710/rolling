import "../../../../styles/GlobalStyles";
import "../../../../styles/textStyle";
import "../../../../styles/theme";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import "../../../../styles/font.css";
import ProfileInputTextFont from "./ProfileInputTextFont";
import styled from "styled-components";
import { textStyle } from "../../../../styles/textStyle";
import Dropdown from "./DropDown";

const Bone = styled.div`
  margin: 3.125rem auto;
  width: 44.813rem;
  height: 19.25rem;
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

function ProfileInputText() {
  const options = ["Noto Sans", "프리텐다드", "나눔명조", "손글씨체"];
  const [selectedOption, setSelectedOption] = useState("Noto Sans");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <Bone>
      <RelationText>내용을 입력해 주세요</RelationText>
      <ProfileInputTextFont />
      <DropdownBox>
        <RelationText>폰트 선택</RelationText>
        <Dropdown
          currentValue={selectedOption}
          options={options}
          onSelect={handleOptionSelect}
        />
      </DropdownBox>
    </Bone>
  );
}

export default ProfileInputText;
