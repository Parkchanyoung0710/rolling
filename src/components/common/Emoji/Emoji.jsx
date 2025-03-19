import React, { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import styled from "styled-components";
import { ArrowDown } from "../../../assets/images/icon/IconIndex";
import recipientsService from "../../../api/services/recipientsService";
import { useParams } from "react-router-dom";
import Button from "../Button/Button";

const TOP_EMOJIS = 3;

function Emoji({ topReactions = [], setRecipientData }) {
  const [showPicker, setShowPicker] = useState(false);
  const [showAllEmojis, setShowAllEmojis] = useState(false);
  const [allReactions, setAllReactions] = useState(() => {

    const storedReactions = localStorage.getItem("allReactions");
    return storedReactions ? JSON.parse(storedReactions) : topReactions;
  });

  const moreEmojisRef = useRef(null);
  const pickerRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (moreEmojisRef.current && !moreEmojisRef.current.contains(event.target)) &&
        (pickerRef.current && !pickerRef.current.contains(event.target))
      ) {
        setShowAllEmojis(false);
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 이모티콘 추가 및 상태 업데이트
  const handleEmojiSelect = async (emojiObject) => {
    const { emoji } = emojiObject;
    const type = "increase";

    try {
      await recipientsService.postRecipientsReactions(id, { emoji, type });
      await fetchUpdatedReactions();
    } catch (error) {
      console.error("Error sending reaction:", error);
    }
  };

  
  const fetchUpdatedReactions = async () => {
    try {
      const response = await recipientsService.getRecipientsReactions(id);
      const updatedReactions = response.data.results;

      setRecipientData((prev) => ({
        ...prev,
        topReactions: updatedReactions,
      }));

      // 전체 이모티콘 리스트 업데이트 후 로컬 스토리지 저장
      setAllReactions(updatedReactions);
      localStorage.setItem("allReactions", JSON.stringify(updatedReactions));
    } catch (error) {
      console.error("Error fetching reactions:", error);
    }
  };

  return (
    <ServiceContainer>
      <Header>
        <TopEmojisContainer>
          {topReactions.slice(0, TOP_EMOJIS).map(({ emoji, count }) => (
            <TopEmojiItem key={emoji}>
              <EmojiImage>{emoji}</EmojiImage>
              <EmojiCount>{count}</EmojiCount>
            </TopEmojiItem>
          ))}
        </TopEmojisContainer>

        <ActionsContainer>
          {allReactions.length > TOP_EMOJIS && (
            <ShowMoreButton onClick={() => setShowAllEmojis(!showAllEmojis)}>
              <ArrowDown alt="더 보기" />
            </ShowMoreButton>
          )}
          <Button onClick={() => setShowPicker(!showPicker)} variant="outlined" image="add">추가</Button>
        </ActionsContainer>
      </Header>

      {showPicker && (
        <PickerWrapper ref={pickerRef}>
          <EmojiPicker onEmojiClick={handleEmojiSelect} width={306} height={392} />
        </PickerWrapper>
      )}

      {showAllEmojis && (
        <AllEmojisContainer ref={moreEmojisRef}>
          <MoreEmojisWrapper>
            {allReactions.map(({ emoji, count }) => (
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
