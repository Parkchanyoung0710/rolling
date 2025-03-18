import React from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import { textStyle } from "../../../../styles/textStyle";
import "../../../../styles/font.css";

const Quill = ReactQuill.Quill;
var Font = Quill.import("formats/font");
Font.whitelist = [
  "Noto Sans KR",
  "Pretendard",
  "나눔명조",
  "나눔손글씨 손편지체",
];
Quill.register(Font, true);

const EditorWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !["$textAlign", "$fontFamily"].includes(prop),
})`
  .ql-editor {
    width: 500px;
    height: 240px; /* 높이를 고정 */
    font-size: 1rem !important;
    line-height: 28px;
    padding: 16px 0;
    position: relative;
    top: 120px;
    background: #fff;
       font-family: ${(props) => `'${props.$fontFamily || "Noto Sans KR"}'`} !important;
    text-align: ${(props) => props.$textAlign || "left"};
    overflow: auto; 
    white-space: pre-wrap; 
    word-wrap: break-word;
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
   font-family: ${(props) => `'${props.$fontFamily || "Noto Sans KR"}'`} !important;
    ${(props) => textStyle(18, 400)(props)}
  }
    ql-editor h2 {
   font-family: ${(props) => `'${props.$fontFamily || "Noto Sans KR"}'`} !important;
    ${(props) => textStyle(18, 400)(props)}
  }
  .ql-snow .ql-editor h2 {
    font-size: 1rem;
  }
`;
const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* z-index를 높게 설정 */
`;

const ModalContainer = styled.div`
  position: relative;
  width: 600px;
  height: 476px;
  background: #ffffff;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const ConfirmButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 7px 16px;
  gap: 10px;
  position: absolute;
  width: 120px;
  height: 40px;
  left: 240px;
  top: 396px;
  background: #9935ff;
  border-radius: 6px;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: #7a2ecc;
  }

  &:active {
    background: #5c2399;
  }
`;

const DateContainer = styled.div`
  position: absolute;
  width: 70px;
  height: 20px;
  top: 56px;
  left: 484px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap; /* 날짜가 한 줄에 나오도록 설정 */
`;

const InfoContainer = styled.div`
  position: absolute;
  width: 181px;
  height: 56px;
  top: 40px;
  left: 39px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ImageContainer = styled.div`
  box-sizing: border-box;
  width: 56px;
  height: 56px;
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 100px;
  border-width: 1px;
`;

const Name = styled.div`
  font-weight: bold;
  margin-right: 8px;
`;

const Tag = styled.div`
  background: #e0f7fa;
  color: #00796b;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
`;

const Divider = styled.div`
  position: absolute;
  width: 520px;
  height: 1px;
  top: 115px;
  left: 39px;
  background: #eeeeee;
`;

const Modal = ({ onClose, date, imageUrl, name, tag, content, font }) => {
  const textAlign = "left";
  console.log(font)
  const fontFamily = font || "Noto Sans KR";
  return (
    <Background>
      <ModalContainer>
        <InfoContainer>
          <ImageContainer>
            <ProfileImage src={imageUrl} alt="Profile" />
          </ImageContainer>
          <div>
            <Name>{name}</Name>
            <Tag>{tag}</Tag>
          </div>
        </InfoContainer>
        <DateContainer>{date}</DateContainer>
        <Divider />
        <EditorWrapper
                $fontFamily={fontFamily || "Noto Sans KR"}
          $textAlign={textAlign}
                >
                  <ReactQuill
                    theme="snow"
                    value={content || ""}
                    readOnly={true}
                    modules={{
                      toolbar: false,
                      clipboard: {
                        matchVisual: false,
                      },
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
            style={{ fontFamily: fontFamily }} 
                  />
                </EditorWrapper>
        <ConfirmButton onClick={onClose}>확인</ConfirmButton>
      </ModalContainer>
    </Background>
  );
};

export default Modal;
