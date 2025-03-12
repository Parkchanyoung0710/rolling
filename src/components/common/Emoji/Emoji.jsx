import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import styled from "styled-components";

const MAX_EMOJIS = 3; // 최대 이모티콘 개수 설정

// 버튼 스타일 컴포넌트
const EmojiButton = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #fff;
  &:hover {
    background-color: #f1f1f1;
  }
  &:active {
    background-color: #e0e0e0;
  }
`;

// 이모티콘 표시 스타일 컴포넌트
const EmojiCount = styled.span`
  font-size: 20px;
  margin: 5px;
  transition: all 0.3s ease;
`;

function Emoji() {
  const [showPicker, setShowPicker] = useState(false);
  const [emojiMap, setEmojiMap] = useState({});

  function handleEmojiSelect(emojiObject) {
    setEmojiMap((prevMap) => {
      const updatedMap = { ...prevMap };
      const emoji = emojiObject.emoji;

      // 선택된 이모티콘의 개수를 증가시킴
      updatedMap[emoji] = (updatedMap[emoji] || 0) + 1;

      return updatedMap;
    });
    setShowPicker(false);
  }

  const sortedEmojiMap = Object.entries(emojiMap)
    .sort((a, b) => b[1] - a[1]) // 개수 순으로 정렬
    .slice(0, MAX_EMOJIS); // 상위 MAX_EMOJIS 개만 선택

  return (
    <div>
      <EmojiButton onClick={() => setShowPicker(!showPicker)}>
        <img
          src="./src/images/emoji.png"
          alt="이모티콘"
          width="20"
          height="20"
        />
        추가
      </EmojiButton>
      {showPicker && <EmojiPicker onEmojiClick={handleEmojiSelect} />}
      <div>
        {sortedEmojiMap.map(([emoji, count]) => (
          <EmojiCount key={emoji}>
            {emoji} {count}
          </EmojiCount>
        ))}
      </div>
    </div>
  );
}

export default Emoji;
