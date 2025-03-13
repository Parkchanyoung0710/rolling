import "../../../../styles/GlobalStyles";
import "../../../../styles/textStyle";
import "../../../../styles/theme";
import ProfileInputName from "./ProfileInputName";
import ProfileInputChoiceImage from "./ProfileInputChoiceImage";
import ProfileInputRelationChoice from "./ProfileInputRelationChoice";
import ProfileInputText from "./ProfileInputText";
import { Bone } from "../Input/Input"; //Input에서 가져온 스타일 컴포넌트
import Button from "../../Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled(Button)`
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#007BFF")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  &:disabled {
    background-color: ${({ theme }) => theme.colors.grayScale[300]};
    color: ${({ theme }) => theme.colors.white};
    cursor: not-allowed;
  }
`;

function ProfileInput() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cardContent, setCardContent] = useState("");
  const [hasError, setHasError] = useState(false); // 에러 상태 추가

  const saveUserName = (value) => {
    setName(value); // name input값을 state에 저장
  };

  const saveCardContent = (value) => {
    setCardContent(value); // cardContent input값을 state에 저장
  };

  const conditon = name.length >= 2 && cardContent.length >= 2 && !hasError; // 에러가 없을 때 버튼 활성화

  // 이동
  function goToPostId() {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    navigate(`/post/${id}`);
  }
  console.log("cardContent 값:", cardContent); // 디버깅 추가 삭제예정
  console.log("name 값:", name);
  return (
    <Bone>
      <ProfileInputName
        value={name} // name을 전달
        onChange={saveUserName} // name을 업데이트하는 함수 전달
        onError={setHasError} // 에러 상태를 부모 컴포넌트로 전달
      />
      <ProfileInputChoiceImage />
      <ProfileInputRelationChoice />
      <ProfileInputText
        value={cardContent} // cardContent를 전달
        onChange={saveCardContent} // cardContent를 업데이트하는 함수 전달
        onError={setHasError} // 에러 상태를 부모 컴포넌트로 전달
      />
      <StyledButton
        variant="primary"
        size={56}
        width={720}
        onClick={goToPostId}
        state={conditon ? "enabled" : "disabled"}
      >
        생성하기
      </StyledButton>
    </Bone>
  );
}

export default ProfileInput;
