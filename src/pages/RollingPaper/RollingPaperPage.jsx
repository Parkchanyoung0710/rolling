import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InformationBar from "../../components/common/InformationBar/InformationBar";
import CardWrite from "../../components/domain/rollingpaper/Card/CardWrite";
import Card from "../../components/domain/rollingpaper/Card/Card";
import styled from "styled-components";
import recipientsService from "../../api/services/recipientsService"; // get 요청

function RollingPaperDetailPage() {
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

  // console.log(postData);
  console.log(selectedRecipient);
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
          <CardWrite postData={postData} />
          <CardWrite postData={postData} />
          <CardWrite postData={postData} />
          <CardWrite postData={postData} />
        </DivWrap>
      </CardContainer>
    </BackgroundWrap>
  );
}

export default RollingPaperDetailPage;

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
