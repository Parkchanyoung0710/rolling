import React from "react";
import styled from "styled-components";

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* z-index를 높게 설정 */
`;

const ModalContainer = styled.div`
  position: relative;
  width: 600px;
  height: 476px;
  background: #ffffff;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const ConfirmButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 7px 16px;
  gap: 10px;
  position: absolute;
  width: 120px;
  height: 40px;
  left: 240px;
  top: 396px;
  background: #9935ff;
  border-radius: 6px;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: #7a2ecc;
  }

  &:active {
    background: #5c2399;
  }
`;

const DateContainer = styled.div`
  position: absolute;
  width: 70px;
  height: 20px;
  top: 56px;
  left: 484px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap; /* 날짜가 한 줄에 나오도록 설정 */
`;

const InfoContainer = styled.div`
  position: absolute;
  width: 181px;
  height: 56px;
  top: 40px;
  left: 39px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ImageContainer = styled.div`
  box-sizing: border-box;
  width: 56px;
  height: 56px;
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 100px;
  border-width: 1px;
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

const Divider = styled.div`
  position: absolute;
  width: 520px;
  height: 1px;
  top: 115px;
  left: 39px;
  background: #eeeeee;
`;

const ContentContainer = styled.div`
  position: absolute;
  width: 520px;
  height: 256px;
  top: 116px;
  left: 40px;
  background: #ffffff; /* 배경색을 #FFFFFF로 설정 */
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;
  overflow-y: auto; /* 세로 스크롤바 추가 */
  overflow-x: hidden; /* 가로 스크롤바 숨김 */
  white-space: pre-wrap; /* 줄 바꿈과 공백을 유지하면서 텍스트를 자동으로 줄 바꿈 */
  word-wrap: break-word; /* 단어가 길 경우 줄 바꿈 */
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #cccccc #ffffff; /* Firefox */

  &::-webkit-scrollbar {
    width: 4px; /* 스크롤바 너비 */
  }

  &::-webkit-scrollbar-track {
    background: #ffffff; /* 스크롤바 트랙 배경색 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cccccc; /* 스크롤바 색상 */
    border-radius: 8px; /* 스크롤바 둥글게 */
  }
`;

const Modal = ({ onClose, date, imageUrl, name, tag, content }) => {
  return (
    <Background>
      <ModalContainer>
        <InfoContainer>
          <ImageContainer>
            <ProfileImage src={imageUrl} alt="Profile" />
          </ImageContainer>
          <div>
            <Name>{name}</Name>
            <Tag>{tag}</Tag>
          </div>
        </InfoContainer>
        <DateContainer>{date}</DateContainer>
        <Divider />
        <ContentContainer dangerouslySetInnerHTML={{ __html: content }} />
        <ConfirmButton onClick={onClose}>확인</ConfirmButton>
      </ModalContainer>
    </Background>
  );
};

export default Modal;
