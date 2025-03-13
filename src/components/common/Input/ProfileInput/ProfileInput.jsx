import "../../../../styles/GlobalStyles";
import "../../../../styles/textStyle";
import "../../../../styles/theme";
import ProfileInputName from "./ProfileInputName";
import ProfileInputChoiceImage from "./ProfileInputChoiceImage";
import ProfileInputRelationChoice from "./ProfileInputRelationChoice";
import ProfileInputText from "./ProfileInputText";
import { Bone } from "../Input/Input"; //Input에서 가져온 스타일 컴포넌트트

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
