import { useNavigate } from "react-router-dom";
import CreateAtCardList from "../../components/domain/rollingpaper/Card/CreateAtCardList";
import styled from "styled-components";
import PopularCardList from "../../components/domain/rollingpaper/Card/PopularCardList";
import Button from "../../components/common/Button/Button";
import { textStyle } from "../../styles/textStyle";
import { useEffect, useState, useCallback } from "react";

const Container = styled.div`
  background-color: #ffffff;
  width: 100%;
  padding: 0 20px;
`;

const PageWrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  min-height: calc(100vh - 65px);
  width: max-content;
  margin: auto;
  @media (max-width: 1199px) {
    padding: 0;
    padding-top: 50px;
    margin: 0;
    width: 100%;
  }
  @media (max-width: 767px) {
    padding: 20px;
  }
`;


const TitleWrapper = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 10;
  padding: 10px 0;
 
  

`;

const Title = styled.div`
  ${(props) => textStyle(24, 700)(props)}
  display: flex;
  width: -webkit-fill-available;
  justify-content: left;
  @media (max-width: 767px) {
    ${(props) => textStyle(20, 600)(props)}
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 64px;
  display: flex;
  justify-content: center;

  @media (max-width: 1199px) {
    margin-top: 156px;
  }
  @media (max-width: 767px) {
    margin-top: 66px;
  }  
`;

  

const StyledCardList = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
  width: max-content;
  flex-direction: column;

  @media (max-width: 1199px) {
    padding: 0;
    padding-left: 20px;
  }

`;
const StyledButton = styled(Button)`
  width: ${({ isTablet }) => (isTablet ? "calc(100% - 24px)" : "280px")};
`;

function RollingPaperListPage() {
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

  return (
    <Container>
      
      <PageWrapper>
        <StyledCardList>
          <Title>인기 롤링 페이퍼🔥</Title>
        </StyledCardList>
        <PopularCardList />
        <StyledCardList>
          <Title>최근에 만든 롤링 페이퍼⭐</Title>
        </StyledCardList>
        <CreateAtCardList />
        <ButtonWrapper>
          <StyledButton
            variant="primary"
            size="56"

            width={isTablet ? "calc(100% - 24px)" : 280}

            onClick={() => navigate(`/post`)}
          >
            나도 만들어보기
          </StyledButton>
        </ButtonWrapper>
      </PageWrapper>
    </Container>
  );
}

export default RollingPaperListPage;