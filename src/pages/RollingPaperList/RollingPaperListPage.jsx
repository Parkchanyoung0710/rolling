import { useNavigate } from "react-router-dom";
import CreateAtCardList from "../../components/domain/rollingpaper/Card/CreateAtCardList";
import styled from "styled-components";
import PopularCardList from "../../components/domain/rollingpaper/Card/PopularCardList";
import Button from "../../components/common/Button/Button";

const Container = styled.div`
  background-color: #ffffff;
`;
const PageWrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  min-height: calc(100vh - 65px);
  width: max-content;
  margin: auto;
`;

const Title = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const TitleText = styled.div`
  text-align: left;
  width: 100%;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const StyledCardList = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 50px;
  width: max-content;
`;

function RollingPaperListPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <PageWrapper>
        <Title>
          <TitleText>인기 롤링 페이퍼🔥</TitleText>
        </Title>

        <StyledCardList>
          <PopularCardList />
        </StyledCardList>

        <Title>
          <TitleText>최근에 만든 롤링 페이퍼⭐</TitleText>
        </Title>

        <StyledCardList>
          <CreateAtCardList />
        </StyledCardList>

        <ButtonWrapper>
          <Button
            variant="primary"
            size="56"
            width="280"
            onClick={() => navigate(`/post`)}
          >
            나도 만들어보기
          </Button>
        </ButtonWrapper>
      </PageWrapper>
    </Container>
  );
}

export default RollingPaperListPage;
