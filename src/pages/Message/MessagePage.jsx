import ProfileInput from "../../components/common/Input/ProfileInput/ProfileInput";
import styled from "styled-components";

const Bone = styled.div`
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  padding: 47px 600px;
  min-height: calc(100vh - 65px);
`;

function MessagePage() {
  return (
    <Bone>
      <ProfileInput />
    </Bone>
  );
}

export default MessagePage;
