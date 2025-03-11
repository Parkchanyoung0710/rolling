import "../../../../styles/GlobalStyles";
import "../../../../styles/textStyle";
import "../../../../styles/theme";
import styled from "styled-components";
import ProfileInputName from "./ProfileInputName";
import ProfileInputChoiceImage from "./ProfileInputChoiceImage";
import ProfileInputRelationChoice from "./ProfileInputRelationChoice";
import ProfileInputText from "./ProfileInputText";

const Bone = styled.div`
  margin: 3.562rem auto auto auto;
  width: 45rem;
  height: 33.875rem;
`;

function ProfileInput() {
  return (
    <Bone>
      <ProfileInputName />
      <ProfileInputChoiceImage />
      <ProfileInputRelationChoice />
      <ProfileInputText />
    </Bone>
  );
}

export default ProfileInput;
