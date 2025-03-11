import "../../../styles/GlobalStyles";
import "../../../styles/textStyle";
import "../../../styles/theme";
import styled from "styled-components";
import { textStyle } from "../../../styles/textStyle";

const Bone = styled.div`
  margin: 3.125rem auto 3.125rem auto;
  width: 44.813rem;
  height: 8.875rem;
`;

const RelationText = styled.div`
  ${(props) => textStyle(24, 700)(props)}
  margin-bottom: 0.75rem;
`;


function ProfileInputText() {
  return (
    <Bone>
      <RelationText>내용을 입력해주세요.</RelationText>
    </Bone>
  );
}

export default ProfileInputText;
