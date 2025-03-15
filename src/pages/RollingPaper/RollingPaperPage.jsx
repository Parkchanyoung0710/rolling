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

const BackgroundWrap = styled.div`
  background-image: url(${(props) => props.backgroundImageURL || null});
  background-color: ${(props) => props.bgColor || "#FFE2AD"};
  min-height: calc(100vh - 65px);
  background-size: cover;
  background-position: center;
`;

function RollingPaperDetailPage() {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // 페이지 상태 추가
  const [messages, setMessages] = useState([]); // 메시지를 저장할 상태
  const colorMap = {
    beige: "#FFE2AD",
    purple: "#ECD9FF",
    blue: "#B1E4FF",
    green: "#D0F5C3",
  };

  const observer = useRef(null); // IntersectionObserver를 위한 ref

  // API 호출 함수 (무한 스크롤 시 데이터를 가져오는 함수)
  const fetchMessages = async (page) => {
    try {
      const limit = 10; // 한 번에 가져올 메시지 개수
      const offset = (page - 1) * limit; // 페이지에 따라 가져올 데이터의 시작 위치
      const response = await recipientsService.getRecipientsMessages(
        id,
        limit,
        offset
      );

      // 기존 메시지 배열과 새로 받아온 메시지를 합치되, 중복 메시지가 없도록 처리
      setMessages((prevMessages) => {
        const newMessages = response.data.results;

        // 새로운 메시지 배열에서 ID를 기준으로 기존 메시지와 중복되는 항목을 제거
        const uniqueMessages = [
          ...prevMessages,
          ...newMessages.filter(
            (message) =>
              !prevMessages.some((prevMessage) => prevMessage.id === message.id)
          ),
        ];

        return uniqueMessages;
      });

      setLoading(false); // 로딩 상태 해제
    } catch (error) {
      console.error("메시지 데이터를 가져오지 못했습니다:", error);
      setLoading(false); // 로딩 상태 해제
    }
  };

  // recipients 데이터와 메시지를 가져오는 함수
  const fetchRecipientData = async () => {
    try {
      const response = await recipientsService.getRecipients(
        `/14-8/recipients/`
      );
      const foundRecipient = response.data.results.find(
        (recipient) => recipient.id === Number(id)
      );
      setSelectedRecipient(foundRecipient);

      // 찾은 recipient에 해당하는 메시지 로드
      fetchMessages(page);
    } catch (error) {
      console.error("받는 사람 데이터를 가져오지 못했습니다:", error);
    }
  };

  // 메시지 로드 함수 (스크롤 시 호출)
  const loadMoreMessages = () => {
    if (loading) return; // 이미 로딩 중이면 추가 로드하지 않음
    setLoading(true);
    setPage((prev) => prev + 1); // 페이지 번호를 증가시켜서 데이터 추가 로드
  };

  // 페이지가 변경될 때마다 메시지 데이터를 가져옴
  useEffect(() => {
    if (id) {
      fetchRecipientData(); // id가 변경될 때마다 데이터를 가져옴
    }
  }, [id, page]); // id 또는 page가 변경될 때마다 실행

  // IntersectionObserver를 설정하여 화면 끝에 가까워지면 데이터를 추가로 불러옴
  useEffect(() => {
    const lastCardElement = document.getElementById("last-card");

    const intersectionObserverCallback = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        loadMoreMessages(); // 스크롤이 끝에 도달하면 추가 로드
      }
    };

    const options = {
      rootMargin: "100px", // 100px 만큼 미리 로드
    };

    observer.current = new IntersectionObserver(
      intersectionObserverCallback,
      options
    );

    if (lastCardElement) {
      observer.current.observe(lastCardElement);
    }

    return () => {
      if (observer.current && lastCardElement) {
        observer.current.unobserve(lastCardElement);
      }
    };
  }, [messages]); // messages가 변경될 때마다 실행

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
          {messages?.map((message, index) => (
            <CardWrite key={message.id} message={message} />
          ))}
          {messages?.length > 0 && <div id="last-card"></div>}
        </DivWrap>
      </CardContainer>
    </BackgroundWrap>
  );
}

export default RollingPaperDetailPage;
