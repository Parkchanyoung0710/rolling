import "../../../styles/GlobalStyles";
import "../../../styles/textStyle";
import "../../../styles/theme";
import styled from "styled-components";
import { textStyle } from "../../../styles/textStyle";

function Input() {
  return (
    <Bone>
      <NameInput />
      <ChoiceText />
      <ChoiceButton />
      <a href="/post/1/message" target="_blank" className="privacy">
        이동
      </a>
    </Bone>
  );
}

export default Input;

const Bone = styled.div`
  margin: 3.562rem auto auto auto;
  width: 45rem;
  height: 33.875rem;
`;
// NameInput 컴포넌트
function NameInput() {
  return (
    <>
      <ToText>To.</ToText>
      <ToLabel>
        <ToInput placeholder="받는 사람 이름을 입력해 주세요" />
      </ToLabel>
    </>
  );
}
const ToText = styled.div`
  ${(props) => textStyle(24, 700)(props)}
  margin-bottom: 0.75rem;
  height: 2.625rem;
`;
const ToLabel = styled.label`
  display: block;
  border: 1px solid #cccccc;
  width: 45rem;
  height: 3.125rem;
  border-radius: 0.5rem;
  position: relative;
  /* input이 포커스를 받으면 label에 스타일 적용 */
  &:focus-within {
    border: 1px solid #00a2fe;
    box-shadow: 0 0 5px rgba(0, 162, 254, 0.5); /* 포커스 시 테두리 그림자 추가 */
  }
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
// ChoiceText 컴포넌트
function ChoiceText() {
  return (
    <TextBone>
      <BackgroundText>배경화면을 선택해 주세요.</BackgroundText>
      <BackgroundChoice>
        컬러를 선택하거나, 이미지를 선택할 수 있습니다.
      </BackgroundChoice>
    </TextBone>
  );
}
const TextBone = styled.div`
  height: 4.125rem;
  margin: 3.125rem auto 1.5rem 0;
`;
const BackgroundText = styled.div`
  ${(props) => textStyle(24, 700)(props)}
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
  height: 2.25rem;
`;
const BackgroundChoice = styled.div`
  ${(props) => textStyle(16, 400)(props)}
  display: flex;
  align-items: center;
  color: #555555;
`;
// ChoiceButton 컴포넌트
function ChoiceButton() {
  return (
    <>
      <ChoiceBtn>버튼</ChoiceBtn>
    </>
  );
}
const ChoiceBtn = styled.button`
  width: 6.1rem;
  height: 2.5rem;
  background-color: #2f8ca8;
`;
