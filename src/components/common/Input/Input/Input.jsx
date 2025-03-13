import "../../../../styles/GlobalStyles";
import "../../../../styles/textStyle";
import "../../../../styles/theme";
import styled from "styled-components";
import ToggleButton from "../../Button/ToggleButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동
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

const PostMove = styled.a`
  margin-top: 4.313rem;
  display: block;
  width: 45rem;
  height: 28px;
`;

const StyledButton = styled(Button)`
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#007BFF")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

// To 전체적인 컴포넌트
function Input() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [name, setName] = useState("");
  const [cardContent, setCardContent] = useState("");

  const handleToggle = (index) => {
    console.log("Selected index:", index); // 로그 추가
    setSelected(index);
  };

  // 이름과 카드 내용이 모두 있어야 버튼 활성화
  const isButtonDisabled = !(name && cardContent);

  // 이름과 카드 내용이 모두 있을 때만 navigate 호출
  const handleCreateRollingPaper = () => {
    if (isButtonDisabled) return; // 버튼이 비활성화되면 아무 동작도 하지 않음

    const newId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    console.log("새로운 ID:", newId); // ID 생성 확인
    navigate(`/post/${newId}/message`);
  };

  return (
    <Bone>
      <InputName value={name} onChange={setName} />
      <InputChoiceText />
      <ToggleButton
        options={["컬러", "이미지"]}
        defaultSelected={0}
        onToggle={handleToggle} // 색상 또는 이미지 선택 토글
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
        disabled={isButtonDisabled}
        onClick={handleCreateRollingPaper}
      >
        생성하기
      </StyledButton>
    </Bone>
  );
}

export default Input;
