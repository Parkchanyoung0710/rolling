import "../../../../styles/GlobalStyles";
import "../../../../styles/textStyle";
import "../../../../styles/theme";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import "../../../../styles/font.css";
import ProfileInputTextFont from "./ProfileInputTextFont";
import styled from "styled-components";
import { textStyle } from "../../../../styles/textStyle";
import DropDown from "./DropDown";

// 폰트 변경을 위한 스타일 추가
const FontSelect = styled.select`
  margin-bottom: 10px;
  padding: 5px;
`;

const Bone = styled.div`
  margin-bottom: 50px;
  height: 19.25rem;
`;

const TextStory = styled.div`
  ${(props) => textStyle(24, 700)(props)}
  margin-bottom: 12px;
  height: 2.25rem;
  display: flex;
  align-items: center;
`;
const FontText = styled.div`
  ${(props) => textStyle(24, 700)(props)}
  margin: 3.125rem 0 12px;
  height: 2.25rem;
  display: flex;
  align-items: center;
`;
const DropdownStyle = styled.div`
  ${(props) => textStyle(16, 400)(props)}
  color:#555555;
`;
const ProfileInputText = () => {
  const [sermonData, setSermonData] = useState({
    contentText: "", // 설교 내용 상태
  });
  console.log(sermonData);

  // 에디터 내용이 변경될 때 호출되는 함수
  const handleEditorChange = (content) => {
    setSermonData((prev) => ({
      ...prev,
      contentText: content, // editorHtml 상태 업데이트
    }));
  };

  const options = ["Noto Sans", "프리텐다드", "마루부리", "나눔손편지"];
  const [selectedOption, setSelectedOption] = useState("Noto Sans"); // 기본값

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <Bone>
      <TextStory>내용을 입력해 주세요</TextStory>

      <ProfileInputTextFont
        selectedOption={selectedOption}
        onChange={handleEditorChange}
      />
      {/* 폰트 선택 드롭다운 추가 */}
      <FontText>폰트 선택</FontText>
      <DropDown
        currentValue={selectedOption}
        options={options}
        onSelect={handleOptionSelect}
      />
    </Bone>
  );
};

export default ProfileInputText;
