import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

// 툴바 크기 설정 (기존 코드 그대로 유지)
const Size = ReactQuill.Quill.import("formats/size");

Size.defaultSize = "16px";
ReactQuill.Quill.register(Size, true);

// Styled-components로 에디터 스타일링
const EditorWrapper = styled.div`
  .ql-toolbar {
    background: #eeeeee;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    padding: 10px;
  }

  .ql-toolbar button {
    border: none;
    margin: 2px;
    padding: 6px;
    border-radius: 4px;
    transition: background 0.2s ease-in-out;
  }

  .ql-toolbar button:hover {
    background: #ddd;
  }

  .ql-editor {
    min-height: 400px;
    font-size: 16px !important;
    line-height: 1.6;
    padding: 16px;
    background: #fff;
    border-radius: 8px;
  }
  .ql-snow .ql-picker.ql-font {
    width: 150px; /* 원하는 너비 값으로 변경 */
    min-width: 150px; /* 최소 너비 설정 */
  }

  .ql-snow .ql-picker.ql-font .ql-picker-item,
  .ql-snow .ql-picker.ql-font .ql-picker-label {
    white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 설정 */
    overflow: hidden;
    text-overflow: ellipsis; /* 넘치는 텍스트는 '...'으로 표시 */
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Poppins"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Poppins"]::before {
    font-family: "Poppins", cursive;
    content: "Poppins";
  }

  .ql-snow
    .ql-picker.ql-font
    .ql-picker-label[data-value="Pretendard-Regular"]::before,
  .ql-snow
    .ql-picker.ql-font
    .ql-picker-item[data-value="Pretendard-Regular"]::before {
    font-family: "Pretendard-Regular", cursive;
    content: "Pretendard-Regular";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Maru Buri"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Maru Buri"]::before {
    font-family: "Maru Buri", cursive;
    content: "Maru Buri";
  }

  .ql-snow
    .ql-picker.ql-font
    .ql-picker-label[data-value="NanumSonPyeonJiCe"]::before,
  .ql-snow
    .ql-picker.ql-font
    .ql-picker-item[data-value="NanumSonPyeonJiCe"]::before {
    font-family: "NanumSonPyeonJiCe", cursive;
    content: "NanumSonPyeonJiCe";
  }

  .ql-font-poppins {
    font-family: "Poppins", sans-serif;
  }

  .ql-font-pretendard {
    font-family: "Pretendard Variable", Pretendard, -apple-system,
      BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
      "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }

  .ql-font-nanum-myeongjo {
    font-family: "Nanum Myeongjo", serif;
  }

  .ql-font-handletter {
    font-family: "Handletter", cursive;
  }
`;

function ProfileInputTextFont({ selectedFont, onChange }) {
  const [editorHtml, setEditorHtml] = useState(
    '<p style="font-size: 16px;"></p>'
  );

  const handleChange = (content) => {
    setEditorHtml(content);
    if (onChange) {
      onChange(content);
    }
  };

  render() {
    const { selectedFont } = this.props; // 선택된 폰트

  return (
    <EditorWrapper>
      <ReactQuill
        theme="snow"
        onChange={handleChange}
        value={editorHtml}
        placeholder="내용을 입력하세요..."
        modules={{
          toolbar: {
            container: [
              ["bold", "italic", "underline"], // 텍스트 스타일
              ["blockquote", "code-block"],
              [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
              [{ header: 1 }, { header: 2 }], // 헤더 크기
              [{ indent: "-1" }, { indent: "+1" }], // 들여쓰기 조정
              [{ color: [] }, { background: [] }], // 색상 선택
              [{ align: [] }], // 정렬
            ],
          },
        }}
        formats={[
          "bold",
          "italic",
          "underline",
          "header",
          "align",
          "color",
          "background",
          "list",
        ]}
        className={`ql-font-${selectedFont}`} // 동적으로 선택된 폰트 클래스 적용
      />
    </EditorWrapper>
  );
}

export default ProfileInputTextFont;
