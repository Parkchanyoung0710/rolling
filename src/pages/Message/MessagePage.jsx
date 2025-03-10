import ProfileInput from "../../components/common/Input/ProfileInput";
import styled, { css } from "styled-components";
import { useParams } from "react-router-dom";

function MessagePage() {
  const { id } = useParams();
  return (
    <Bone>
      <ProfileInput />
      <h1>Message Page</h1>
      <p>Post ID: {id}</p> {/* 동적 ID 출력 */}
    </Bone>
  );
}

export default MessagePage;

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bone = styled.div`
  ${flexCenter}
  flex-direction: column; /* 세로 정렬 추가 */
  gap: 1rem; /* 요소 간 간격 추가 */
  width: 100%;
  height: 100vh; /* 전체 화면 높이 */
`;
