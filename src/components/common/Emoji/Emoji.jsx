import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const MAX_EMOJIS = 3; // 최대 이모티콘 개수 설정

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
      <button onClick={() => setShowPicker(!showPicker)}>
        <img
          src="./src/images/emoji.png"
          alt="이모티콘"
          width="20"
          height="20"
        />
        추가
      </button>
      {showPicker && <EmojiPicker onEmojiClick={handleEmojiSelect} />}
      <div>
        {sortedEmojiMap.map(([emoji, count]) => (
          <span
            key={emoji}
            style={{
              fontSize: "20px",
              margin: "5px",
              transition: "all 0.3s ease",
            }}
          >
            {emoji} {count} {/* 괄호 없이 이모티콘과 개수 출력 */}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Emoji;
