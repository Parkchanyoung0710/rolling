import { useEffect, useState } from "react";
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
  background-size: 1920px 1080px; /*사이즈 조절 했는데도 렉걸림*/
  background-position: center;
`;

function RollingPaperDetailPage() {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null); // 페이지네이션

  const colorMap = {
    beige: "#FFE2AD",
    purple: "#ECD9FF",
    blue: "#B1E4FF",
    green: "#D0F5C3",
  };

  const limit = 6; // 한 번에 불러올 메시지 수

  const fetchMessages = async (id, offset = 6) => {
    try {
      const response = await recipientsService.getRecipientsMessages(
        id,
        limit,
        offset
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        ...response.data.results,
      ]);
      setNextPageUrl(response.data.next);
    } catch (error) {
      console.error("메시지를 가져오지 못했습니다:", error);
    }
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

        await fetchMessages(id);
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

  // 메시지 배열에서 5개만 표시
  const displayMessages = messages.slice(0, 5);

  return (
    <BackgroundWrap
      bgColor={backgroundColor}
      backgroundImageURL={backgroundImageURL}
    >
      <InformationBar />
      <CardContainer>
        <DivWrap>
          <Card postData={postData} />
          {displayMessages?.map((message) => (
            <CardWrite key={message.id} message={message} />
          ))}
        </DivWrap>
      </CardContainer>
    </BackgroundWrap>
  );
}

export default RollingPaperDetailPage;
