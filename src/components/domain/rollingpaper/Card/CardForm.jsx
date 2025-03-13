import React from "react";
import styled from "styled-components";
import Card from "./Card";

/**
 * CardForm 컴포넌트 - 롤링 페이퍼 카드 페이지의 UI를 구현합니다.
 *
 * @returns {JSX.Element} - 롤링 페이퍼 카드 UI
 */
const CardForm = () => {
  return (
    <PageContainer>
      <Card top="246px" left="360px" />
    </PageContainer>
  );
};

export default CardForm;

// 스타일 컴포넌트 정의
const PageContainer = styled.div`
  background-color: #ffe2ad;
  min-height: 100vh;
  position: relative; /* 자식 요소의 절대 위치를 설정하기 위해 필요 */
`;
