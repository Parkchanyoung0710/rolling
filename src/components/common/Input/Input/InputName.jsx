import "../../../../styles/GlobalStyles";
import "../../../../styles/textStyle";
import "../../../../styles/theme";
import styled from "styled-components";
import { useState } from "react";
import { textStyle } from "../../../../styles/textStyle";

const ToText = styled.div`
  ${(props) => textStyle(24, 700)(props)}
  margin-bottom: 0.75rem;
  height: 2.625rem;
`;

const ToLabel = styled.label.withConfig({
  shouldForwardProp: (prop) => prop !== "error", // "error" prop은 DOM으로 전달되지 않음
})`
  display: block;
  border: 1px solid #cccccc;
  width: 45rem;
  height: 3.125rem;
  border-radius: 0.5rem;
  position: relative;
  /* input이 포커스를 받으면 label에 스타일 적용 */
  &:focus-within {
    border: 1px solid #00a2fe;
    box-shadow: 0 0 5px rgba(0, 162, 254, 0.5);
  }

  ${(props) =>
    props.$error &&
    `  /* $error로 처리 */
    border: 1px solid red;
    box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
    
  `}
`;

const ToInput = styled.input`
  ${(props) => textStyle(16, 400)(props)}
  border: none;
  color: #555555;
  width: 43rem;
  height: 1.625rem;
  margin: 0.75rem 1rem;
  outline: none;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 0.25rem;
  position: absolute;
`;

function InputName() {
  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleBlur = () => {
    if (!inputValue) {
      setHasError(true); // 값이 없으면 에러 상태로 변경
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value) {
      setHasError(false); // 값이 입력되면 에러 상태를 초기화
    }
  };

  return (
    <>
      <ToText>To.</ToText>
      <ToLabel $error={hasError}>
        {" "}
        {/* $error로 수정 */}
        <ToInput
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="이름을 입력해 주세요"
        />
      </ToLabel>
      {hasError && <ErrorMessage>이름을 입력해 주세요.</ErrorMessage>}
    </>
  );
}

export default InputName;
