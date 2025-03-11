import "../../../../styles/GlobalStyles";
import "../../../../styles/textStyle";
import "../../../../styles/theme";
import styled from "styled-components";
import { textStyle } from "../../../../styles/textStyle";
import Dropdown from "../../TextFiled/Dropdown";
import { useState } from "react";

const Bone = styled.div`
  margin: 3.125rem auto 3.125rem auto;
  width: 44.813rem;
  height: 8.875rem;
`;

const RelationText = styled.div`
  ${(props) => textStyle(24, 700)(props)}
  margin-bottom: 1.333rem;
`;
const DropdownStyle = styled.div`
  ${(props) => textStyle(16, 400)(props)}
  color:#555555;
`;

function ProfileInputRelationChoice() {
  const optionData = [
    { value: "지인", label: "지인" },
    { value: "동료", label: "동료" },
    { value: "가족", label: "가족" },
    { value: "친구", label: "친구" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log("Selected Option: ", selectedOption);
  };

  return (
    <Bone>
      <RelationText>상대와의 관계</RelationText>
      <Dropdown
        styles={DropdownStyle}
        options={optionData}
        onChange={handleSelectChange}
        color="#CCCCCC"
        textColor="#555555"
        borderColor="#555555"
      />
    </Bone>
  );
}

export default ProfileInputRelationChoice;
