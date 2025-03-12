import "../../../styles/GlobalStyles";
import "../../../styles/textStyle";
import "../../../styles/theme";
import styled from "styled-components";
import ToggleButton from "../Button/ToggleButton";
import { useState } from "react";
import InputName from "./InputName";
import InputChoiceText from "./InputChoiceText";
import ColorPicker from "./Picker/ColorPicker";
import ImgPicker from "./Picker/ImgPicker";
import Button from "../Button/Button";

const Bone = styled.div`
  margin: 3.562rem auto auto auto;
  width: 45rem;
  height: 33.875rem;
`;

const Picker = styled.div`
  width: 45rem;
  height: 10.5rem;
`;

const PostMove = styled.a`
  margin-top: 4.313rem;
  display: block;
  width: 45rem;
  height: 28px;
`;

function Input() {
  const [selected, setSelected] = useState(0);
  const [name, setName] = useState("");
  const [cardContent, setCardContent] = useState("");

  const handleToggle = (index) => {
    setSelected(index);
    console.log("Selected index:", index);
  };

  const isButtonDisabled = !(name && cardContent);

  return (
    <Bone>
      <InputName value={name} onChange={(e) => setName(e.target.value)} />
      <InputChoiceText
        value={cardContent}
        onChange={(e) => setCardContent(e.target.value)}
      />
      <ToggleButton
        options={["컬러", "이미지"]}
        defaultSelected={0}
        onToggle={handleToggle}
      />
      <Picker>
        {selected === 0 && <ColorPicker />}
        {selected === 1 && <ImgPicker />}
      </Picker>
      <PostMove
        href="http://localhost:5173/post/1/message"
        target="_blank"
        className="privacy"
      >
        <Button
          variant="primary"
          size="18"
          width={720}
          height={56}
          borderRadius={12}
          padding={20}
          disabled={isButtonDisabled}
        >
          생성하기
        </Button>
      </PostMove>
    </Bone>
  );
}

export default Input;
