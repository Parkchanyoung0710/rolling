import React, { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import styled from "styled-components";
import EmojiIcon from "../../../assets/images/emoji.png";
import toggle from "../../../assets/images/toggle.png";
import recipientsService from "../../../api/services/recipientsService";
import { useParams } from "react-router-dom";

const MAX_EMOJIS = 8;
const TOP_EMOJIS = 3;

function Emoji({ name, profileImageURL, cardContent }) {
  const [showPicker, setShowPicker] = useState(false);
  const [emojiMap, setEmojiMap] = useState({});
  const [showAllEmojis, setShowAllEmojis] = useState(false);
  const [selected, setSelected] = useState(0);
  const moreEmojisRef = useRef(null);
  const pickerRef = useRef(null);
  const { id } = useParams();

  const handleClickOutside = (event, ref, setter) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setter(false);
    }
  };

  useEffect(() => {
    const handleClickOutsideWrapper = (event) => {
      handleClickOutside(event, moreEmojisRef, setShowAllEmojis);
      handleClickOutside(event, pickerRef, setShowPicker);
    };

    document.addEventListener("mousedown", handleClickOutsideWrapper);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideWrapper);
    };
  }, []);

  // 이모티콘 추가 및 상태 업데이트
  function handleEmojiSelect(emojiObject, event) {
    const emoji = emojiObject.emoji;
    const type = emojiObject.name || "reaction";

    setEmojiMap((prevMap) => {
      const updatedMap = { ...prevMap };
      updatedMap[emoji] = updatedMap[emoji] ? updatedMap[emoji] + 1 : 1;

      return updatedMap;
    });
  }

  // 서버에 이모티콘 전송
  const sendReactionToServer = async (updatedMap) => {
    if (!id) {
      console.error("ID가 정의되지 않았습니다.");
      return;
    }

    try {
      const sortedReactions = Object.entries(updatedMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, TOP_EMOJIS)
        .map(([emoji, count]) => ({
          id: id,
          emoji: emoji,
          count: count,
          action: count > 1 ? "increase" : "decrease",
        }));

      const requestBody = {
        name: name || "Unknown", // name이 없을 경우 기본값 설정
        profileImageURL: profileImageURL || "https://default-avatar.png",
        backgroundColor: selected === 0 && cardContent ? cardContent : "beige",
        reactionCount: Object.values(updatedMap).reduce(
          (sum, count) => sum + count,
          0
        ),
        topReactions: sortedReactions,
        team: "14-8",
      };

      console.log("Sending request with body:", requestBody);

      // 서버로 요청 보내기
      const response = await recipientsService.postRecipientsReactions(
        id,
        requestBody
      );
      console.log("이모티콘 데이터 전송 성공:", response);
    } catch (error) {
      console.error("이모티콘 데이터 전송 실패:", error);
    }
  };

  useEffect(() => {
    if (Object.keys(emojiMap).length > 0) {
      sendReactionToServer(emojiMap);
    }
  }, [emojiMap]);

  const sortedEmojiMap = Object.entries(emojiMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_EMOJIS);

  return (
    <ServiceContainer>
      <Header>
        <TopEmojisContainer>
          {sortedEmojiMap.slice(0, TOP_EMOJIS).map(([emoji, count]) => (
            <TopEmojiItem key={emoji}>
              <EmojiImage>{emoji}</EmojiImage>
              <EmojiCount>{count}</EmojiCount>
            </TopEmojiItem>
          ))}
        </TopEmojisContainer>

        <ActionsContainer>
          {sortedEmojiMap.length > TOP_EMOJIS && (
            <ShowMoreButton onClick={() => setShowAllEmojis(!showAllEmojis)}>
              <Icon src={toggle} alt="더 보기" />
            </ShowMoreButton>
          )}

          <AddButton onClick={() => setShowPicker(!showPicker)}>
            <Icon src={EmojiIcon} alt="EmojiIcon" />
            추가
          </AddButton>
        </ActionsContainer>
      </Header>

      {showPicker && (
        <PickerWrapper ref={pickerRef}>
          <EmojiPicker
            onEmojiClick={handleEmojiSelect}
            width={306}
            height={392}
          />
        </PickerWrapper>
      )}

      {showAllEmojis && (
        <AllEmojisContainer ref={moreEmojisRef}>
          <MoreEmojisWrapper>
            {sortedEmojiMap.map(([emoji, count]) => (
              <AllEmojiItem key={emoji}>
                <EmojiImage>{emoji}</EmojiImage>
                <EmojiCount>{count}</EmojiCount>
              </AllEmojiItem>
            ))}
          </MoreEmojisWrapper>
        </AllEmojisContainer>
      )}
    </ServiceContainer>
  );
}

export default Emoji;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const ServiceContainer = styled.div`
  top: 6px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const TopEmojisContainer = styled.div`
  right: 10px;
  position: relative;
  display: flex;
  gap: 8px;
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
`;

const EmojiImage = styled.span`
  font-size: 20px;
`;

const EmojiCount = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ShowMoreButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 36px;
  height: 36px;
`;

const AddButton = styled.button`
  width: 88px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.colors.grayScale[300]};
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: ${(props) => props.theme?.Typography?.[16]?.fontSize || "16px"};
  padding: 6px 12px;
  color: ${(props) => props.theme.colors.black};
`;

const PickerWrapper = styled.div`
  position: absolute;
  top: 44px;
  right: 14px;
  z-index: 10;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const AllEmojisContainer = styled.div`
  position: absolute;
  top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeInAll 0.3s ease-in-out;

  @keyframes fadeInAll {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const MoreEmojisWrapper = styled.div`
  z-index: 10;
  position: absolute;
  top: -16px;
  right: -82px;
  width: 312px;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.grayScale[300]};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
`;

const AllEmojiItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 36px;
  border-radius: 32px;
  background-color: rgba(0, 0, 0, 0.54);
  color: ${(props) => props.theme.colors.white};
  padding: 8px 12px;
  font-size: ${(props) => props.theme?.Typography?.[20]?.fontSize || "20px"};
  text-align: center;
`;
