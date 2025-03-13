import "../../../../styles/GlobalStyles";
import "../../../../styles/textStyle";
import "../../../../styles/theme";
import styled from "styled-components";
import { textStyle } from "../../../../styles/textStyle";
import { useState } from "react";
import DropDown from "./DropDown";

const Bone = styled.div`
  margin: 3.125rem auto 3.125rem auto;
  width: 44.813rem;
  height: 6.125rem;
`;

const RelationText = styled.div`
  ${(props) => textStyle(24, 700)(props)}
  margin-bottom: 0.75rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
`;

// 상대와의 관계 컴포넌트
function ProfileInputRelationChoice() {
  const options = ["지인", "동료", "가족", "친구"];
  const [selectedOption, setSelectedOption] = useState("지인"); // 기본값

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <Bone>
      <RelationText>상대와의 관계</RelationText>
      <DropDown
        currentValue={selectedOption}
        options={options}
        onSelect={handleOptionSelect}
      />
    </Bone>
  );
}
export default ProfileInputRelationChoice;
