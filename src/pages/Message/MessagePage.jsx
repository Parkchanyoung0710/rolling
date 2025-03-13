import ProfileInput from "../../components/common/Input/ProfileInput/ProfileInput";
import styled from "styled-components";

const Bone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function MessagePage() {
  return (
    <Bone>
      <ProfileInput />
    </Bone>
  );
}

export default MessagePage;
