import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import InformationBar from "../../components/common/InformationBar/InformationBar";
import CardWrite from "../../components/domain/rollingpaper/Card/CardWrite";
import Card from "../../components/domain/rollingpaper/Card/Card";
import styled from "styled-components";
import recipientsService from "../../api/services/recipientsService";
import axios from "axios";


const CardContainer = styled.div`
  width: min(100%, 1200px);
  margin-inline: auto;
  padding: 0 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;

  padding: 100px 24px;
  width: 100%;
  box-sizing: border-box;
  @media (max-width: 767px) {
    background-attachment: scroll;

  }
`;

const DivWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  @media (max-width: 1199px) {
    grid-template-columns: repeat(2, 1fr);
  }
    @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const BackgroundWrap = styled.div`
   background-image: ${({ backgroundImageURL }) =>
    backgroundImageURL
      ? `linear-gradient(180deg, rgba(0, 0, 0, 0.54) 0%, rgba(0, 0, 0, 0.54) 100%), url(${backgroundImageURL})`
      : "ffffff"};
  background-color: ${({ bgColor }) => bgColor || "#ffffff"};
  min-height: calc(100vh - 134px);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  background-attachment: fixed;

  @media (max-width: 767px) {
    background-attachment: scroll;
    grid-template-columns: 1fr;

  }
`;

const colorMap = {
  beige: "#FFE2AD",
  purple: "#ECD9FF",
  blue: "#B1E4FF",
  green: "#D0F5C3",
};

function RollingPaperDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [recipientData, setRecipientData] = useState({});
  const [messages, setMessages] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const lastMessageRef = useRef(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [messagesResponse, recipientResponse] = await Promise.all([
          recipientsService.getRecipientsMessages(id, 5, 0),
          recipientsService.getRecipientsId(id),
        ]);
        setMessages(messagesResponse.data.results);
        setNextUrl(messagesResponse.data.next);
        setRecipientData(recipientResponse.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchInitialData();
  }, [id]);

  const loadMoreMessages = async () => {
    if (!nextUrl || isFetchingRef.current) return;
    isFetchingRef.current = true;
    try {
      const response = await axios.get(nextUrl);
      setMessages((prev) => [...prev, ...response.data.results]);
      setNextUrl(response.data.next);
    } catch (error) {
      console.error("Error loading messages:", error);
    } finally {
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    if (!lastMessageRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && loadMoreMessages(),
      { root: null, rootMargin: "100px" }
    );
    observer.observe(lastMessageRef.current);
    return () => observer.disconnect();
  }, [messages]);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div>
      <InformationBar
        name={recipientData?.name ?? ""}
        count={recipientData?.messageCount ?? 0}
        profileImages={recipientData?.recentMessages?.map(({ profileImageURL }) => profileImageURL) || []}
        topReactions={recipientData?.topReactions ?? []}
        setRecipientData={setRecipientData}
        />

    <BackgroundWrap
    bgColor={colorMap[recipientData?.backgroundColor] ?? "#ffffff"}
    backgroundImageURL={recipientData?.backgroundImageURL ?? null}
    >
      <CardContainer>
        <DivWrap isLoaded={isLoaded}>
          <Card postData={null} />
          {messages.map((message, index) => (
            <div key={message.id} ref={index === messages.length - 1 ? lastMessageRef : null}>
              <CardWrite message={message} fontFamily={message.font} />
            </div>
          ))}
        </DivWrap>
      </CardContainer>
    </BackgroundWrap>
          </div>
  );
}

export default RollingPaperDetailPage;