import "../../../styles/GlobalStyles";
import "../../../styles/textStyle";
import "../../../styles/theme";
import styled from "styled-components";
import { textStyle } from "../../../styles/textStyle";

function ProfileInput() {
  return (
    <Bone>
      <NameInput />
      <ChoiceImg />
      <RelationChoice />
      <TextInput />
      <FontChoice />
    </Bone>
  );
}

export default ProfileInput;

const Bone = styled.div`
  margin: 3.562rem auto auto auto;
  width: 45rem;
  height: 33.875rem;
`;
// NameInput 컴포넌트
function NameInput() {
  return (
    <>
      <ToText>From.</ToText>
      <ToLabel>
        <ToInput placeholder="이름을 입력해 주세요" />
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

function ChoiceImg() {
  return (
    <>
      <ToText>From.</ToText>
      <ToLabel>
        <ToInput placeholder="이름을 입력해 주세요" />
      </ToLabel>
    </>
  );
}
function RelationChoice() {
  return (
    <>
      <ToText>From.</ToText>
      <ToLabel>
        <ToInput placeholder="이름을 입력해 주세요" />
      </ToLabel>
    </>
  );
}
function TextInput() {
  return (
    <>
      <ToText>From.</ToText>
      <ToLabel>
        <ToInput placeholder="이름을 입력해 주세요" />
      </ToLabel>
    </>
  );
}
function FontChoice() {
  return (
    <>
      <ToText>From.</ToText>
      <ToLabel>
        <ToInput placeholder="이름을 입력해 주세요" />
      </ToLabel>
    </>
  );
}
