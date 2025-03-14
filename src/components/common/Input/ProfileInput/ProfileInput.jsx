import { useState } from "react";
import ProfileInputText from "./ProfileInputText";
import ProfileInputRelationChoice from "./ProfileInputRelationChoice";
import ProfileInputName from "./ProfileInputName";
import ProfileInputChoiceImage from "./ProfileInputChoiceImage";
import { Bone } from "../Input/Input";
import Button from "../../Button/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import recipientsService from "../../../../api/services/recipientsService"; // 서버 호출

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
  const [relationship, setRelationship] = useState("지인");
  const [selectedFont, setSelectedFont] = useState("Noto Sans");
  const [hasError, setHasError] = useState(false);
  const [profileImageURL, setProfileImageURL] = useState(null);
  const [id, setId] = useState(1);

  const saveUserName = (value) => setName(value);
  const saveCardContent = (value) => setCardContent(value);
  const saveRelation = (value) => setRelationship(value);
  const saveFont = (value) => setSelectedFont(value);
  const saveProfileImage = (image) => setProfileImageURL(image);

  const condition = name.length >= 2 && cardContent.length >= 2 && !hasError;

  const handleSubmit = async () => {
    const requestBody = {
      team: "14-8",
      recipientId: id,
      sender: name,
      profileImageURL: profileImageURL || "https://example.com/profile.jpg",
      relationship: relationship,
      content: cardContent,
      font: selectedFont,
    };

    console.log("서버로 전송할 데이터:", requestBody);

    try {
      const response = await recipientsService.postRecipientsMessages(
        id,
        requestBody
      );
      console.log("서버 응답:", response);
      setId((prevId) => prevId + 1);
      navigate(`/post/${id}`);
    } catch (error) {
      console.error("서버 요청 실패:", error.response?.data || error.message);
    }
  };

  return (
    <Bone>
      <ProfileInputName
        value={name}
        onChange={saveUserName}
        onError={setHasError}
      />
      <ProfileInputChoiceImage onImageSelect={saveProfileImage} />
      <ProfileInputRelationChoice onSelectRelation={saveRelation} />
      <ProfileInputText
        value={cardContent}
        onChange={saveCardContent}
        onError={setHasError}
        onFontSelect={saveFont}
      />
      <StyledButton
        variant="primary"
        size={56}
        width={720}
        onClick={handleSubmit}
        state={condition ? "enabled" : "disabled"}
      >
        생성하기
      </StyledButton>
    </Bone>
  );
}

export default ProfileInput;
