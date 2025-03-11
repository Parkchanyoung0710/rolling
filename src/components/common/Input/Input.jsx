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

const Bone = styled.div`
  margin: 3.562rem auto auto auto;
  width: 45rem;
  height: 33.875rem;
`;
const Picker = styled.div`
  width: 45rem;
  height: 10.5rem;
`;

function Input() {
  const [selected, setSelected] = useState(0);

  const handleToggle = (index) => {
    setSelected(index);
    console.log("Selected index:", index);
  };

  return (
    <Bone>
      <InputName />
      <InputChoiceText />
      <ToggleButton
        options={["컬러", "이미지"]}
        defaultSelected={0}
        onToggle={handleToggle}
      />
      <Picker>
        {selected === 0 && <ColorPicker />}
        {selected === 1 && <ImgPicker />}
      </Picker>
      <a
        href="http://localhost:5173/post/1/message"
        target="_blank"
        class="privacy"
      >
        생성하기 버튼
      </a>
    </Bone>
  );
}

export default Input;
