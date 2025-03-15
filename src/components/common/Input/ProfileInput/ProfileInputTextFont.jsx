import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

// 툴바에서 선택할 폰트 목록
const Quill = ReactQuill.Quill;
var Font = Quill.import("formats/font");
Font.whitelist = [
  "Noto Sans KR",
  "Pretendard",
  "NanumMyeongjo",
  "Nanum Pen Script",
];

Quill.register(Font, true);

const EditorWrapper = styled.div`
  .ql-editor {
    min-height: 13.125rem;
    font-size: 16px;
    line-height: 1.6;
    padding: 16px;
    background: #fff;
    border-radius: 8px;
    font-family: ${(props) => props.$fontFamily || "Noto Sans KR"};
    text-align: ${(props) => props.$textAlign || "left"};
  }

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

  .ql-snow .ql-picker.ql-font {
    width: 150px;
    min-width: 150px;
  }

  .ql-snow .ql-picker.ql-font .ql-picker-item,
  .ql-snow .ql-picker.ql-font .ql-picker-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

function ProfileInputTextFont({
  selectedFont,
  selectedAlign,
  value,
  onChange,
}) {
  const handleChange = (content) => {
    if (typeof content === "string") {
      onChange?.(content);
    } else {
      console.warn("handleChange received unexpected value:", content);
    }
  };

  return (
    <EditorWrapper $fontFamily={selectedFont} $textAlign={selectedAlign}>
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={handleChange}
        placeholder="내용을 입력하세요..."
        modules={{
          toolbar: [
            ["bold", "italic", "underline"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
            [{ header: 1 }, { header: 2 }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
          ],
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
  );
}

export default ProfileInputTextFont;
