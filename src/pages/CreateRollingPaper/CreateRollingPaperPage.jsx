import Input from "../../components/common/Input/Input/Input";
import styled from "styled-components";
function CreateRollingPaperPage() {
  return (
    <Bone>
      <Input />
    </Bone>
  );
}

export default CreateRollingPaperPage;

const Bone = styled.div`
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  padding: 57px 600px;
  min-height: calc(100vh - 65px);
`;
