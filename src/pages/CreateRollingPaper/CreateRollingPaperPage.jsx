import InformationBar from "../../components/common/InformationBar/InformationBar";
import Input from "../../components/common/Input/Input/Input";
import styled, { css } from "styled-components";
function CreateRollingPaperPage() {
  return (
    <>
      <Bone>
        <Input />
      </Bone>
    </>
  );
}

export default CreateRollingPaperPage;

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bone = styled.div`
  ${flexCenter}
`;
