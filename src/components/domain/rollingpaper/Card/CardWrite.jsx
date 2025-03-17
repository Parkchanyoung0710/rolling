import React from "react";
import styled from "styled-components";
import { textStyle } from "../../../../styles/textStyle";
import { formatDate } from "../../../../utils/datetime";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../../../styles/font.css";

const Quill = ReactQuill.Quill;
var Font = Quill.import("formats/font");
Font.whitelist = [
  "Noto Sans KR",
  "Pretendard",
  "나눔명조",
  "나눔손글씨 손편지체",
];
const EditorWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !["$textAlign", "$fontFamily"].includes(prop),
})`
  .ql-editor {
    width: 336px;
    min-height: 106px;
    font-size: 1rem !important;
    line-height: 28px;
    padding: 16px 0;
    background: #fff;
    font-family: ${(props) => props.$fontFamily || "Noto Sans KR"};
    text-align: ${(props) => props.$textAlign || "left"};
  }

  .ql-picker.ql-font {
    width: 150px;
    min-width: 150px;
    text-align: ${({ $textAlign }) => $textAlign || "left"};
  }

  .ql-picker.ql-font .ql-picker-item,
  .ql-picker.ql-font .ql-picker-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: ${({ $textAlign }) => $textAlign || "left"};
  }

  .ql-container.ql-snow {
    border: none;
    text-align: ${({ $textAlign }) => $textAlign || "left"};
  }

  .ql-editor p {
    font-family: ${({ $fontFamily }) => $fontFamily} !important;
    ${(props) => textStyle(18, 400)(props)}
  }
  .ql-snow .ql-editor h2 {
    font-size: 1rem;
  }
`;

const CardContainer = styled.div`
  width: 384px;
  height: 280px;
  background: #ffffff;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 28px 24px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 15px;
`;

const ProfileImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin-right: 8px;
`;

const NameWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 24px;
`;

const From = styled.div`
  ${(props) => textStyle(20, 400)(props)}
`;

const Name = styled.div`
  ${(props) => textStyle(20, 700)(props)}
`;

const Tag = styled.div`
  ${(props) => textStyle(14, 400)(props)}
  background: #e0f7fa;
  color: #00796b;
  width: 41px;
  height: 20px;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Date = styled.div`
  margin-top: auto;
  font-size: 12px;
  color: #757575;
  text-align: left;
`;

const CardWrite = ({ message }) => {
  if (!message) return null;

  const textAlign = "left";
  const fontFamily = message.font || "Noto Sans KR";
  return (
    <CardContainer>
      <Header>
        <ProfileImage src={message.profileImageURL} alt="Profile" />
        <div>
          <NameWrap>
            <From>From.</From>
            <Name>{message.sender}</Name>
          </NameWrap>
          <Tag>{message.relationship}</Tag>
        </div>
      </Header>
      <EditorWrapper
        $fontFamily={fontFamily || "Noto Sans KR"}
        $textAlign={textAlign}
      >
        <ReactQuill
          theme="snow"
          value={message.content || ""}
          readOnly={true}
          modules={{
            toolbar: false, // 툴바를 없앰
          }}
          formats={[
            "bold",
            "italic",
            "underline",
            "blockquote",
            "code-block",
            "header",
            "align",
            "color",
            "background",
            "list",
            "font",
          ]}
        />
      </EditorWrapper>
      <Date>{formatDate(message.createdAt)}</Date>
    </CardContainer>
  );
};

export default CardWrite;
