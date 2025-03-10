import Input from "../../components/common/Input/Input";

function CreateRollingPaperPage() {
  return (
    <Bone>
      <Input />
    </Bone>
  );
}

export default CreateRollingPaperPage;

import styled, { css } from "styled-components";

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bone = styled.div`
  ${flexCenter}
`;
