import "../../../../styles/GlobalStyles";
import "../../../../styles/textStyle";
import "../../../../styles/theme";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import "../../../../styles/font.css";
import ProfileInputTextFont from "./ProfileInputTextFont";
import styled from "styled-components";
import { textStyle } from "../../../../styles/textStyle";

import Dropdown from "../../TextFiled/DropDown";

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
  const [selectedFont, setSelectedFont] = useState("noto-sans-kr"); // 기본 폰트 상태

  // 에디터 내용이 변경될 때 호출되는 함수
  const handleEditorChange = (content) => {
    setSermonData((prev) => ({
      ...prev,
      contentText: content, // editorHtml 상태 업데이트
    }));
  };

  // 폰트 선택 시 호출되는 함수
  const handleFontChange = (event) => {
    setSelectedFont(event.target.value);
  };

  const optionData = [
    { value: "noto-sans-kr", label: "Noto Sans" },
    { value: "pretendard-regular", label: "프리텐다드" },
    { value: "nanum-myeongjo", label: "나눔명조" },
    { value: "handletter", label: "손글씨체" },
  ];

  return (
    <Bone>
      <TextStory>내용을 입력해 주세요</TextStory>

      <ProfileInputTextFont
        selectedFont={selectedFont} // 선택된 폰트를 전달
        onChange={handleEditorChange}
      />
      {/* 폰트 선택 드롭다운 추가 */}
      <FontText>폰트 선택</FontText>
      <Dropdown
        styles={DropdownStyle}
        options={optionData}
        onChange={handleFontChange}
        color="#CCCCCC"
        textColor="#555555"
        borderColor="#555555"
      />
    </Bone>
  );
};

export default ProfileInputText;
