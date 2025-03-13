import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import "../../../../styles/font.css";

// 텍트 모듈 설정 창입니다
const Quill = ReactQuill.Quill;
var Font = Quill.import("formats/font");
Font.whitelist = [
  "Poppins",
  "Pretendard-Regular",
  "Maru Buri",
  "NanumSonPyeonJiCe",
];
Quill.register(Font, true);
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
    min-height: 13.125rem;
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

  >>>>>>>71c55ec (버튼 적용전) .ql-snow .ql-picker.ql-font .ql-picker-item,
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
    font-family: "Pretendard-Regular", sans-serif;
  }

  .ql-font-nanum-myeongjo {
    font-family: "Nanum Myeongjo", serif;
  }

  .ql-font-handletter {
    font-family: "Handletter", cursive;
  }
`;

function ProfileInputTextFont({ selectedFont, value, onChange, onError }) {
  const [hasError, setHasError] = useState(false);
  console.log(hasError); // 지울 예저ㅏㅇ
  useEffect(() => {
    if (!value) {
      setHasError(true);
      onError?.(true);
    } else {
      setHasError(false);
      onError?.(false);
    }
  }, [value, onError]);

  useEffect(() => {
    if (selectedFont) {
      document
        .querySelector(".ql-editor")
        ?.style.setProperty("font-family", selectedFont);
    }
  }, [selectedFont]);

  const handleChange = (content) => {
    if (typeof content === "string") {
      onChange?.(content);
    } else {
      console.warn("handleChange received unexpected value:", content);
    }
  };

  return (
    <EditorWrapper>
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={handleChange}
        placeholder="내용을 입력하세요..."
        modules={{
          toolbar: {
            container: [
              ["bold", "italic", "underline"],
              ["blockquote", "code-block"],
              [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
              [{ header: 1 }, { header: 2 }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
            ],
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
      />
    </EditorWrapper>
  );
}

export default ProfileInputTextFont;
