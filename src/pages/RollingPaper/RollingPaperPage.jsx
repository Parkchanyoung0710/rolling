import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import InformationBar from "../../components/common/InformationBar/InformationBar";
import CardWrite from "../../components/domain/rollingpaper/Card/CardWrite";
import Card from "../../components/domain/rollingpaper/Card/Card";
import styled from "styled-components";
import recipientsService from "../../api/services/recipientsService";
import axios from "axios";

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  overflow-y: auto;
  height: 1140px;
  min-height: 50vh;
  padding: 100px 24px;
  width: 100%;
`;

const DivWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 28px;
  opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const BackgroundWrap = styled.div`
  background-image: ${({ backgroundImageURL }) => backgroundImageURL ? `url(${backgroundImageURL})` : "none"};
  background-color: ${({ bgColor }) => bgColor || "#FFE2AD"};
  min-height: calc(100vh - 65px);
  background-size: cover;
  background-position: center;
`;

function RollingPaperDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [recipientData, setRecipientData] = useState({});
  const [messages, setMessages] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const observerRef = useRef(null);
  const lastMessageRef = useRef(null);
  const isFetchingRef = useRef(false);

  const colorMap = {
    beige: "#FFE2AD",
    purple: "#ECD9FF",
    blue: "#B1E4FF",
    green: "#D0F5C3",
  };

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [messagesResponse, recipientResponse] = await Promise.all([
          recipientsService.getRecipientsMessages(id, 8, 0),
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
    observerRef.current = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && loadMoreMessages(),
      { root: null, rootMargin: "-50px" }
    );
    observerRef.current.observe(lastMessageRef.current);
    return () => observerRef.current?.disconnect();
  }, [messages.length]);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <BackgroundWrap
      bgColor={colorMap[recipientData?.backgroundColor] ?? colorMap.beige}
      backgroundImageURL={recipientData?.backgroundImageURL ?? null}
    >
      <InformationBar
        name={recipientData?.name ?? ""}
        count={recipientData?.messageCount ?? 0}
        profileImages={recipientData?.recentMessages?.map(({ profileImageURL }) => profileImageURL) || []}
        topReactions={recipientData?.topReactions ?? []}
        setRecipientData={setRecipientData}
      />
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
  );
}

export default RollingPaperDetailPage;