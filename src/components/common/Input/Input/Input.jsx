import "../../../../styles/GlobalStyles";
import "../../../../styles/textStyle";
import "../../../../styles/theme";
import styled from "styled-components";
import ToggleButton from "../../Button/ToggleButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputName from "./InputName";
import InputChoiceText from "./InputChoiceText";
import ColorPicker from "../Picker/ColorPicker";
import ImgPicker from "../Picker/ImgPicker";
import Button from "../../Button/Button";

export const Bone = styled.div`
  margin: 3.562rem auto;
  width: 45rem;
  height: 33.875rem;
`;

const Picker = styled.div`
  width: 45rem;
  height: 10.5rem;
  margin-bottom: 4.3125rem;
`;

const StyledButton = styled(Button)`
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#007BFF")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  &:disabled {
    background-color: ${({ theme }) => theme.colors.grayScale[300]};
    color: ${({ theme }) => theme.colors.white};
    cursor: not-allowed;
  }
`;

// To 전체적인 컴포넌트
function Input() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [name, setName] = useState("");
  const [cardContent, setCardContent] = useState(null);
  const [hasError, setHasError] = useState(false); // 에러 상태 추가

  const saveUserName = (value) => {
    setName(value); // input값을 state에 저장
  };

  const conditon = name.length >= 2 && Boolean(cardContent) && !hasError; // 에러가 없을 때 버튼 활성화

  const handleToggle = (index) => {
    setSelected(index);
  };

  // 이동
  function goToPostId() {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    navigate(`/post/${id}`);
  }

  console.log("cardContent 값:", cardContent); // 디버깅 추가 삭제예정
  console.log(name);
  return (
    <Bone>
      <InputName
        value={name} // name을 전달
        onChange={saveUserName} // saveUserName 함수 전달
        onError={setHasError} // 에러 상태를 부모 컴포넌트로 전달
      />
      <InputChoiceText />
      <ToggleButton
        options={["컬러", "이미지"]}
        defaultSelected={0}
        onToggle={handleToggle}
      />
      <Picker>
        {selected === 0 && (
          <ColorPicker onSelect={(color) => setCardContent(color)} />
        )}
        {selected === 1 && (
          <ImgPicker onSelect={(img) => setCardContent(img)} />
        )}
      </Picker>
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

export default Input;
