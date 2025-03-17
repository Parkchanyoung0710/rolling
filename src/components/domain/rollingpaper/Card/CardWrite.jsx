import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const CardContainer = styled.div`
  width: 384px;
  height: 280px;
  background: #ffffff;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 28px 24px;
  box-sizing: border-box;
  cursor: pointer; /* 클릭 가능하도록 커서 변경 */
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const ProfileImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin-right: 8px;
`;

const Name = styled.div`
  font-weight: bold;
  margin-right: 8px;
`;

const Tag = styled.div`
  background: #e0f7fa;
  color: #00796b;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
`;

const Content = styled.div`
  flex-grow: 1;
  margin-bottom: 8px;
`;

const Date = styled.div`
  font-size: 12px;
  color: #757575;
  text-align: left;
`;

const CardWrite = ({ top, left }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState("2023-07-08");
  const [imageUrl, setImageUrl] = useState("https://example.com/profile.jpg");
  const [name, setName] = useState("이름");
  const [tag, setTag] = useState("태그");
  const [content, setContent] = useState("내용");

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CardContainer top={top} left={left} onClick={handleCardClick}>
        <Header>
          <ProfileImage src={imageUrl} alt="Profile" />
          <Name>{name}</Name>
          <Tag>{tag}</Tag>
        </Header>
        <Content>{content}</Content>
        <Date>{date}</Date>
      </CardContainer>
      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          date={date}
          imageUrl={imageUrl}
          name={name}
          tag={tag}
          content={content}
        />
      )}
    </>
  );
};

export default CardWrite;
