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
  width: 100%;
  min-height: calc(100vh - 65px);
  padding: 49px 24px;
  @media (max-width: 767px) {
    padding: 0 20px;
  }
`;
