import "../../../../styles/GlobalStyles";
import { textStyle } from "../../../../styles/textStyle";
import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import recipientsService from "../../../../api/services/recipientsService";
import ArrowButton from "../../../common/Button/ArrowButton";
import { useNavigate } from "react-router-dom";
import pattern01 from '../../../../assets/images/pattern/pattern_01.svg';
import pattern02 from '../../../../assets/images/pattern/pattern_02.svg';
import pattern03 from '../../../../assets/images/pattern/pattern_03.svg';
import pattern04 from '../../../../assets/images/pattern/pattern_04.svg';

// 색상과 패턴 매핑
const colorMap = {
  beige: "#FFE2AD",
  purple: "#ECD9FF",
  blue: "#B1E4FF",
  green: "#D0F5C3",
};

const patternMap = {
  purple: pattern01,
  beige: pattern02,
  blue: pattern03,
  green: pattern04,
};
// ------------------- styled-components -------------------
const BoneWrap = styled.div`
  width: 1160px;
  position: relative;
  overflow: visible;
  height: 260px;
  margin-bottom: 50px;
  @media (max-width: 1199px) {
    width: 100%;
  }
  @media (max-width: 767px) {
    height: 232px;
    margin-bottom: 74px;
  }
`;

const BoneContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-bottom: 50px;
  @media (max-width: 1199px) {
    overflow: auto;
    scrollbar-width: none;
    padding: 0 20px;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Bone = styled.div`
  display: flex;
  gap: 20px;
  width: fit-content;
  transition: transform 0.5s ease;
  transform: translateX(${(props) => props.scrollPosition}px);
  position: relative;
`;

const BackgroundWrap = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "isImageCard",
      "bgColor",
      "patternUrl",
      "backgroundImageUrl",
      "color",
    ].includes(prop),
})`
  width: 275px;
  height: 260px;
  padding: 30px 24px;
  border-radius: 1rem;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;

  /* 카드 클릭 시 포인터 */
  cursor: pointer;

  /* isImageCard에 따라 스타일 분기 */
  ${({ isImageCard, bgColor, patternUrl, backgroundImageUrl }) =>
    isImageCard
      ? css`
          /* 배경 이미지 카드 */
          background: url(${backgroundImageUrl}) center/cover no-repeat;
          color: #fff; /* 이미지가 들어올 땐 텍스트 색상 지정 (예시) */
        `
      : css`
          /* 배경색 + 패턴 카드 */
          background-color: ${bgColor};
          background-image: ${patternUrl ? `url("${patternUrl}")` : "none"};
          background-repeat: no-repeat;
          background-position: right bottom;
          background-size: auto 140px;
          color: #000; /* 배경색일 때 텍스트 색상 지정 (예시) */
        `}

  &:hover {
    transform: scale(1);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 767px) {
    width: 208px;
    height: 232px;
  }
`;

const TextDisplay = styled.div`
  display: flex;
  height: 36px;
  margin-bottom: 0.75rem;
`;

const ToText = styled.div`
  ${(props) => textStyle(24, 700)(props)}
  margin-bottom: 0.75rem;
  height: 2.625rem;
  @media (max-width: 767px) {
    ${(props) => textStyle(18, 700)(props)}
  }
`;

const WritedContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

const Avatar = styled.div`
  ${(props) => textStyle(12, 400)(props)}
  right: -6px;
  position: relative;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.grayScale[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -10px;
  margin-bottom: 0.75rem;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  &:not(:has(img)) {
    background-color: white;
    color: ${({ theme }) => theme.colors.grayScale[800]};
  }
`;

const WriteCount = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const WriteCountDisplay = styled.div`
  display: flex;
  align-items: center;
  ${(props) => textStyle(16, 700)(props)}
`;

const WritedText = styled.div`
  font-size: 14px;
  @media (max-width: 767px) {
    ${(props) => textStyle(14, 700)(props)}
  }
`;

const ArrowButtonDisplay = styled.div`
  align-items: center;
  transform: translateY(40%);
  z-index: 2;
  transform: matrix(1, 0, 0, 1, 0, 108);
  transition: opacity 0.3s ease;
`;

const LeftArrowButtonDisplay = styled(ArrowButtonDisplay)`
  display: ${({ show }) => (show ? "block" : "none")};
  position: absolute;
  left: -24px;
  top: 30%;
  transform: translateY(42%);
  z-index: 1;
  @media (max-width: 1199px) {
    display: none;
  }
`;

const RightArrowButtonDisplay = styled(ArrowButtonDisplay)`
  display: ${({ show }) => (show ? "block" : "none")};
  position: absolute;
  right: -24px;
  top: 30%;
  transform: translateY(42%);
  z-index: 1;
  @media (max-width: 1199px) {
    display: none;
  }
`;

const TopEmojisContainer = styled.div`
  display: flex;
  gap: 8px;
  @media (max-width: 767px) {
    padding: 0 4px;
  }
`;

const TopEmojiItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 36px;
  border-radius: 32px;
  background-color: rgba(0, 0, 0, 0.54);
  color: white;
  padding: 8px 12px;
  gap: 2px;
  font-size: 20px;
  text-align: center;

  @media (max-width: 767px) {
    width: 46px;
    height: 32px;
  }
`;

const EmojiWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
`;

const EmojiDiv = styled.div`
  position: relative;
  margin-top: 2rem;
  padding-top: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  height: 80px;
  width: 100%;
  box-sizing: border-box;
`;

const EmojiImage = styled.span`
  font-size: 20px;
`;

const EmojiCount = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

// ------------------- 메인 컴포넌트 -------------------
function PopularCardList() {
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const cardWidth = 295;
  const navigate = useNavigate();

  useEffect(() => {
    const loadRecipients = async () => {
      try {
        // recipientsService.getRecipients("/14-8/recipients/") 호출 예시
        const response = await recipientsService.getRecipients("/14-8/recipients/");
        const sortedRecipients = response.data.results.sort(
          (a, b) => b.messageCount - a.messageCount
        );

        const updatedRecipients = sortedRecipients.map((recipient) => {
          const images = recipient.recentMessages?.slice(0, 3) || [];
          const imageUrls = images
            .map((msg) => msg.profileImageURL)
            .filter(Boolean);
          return {
            ...recipient,
            profileImages: imageUrls,
          };
        });

        console.log(updatedRecipients);
        setSelectedRecipients(updatedRecipients);
      } catch (error) {
        console.error("받는 사람 데이터를 가져오지 못했습니다:", error);
      }
    };

    loadRecipients();
  }, []);

  const handleNext = () => {
    const maxScroll = -(selectedRecipients.length * cardWidth - 1160);
    setScrollPosition((prev) =>
      prev > maxScroll ? prev - 2 * cardWidth : maxScroll
    );
  };

  const handlePrev = () => {
    setScrollPosition((prev) => (prev < 0 ? prev + 2 * cardWidth : 0));
  };

  const handleCardClick = (id) => {
    // 클릭 시 해당 id로 페이지 이동
    navigate(`/post/${id}`);
  };

  // 좌측 버튼 숨기기 조건
  const showLeftButton = scrollPosition !== 0;
  // 우측 버튼 숨기기 조건
  const showRightButton =
    scrollPosition > -(selectedRecipients.length * cardWidth - 1160);

  return (
    <>
      <BoneWrap>
        <LeftArrowButtonDisplay show={showLeftButton}>
          <ArrowButton
            direction="left"
            onClick={handlePrev}
            disabled={scrollPosition === 0}
          />
        </LeftArrowButtonDisplay>

        <BoneContainer>
          <Bone scrollPosition={scrollPosition}>
            {selectedRecipients.map((recipient, index) => {
              // 이미지 URL 유무에 따라 이미지 카드 / 색상+패턴 카드 결정
              const isImageCard = !!recipient.backgroundImageURL;
              const bgColor = colorMap[recipient.backgroundColor] || "#FFFFFF";
              const patternUrl = patternMap[recipient.backgroundColor] || null;

              return (
                <BackgroundWrap
                  key={index}
                  isImageCard={isImageCard}
                  bgColor={bgColor}
                  patternUrl={patternUrl}
                  backgroundImageUrl={recipient.backgroundImageURL}
                  onClick={() => handleCardClick(recipient.id)}
                >
                  <TextDisplay>
                    <ToText>To.</ToText>
                    <ToText>
                      {recipient.name === "Unknown"
                        ? "이름 없음"
                        : recipient.name}
                    </ToText>
                  </TextDisplay>

                  <WritedContainer>
                    {recipient.profileImages?.slice(0, 3).map((url, i) => (
                      <Avatar key={i}>
                        <img src={url} alt={`프로필 이미지 ${i + 1}`} />
                      </Avatar>
                    ))}
                    {recipient.messageCount > 3 && (
                      <Avatar>+{recipient.messageCount - 3}</Avatar>
                    )}
                  </WritedContainer>

                  <WriteCountDisplay>
                    <WriteCount>{recipient.messageCount}</WriteCount>
                    <WritedText>명이 작성했어요!</WritedText>
                  </WriteCountDisplay>

                  {/* 이모지 정보 */}
                  <EmojiWrapper>
                    <EmojiDiv>
                      <TopEmojisContainer>
                        {recipient.topReactions.map(({ emoji, count }, i) => (
                          <TopEmojiItem key={i}>
                            <EmojiImage>{emoji}</EmojiImage>
                            <EmojiCount>{count}</EmojiCount>
                          </TopEmojiItem>
                        ))}
                      </TopEmojisContainer>
                    </EmojiDiv>
                  </EmojiWrapper>
                </BackgroundWrap>
              );
            })}
          </Bone>
        </BoneContainer>

        <RightArrowButtonDisplay show={showRightButton}>
          <ArrowButton
            direction="right"
            onClick={handleNext}
            disabled={
              scrollPosition <= -(selectedRecipients.length * cardWidth - 1160)
            }
          />
        </RightArrowButtonDisplay>
      </BoneWrap>
    </>
  );
}

export default PopularCardList;