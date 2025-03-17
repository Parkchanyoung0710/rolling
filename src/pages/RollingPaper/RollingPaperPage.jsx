import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import InformationBar from "../../components/common/InformationBar/InformationBar";
import CardWrite from "../../components/domain/rollingpaper/Card/CardWrite";
import Card from "../../components/domain/rollingpaper/Card/Card";
import styled from "styled-components";
import recipientsService from "../../api/services/recipientsService"; // get 요청

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

function RollingPaperDetailPage() {
  const { id } = useParams();
  const postData = null;
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

  // 무한 스크롤 때 사용합니다다
  const observer = useRef(null);

  // API 호출 함수
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

  // 밑에 무한 스크롤 할 수 있음
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

  return (
    <BackgroundWrap
      bgColor={backgroundColor}
      backgroundImageURL={backgroundImageURL}
    >
      <InformationBar />
      <CardContainer>
        <DivWrap>
          <Card postData={postData} />
          {messages?.map((message) => (
            <CardWrite
              key={message.id}
              message={message}
              fontFamily={message.font}
            />
          ))}
          {messages?.length > 0 && <div id="last-card"></div>}
        </DivWrap>
      </CardContainer>
    </BackgroundWrap>
  );
}

export default RollingPaperDetailPage;
