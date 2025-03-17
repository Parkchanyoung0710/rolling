import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InformationBar from "../../components/common/InformationBar/InformationBar";
import CardWrite from "../../components/domain/rollingpaper/Card/CardWrite";
import Button from "../../components/common/Button/Button";
import styled from "styled-components";
import recipientsService from "../../api/services/recipientsService";
import { textStyle } from "../../styles/textStyle";
import messageService from "../../api/services/messagesService";

function EditRollingPaperPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  const colorMap = {
    beige: "#FFE2AD",
    purple: "#ECD9FF",
    blue: "#B1E4FF",
    green: "#D0F5C3",
  };

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await recipientsService.getRecipients(
          `/14-8/recipients/`
        );
        setPostData(response.data);

        const foundRecipient = response.data.results.find(
          (recipient) => recipient.id === Number(id)
        );

        setSelectedRecipient(foundRecipient);
      } catch (error) {
        console.error("데이터를 가져오지 못했습니다:", error);
      }
    };

    fetchData();
  }, [id]);

  const backgroundColor = selectedRecipient
    ? colorMap[selectedRecipient.backgroundColor] || "#FFFFFF"
    : "#FFFFFF";
  const backgroundImageURL = selectedRecipient
    ? selectedRecipient.backgroundImageURL || null
    : null;

  const handleDeleteMessage = async (messageId) => {
    const confirmDelete = window.confirm("정말 이 메시지를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await messageService.deleteMessages(messageId);
      alert("메시지가 삭제되었습니다!");
      setPostData((prev) => ({
        ...prev,
        results: prev.results.filter((msg) => msg.id !== messageId), // 화면에서도 제거
      }));
    } catch (error) {
      console.error("메시지 삭제 실패:", error);
    }
  };
  const handleDeleteRollingPaper = async () => {
    const confirmDelete = window.confirm("이 롤링페이퍼를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await recipientsService.deleteRecipientsId(id);
      alert("롤링페이퍼가 삭제되었습니다!");
      navigate("/"); // 삭제 후 홈으로 이동
    } catch (error) {
      console.error("롤링페이퍼 삭제 실패:", error);
    }
  };

  return (
    <BackgroundWrap
      backgroundColor={backgroundColor}
      backgroundImageURL={backgroundImageURL}
    >
      <InformationBar />
      <ButtonWrapper>
        <StyledButton onClick={handleDeleteRollingPaper}>삭제하기</StyledButton>
      </ButtonWrapper>
      <CardContainer>
        <DivWrap>
          <CardWrite postData={postData} onDelete={handleDeleteMessage} />
          <CardWrite postData={postData} onDelete={handleDeleteMessage} />
          <CardWrite postData={postData} onDelete={handleDeleteMessage} />
          <CardWrite postData={postData} onDelete={handleDeleteMessage} />
        </DivWrap>
      </CardContainer>
    </BackgroundWrap>
  );
}

export default EditRollingPaperPage;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DivWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 28px;
  padding-top: 112px;
`;

const BackgroundWrap = styled.div`
  position: relative;
  background-image: url(${(props) => props.backgroundImageURL || null});
  background-color: ${(props) => props.backgroundColor || "#FFE2AD"};
  min-height: calc(100vh - 65px);
  background-size: cover;
  background-position: center;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 120px;
  right: 420px;
`;

const StyledButton = styled(Button)`
  width: 200px;
  background-color: ${({ theme }) => theme.colors.purple[600]};
  color: ${({ theme }) => theme.colors.white};
  &:hover {
    background-color: ${({ theme }) => theme.colors.purple[700]};
  }
  ${textStyle(16, 400)}
`;
