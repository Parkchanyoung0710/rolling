import { useState, useEffect } from "react";
import DropDown from "./DropDown";
import { textStyle } from "../../../../styles/textStyle";
import styled from "styled-components";

const Bone = styled.div`
  margin-bottom: 50px;
`;

const RelationText = styled.div`
  ${(props) => textStyle(24, 700)(props)}
  margin-bottom: 0.75rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
`;

function ProfileInputRelationChoice({ onSelectRelation }) {
  const options = ["지인", "동료", "가족", "친구"];
  const [selectedOption, setSelectedOption] = useState("지인");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelectRelation(option);
  };

  useEffect(() => {
    console.log("선택된 관계:", selectedOption);
  }, [selectedOption]);

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
