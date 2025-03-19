import { useEffect, useState,useCallback,useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InformationBar from "../../components/common/InformationBar/InformationBar";
import CardWrite from "../../components/domain/rollingpaper/Card/CardWrite";
import Button from '../../components/common/Button/Button'
import styled from "styled-components";
import recipientsService from "../../api/services/recipientsService";
import axios from "axios";
import messageService from "../../api/services/messagesService";

const CardContainer = styled.div`
  width: min(100%, 1200px);
  margin-inline: auto;
  padding: 0 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  height: 1140px;
  min-height: 50vh;
  padding: 100px 24px;
  width: 100%;
  
  background-image: ${({ backgroundImageURL }) => backgroundImageURL ? `url(${backgroundImageURL})` : "none"};
  background-color: ${({ bgColor }) => bgColor || "#FFE2AD"};
  min-height: calc(100vh - 65px);
  height: auto;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  background-attachment: fixed;

  @media (max-width: 768px) {
    background-attachment: scroll;
  }
`;

const DivWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 28px;
  opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  height: fit-content;
  padding-top: 112px;
  position: relative;
  @media (max-width: 1199px) {
    grid-template-columns: repeat(2, 1fr);
    padding-top: 0;
    position: static;
  }
    @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const BackgroundWrap = styled.div`
  background-image: ${({ backgroundImageURL }) => backgroundImageURL ? `url(${backgroundImageURL})` : "none"};
  background-color: ${({ bgColor }) => bgColor || "#FFE2AD"};
  min-height: 100vh;
  height: auto;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center top;
  background-attachment: fixed;

 @media (max-width: 767px) {
    background-attachment: scroll;
    grid-template-columns: 1fr;
  }
`;

const ButtonWrapper = styled.div`
 
  position: absolute;
  top: 60px;
  right: -10px;
  @media (max-width: 1199px) {
    display: flex;
    justify-content: center;
    grid-template-columns: 1fr;
    bottom: 24px;
    z-index:1000;
    width:100%;
    position: fixed;
    align-self: flex-end;
  }
`;
const StyledButton = styled(Button)`
  width: ${({ isTablet }) => (isTablet ? "100%" : 92)};
`;

function EditRollingPaperPage() {
  const navigate = useNavigate();
 const [isTablet, setIsTablet] = useState(window.innerWidth <= 1199);

  const handleResize = useCallback(() => {
    setIsTablet(window.innerWidth <= 1199);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);
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
      <CardContainer bgColor={colorMap[recipientData?.backgroundColor] ?? colorMap.beige}
      backgroundImageURL={recipientData?.backgroundImageURL ?? null}>
        <DivWrap isLoaded={isLoaded}>
          <ButtonWrapper>
            <StyledButton
            variant="primary"
            size={isTablet ? "56" : "40"}
              width={isTablet ? "85%" : 92}
              onClick={handleDeleteRollingPaper}>삭제하기</StyledButton>
          </ButtonWrapper>
          {messages.map((message, index) => (
            <div key={message.id} ref={index === messages.length - 1 ? lastMessageRef : null}>
              <CardWrite message={message} fontFamily={message.font} onDelete={handleDeleteMessage}/>
            </div>
          ))}
        </DivWrap>
      </CardContainer>
    </BackgroundWrap>
  );
}

export default EditRollingPaperPage;
