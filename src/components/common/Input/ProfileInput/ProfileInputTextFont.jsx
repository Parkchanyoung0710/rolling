import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

// 툴바 크기 설정 (기존 코드 그대로 유지)
const Size = ReactQuill.Quill.import("formats/size");
Size.whitelist = [
  "8px",
  "9px",
  "10px",
  "11px",
  "12px",
  "14px",
  "16px",
  "18px",
  "24px",
  "36px",
  "48px",
  "72px",
  "96px",
];
Size.defaultSize = "16px";
ReactQuill.Quill.register(Size, true);

// Styled-components로 에디터 스타일링
const EditorWrapper = styled.div`
  .ql-editor {
    min-height: 400px;
    font-size: 16px !important;
    line-height: 1.5;
  }

  .ql-font-noto-sans-kr {
    font-family: "Noto Sans KR", sans-serif;
  }

  .ql-font-pretendard-regular {
    font-family: "Pretendard-Regular", sans-serif;
  }

  .ql-font-nanum-myeongjo {
    font-family: "Nanum Myeongjo", serif;
  }

  .ql-font-handletter {
    font-family: "Handletter", cursive;
  }
`;

class ProfileInputTextFont extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorHtml: '<p style="font-size: 16px;"></p>',
    };
  }

  handleChange = (content) => {
    this.setState({ editorHtml: content });
    if (this.props.onChange) {
      this.props.onChange(content);
    }
  };

  render() {
    const { selectedFont } = this.props; // 선택된 폰트

    return (
      <EditorWrapper>
        <ReactQuill
          theme="snow"
          onChange={this.handleChange}
          value={this.state.editorHtml}
          placeholder="내용을 입력하세요..."
          modules={{
            toolbar: {
              container: [
                ["bold", "italic", "underline", "strike"],
                [{ size: Size.whitelist }],
                [
                  {
                    font: [
                      "noto-sans-kr",
                      "pretendard-regular",
                      "nanum-myeongjo",
                      "handletter",
                    ],
                  },
                ],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ align: ["", "center", "right", "justify"] }],
                [{ color: [] }, { background: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }],
                ["blockquote"],
              ],
            },
          }}
          formats={[
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "header",
            "align",
            "color",
            "background",
            "list",
            "indent",
            "blockquote",
          ]}
          style={{ fontFamily: selectedFont }} // 선택된 폰트 스타일 적용
        />
      </EditorWrapper>
    );
  }
}

export default ProfileInputTextFont;
