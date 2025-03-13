import "../../../../styles/GlobalStyles";
import "../../../../styles/textStyle";
import "../../../../styles/theme";
import styled from "styled-components";
import { textStyle } from "../../../../styles/textStyle";

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

// ChoiceText 컴포넌트
function InputChoiceText() {
  return (
    <TextBone>
      <BackgroundText>배경화면을 선택해 주세요.</BackgroundText>
      <BackgroundChoice>
        컬러를 선택하거나, 이미지를 선택할 수 있습니다.
      </BackgroundChoice>
    </TextBone>
  );
}

export default InputChoiceText;
