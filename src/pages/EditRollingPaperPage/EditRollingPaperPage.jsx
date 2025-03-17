import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InformationBar from "../../components/common/InformationBar/InformationBar";
import CardWrite from "../../components/domain/rollingpaper/Card/CardWrite";
import Button from "../../components/common/Button/Button";
import styled from "styled-components";
import recipientsService from "../../api/services/recipientsService";
import messageService from "../../api/services/messagesService";

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const DivWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 28px;
  padding-top: 112px;
  position: relative;
`;

const BackgroundWrap = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["bgColor", "backgroundImageURL"].includes(prop),
})`
  background-image: ${({ backgroundImageURL }) =>
    backgroundImageURL ? `url(${backgroundImageURL})` : "none"};
  background-color: ${({ bgColor }) => bgColor || "#FFE2AD"};
  min-height: calc(100vh - 65px);
  background-size: cover;
  background-position: center;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 60px;
  right: -10px;
`;

function EditRollingPaperPage() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const colorMap = {
    beige: "#FFE2AD",
    purple: "#ECD9FF",
    blue: "#B1E4FF",
    green: "#D0F5C3",
  };

  const observer = useRef(null);

  const fetchMessages = async (page) => {
    try {
      const limit = 10;
      const offset = (page - 1) * limit;
      const response = await recipientsService.getRecipientsMessages(
        id,
        limit,
        offset
      );

      setMessages((prevMessages) => {
        const newMessages = response.data.results;

        const uniqueMessages = [
          ...prevMessages,
          ...newMessages.filter(
            (message) =>
              !prevMessages.some((prevMessage) => prevMessage.id === message.id)
          ),
        ];

        return uniqueMessages;
      });

      setLoading(false);
    } catch (error) {
      console.error("메시지 데이터를 가져오지 못했습니다:", error);
      setLoading(false);
    }
  };

  // recipients
  const fetchRecipientData = async () => {
    try {
      const response = await recipientsService.getRecipients(
        `/14-8/recipients/`
      );
      const foundRecipient = response.data.results.find(
        (recipient) => recipient.id === Number(id)
      );
      setSelectedRecipient(foundRecipient);
    } catch (error) {
      console.error("받는 사람 데이터를 가져오지 못했습니다:", error);
    }
  };
  // 메시지 로드 함수
  const loadMoreMessages = () => {
    if (loading) return;
    setLoading(true);
    setPage((prev) => prev + 1);
  };
  // id 로드
  useEffect(() => {
    if (id) {
      fetchRecipientData();
    }
  }, [id]);
  // 메세지 로드
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        fetchMessages(page);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [page, loading]);

  // 밑에 스크롤 할 수 있음음
  useEffect(() => {
    if (!observer.current) {
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMoreMessages();
          }
        },
        { rootMargin: "100px" }
      );
    }

    const lastCardElement = document.getElementById("last-card");
    if (lastCardElement) {
      observer.current.observe(lastCardElement);
    }

    return () => {
      if (observer.current && lastCardElement) {
        observer.current.unobserve(lastCardElement);
      }
    };
  }, []);

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
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== messageId)
      );
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
      bgColor={backgroundColor}
      backgroundImageURL={backgroundImageURL}
    >
      <InformationBar />
      <CardContainer>
        <DivWrap>
          <ButtonWrapper>
            <Button onClick={handleDeleteRollingPaper}>삭제하기</Button>
          </ButtonWrapper>
          {messages?.map((message) => (
            <CardWrite
              key={message.id}
              message={message}
              fontFamily={message.font}
              onDelete={handleDeleteMessage}
            />
          ))}
          {messages?.length > 0 && <div id="last-card"></div>}
        </DivWrap>
      </CardContainer>
    </BackgroundWrap>
  );
}

export default EditRollingPaperPage;
