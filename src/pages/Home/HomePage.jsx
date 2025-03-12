import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import styled from "styled-components";

import cardExample from "../../assets/images/main-page/card-example.png";
import emojiExample from "../../assets/images/main-page/emoji-example.png";
import { textStyle } from "../../styles/textStyle";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 40px 24px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 324px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  padding: 60px 60px;
  margin-bottom: 32px;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  flex: 0.6;
  align-self: flex-start;
`;

const Tag = styled.div`
  background-color: ${({ theme }) => theme.colors.purple[600]};
  border-radius: 50px;
  padding: 6px 12px;
  color: ${({ theme }) => theme.colors.white};
  ${textStyle(14, 700)}
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.grayScale[900]};
  ${textStyle(24, 700)};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.grayScale[500]};
  ${textStyle(18, 400)};
`;

const ImgWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImg = styled.img`
  max-width: 100%;
  height: auto;
`;

const ButtonWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  width: 280px;
  display: block;
`;

function HomePage() {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <ContentWrapper>
        <Section>
          <TextSection>
            <Tag>Point. 01</Tag>
            <TitleSection>
              <Title>
                누구나 손쉽게, 온라인
                <br />
                롤링 페이퍼를 만들 수 있어요
              </Title>
              <Description>로그인 없이 자유롭게 만들어요.</Description>
            </TitleSection>
          </TextSection>
          <ImgWrapper>
            <StyledImg src={cardExample} />
          </ImgWrapper>
        </Section>
        <Section>
          <ImgWrapper>
            <StyledImg src={emojiExample} />
          </ImgWrapper>
          <TextSection>
            <Tag>Point. 02</Tag>
            <TitleSection>
              <Title>
                서로에게 이모지로 감정을
                <br />
                표현해보세요.
              </Title>
              <Description>
                롤링 페이퍼에 이모지를 추가할 수 있어요.
              </Description>
            </TitleSection>
          </TextSection>
        </Section>
        <ButtonWrapper>
          <StyledButton
            variant="primary"
            size="56"
            onClick={() => navigate("/list")}
          >
            구경해보기
          </StyledButton>
        </ButtonWrapper>
      </ContentWrapper>
    </HomeContainer>
  );
}

export default HomePage;
