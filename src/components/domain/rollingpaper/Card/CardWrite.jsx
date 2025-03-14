import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 384px;
  height: 280px;
  background: #ffffff;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
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
  return (
    <CardContainer top={top} left={left}>
      <Header>
        <ProfileImage src="" alt="Profile" />
        <Name>From. 김동훈</Name>
        <Tag>가족</Tag>
      </Header>
      <Content>
        코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또
        하세요!
      </Content>
      <Date>2023.07.08</Date>
    </CardContainer>
  );
};

export default CardWrite;
