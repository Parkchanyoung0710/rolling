import InformationBar from "../../components/common/InformationBar/InformationBar";
import CardWrite from "../../components/domain/rollingpaper/Card/CardWrite";
import Card from "../../components/domain/rollingpaper/Card/Card";
import styled from "styled-components";

function RollingPaperDetailPage() {
  return (
    <BackgroundWrap>
      <InformationBar />
      <CardContainer>
        <Divrap>
          <Card />
          <CardWrite />
          <CardWrite />
          <CardWrite />
          <CardWrite />
          <CardWrite />
        </Divrap>
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

const Divrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 28px;
  padding-top: 112px;
`;

const BackgroundWrap = styled.div`
  background-color: #ffe2ad;
  min-height: calc(100vh - 65px);
`;
