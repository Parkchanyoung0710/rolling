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
`;

// To 전체적인 컴포넌트
function Input() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [name, setName] = useState("");
  const [cardContent, setCardContent] = useState("");

  const conditon = name.length >= 2 && Boolean(cardContent);
  const saveUserName = (e) => {
    // 이름
    setName(e.target.value);
  };

  console.log(cardContent); // 나중에 지워얗 함

  const handleToggle = (index) => {
    console.log("Selected index:", index); // 로그 추가
    setSelected(index);
  };
  const changeBtnColor = () => {
    setBtnColor(!btnColor);
  };
  // 이동
  function goToPostId() {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    navigate(`/post/${id}`);
  }

  return (
    <Bone>
      <InputName
        defaultValue={name}
        onChange={(e) => {
          saveUserName(e);
        }}
      />
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
        onClick={goToPostId}
        state={conditon ? "enabled" : "disabled"}
      >
        생성하기
      </StyledButton>
    </Bone>
  );
}

export default Input;
