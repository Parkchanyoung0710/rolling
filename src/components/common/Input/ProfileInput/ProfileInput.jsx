import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProfileInputText from "./ProfileInputText";
import ProfileInputRelationChoice from "./ProfileInputRelationChoice";
import ProfileInputName from "./ProfileInputName";
import ProfileInputChoiceImage from "./ProfileInputChoiceImage";
import { Bone } from "../Input/Input";
import Button from "../../Button/Button";
import styled from "styled-components";
import "../../../../styles/font.css";
import recipientsService from "../../../../api/services/recipientsService"; // 서버 호출

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

function ProfileInput() {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 id를 가져옵니다.
  const [name, setName] = useState("");
  const [cardContent, setCardContent] = useState("");
  const [relationship, setRelationship] = useState("지인");
  const [selectedFont, setSelectedFont] = useState("Noto Sans");
  const [hasError, setHasError] = useState(false);
  const [profileImageURL, setProfileImageURL] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  const condition = name.length >= 2 && cardContent.length >= 2 && !hasError;

  // get 요청
  useEffect(() => {
    const numericId = Number(id); // id를 숫자로 변환

    if (isNaN(numericId) || !numericId) return;

    const fetchData = async () => {
      try {
        const response = await recipientsService.getRecipients(
          `/14-8/recipients/`
        );
        const foundRecipient = response.data.results.find(
          (recipient) => recipient.id === numericId
        );
        setSelectedRecipient(foundRecipient);
      } catch (error) {
        console.error("데이터를 가져오지 못했습니다:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    const numericId = Number(id);

    if (isNaN(numericId) || !numericId) return;

    const requestBody = {
      team: "14-8",
      recipientId: numericId,
      sender: name,
      profileImageURL:
        profileImageURL ||
        "https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/sprint-proj-image/default_avatar.png",
      relationship: relationship || "지인",
      content: cardContent,
      font: selectedFont || "Noto Sans",
    };

    try {
      const response = await recipientsService.postRecipientsMessages(
        numericId, // numericId를 전달
        requestBody
      );

      navigate(`/post/${numericId}`); // 숫자형 id로 이동
    } catch (error) {
      console.error("서버 요청 실패:", error.response?.data || error.message);
    }
  };

  return (
    <Bone>
      <ProfileInputName value={name} onChange={setName} onError={setHasError} />
      <ProfileInputChoiceImage onImageSelect={setProfileImageURL} />
      <ProfileInputRelationChoice onSelectRelation={setRelationship} />
      <ProfileInputText
        value={cardContent}
        onChange={setCardContent}
        onError={setHasError}
        onFontSelect={setSelectedFont}
      />
      <ButtonWrapper>
        <Button
          variant="primary"
          size={56}
          width={720}
          onClick={handleSubmit}
          state={condition ? "enabled" : "disabled"}
        >
        생성하기
        </Button>
      </ButtonWrapper>
    </Bone>
  );
}

export default ProfileInput;
