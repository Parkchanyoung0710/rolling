import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import recipientsService from "../../../../api/services/recipientsService"; // get 요청

const CardContainer = styled.div`
  width: 384px;
  height: 280px;
  background: #ffffff;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  top: ${(props) => props.top || "0"}; /* top 값을 받아서 사용 */
  left: ${(props) => props.left || "0"}; /* left 값을 받아서 사용 */
`;

const CircleButton = styled.button`
  position: absolute;
  width: 56px;
  height: 56px;
  left: calc(50% - 56px / 2);
  top: calc(50% - 56px / 2);
  background: #555555;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    background: #444444;
  }

  &:active {
    background: #333333;
  }
`;

const PlusIcon = styled.div`
  position: relative;
  width: 24px;
  height: 24px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: #ffffff;
  }

  &::before {
    width: 3px;
    height: 20.57px;
    left: 10.5px;
    top: 1.71px;
  }

  &::after {
    width: 20.57px;
    height: 3px;
    left: 1.71px;
    top: 10.5px;
  }
`;

const Card = () => {
  const { id } = useParams(); // URL에서 id를 가져오기
  const [postData, setPostData] = useState(null);
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await recipientsService.getRecipients(
          `/14-8/recipients/`
        );
        setPostData(response.data);

        const foundRecipient = response.data.results.find(
          (recipient) => recipient.id === Number(id)
        );
        setSelectedRecipient(foundRecipient);
      } catch (error) {
        console.error("데이터를 가져오지 못했습니다:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleCardButtonClick = () => {
    navigate(`/post/${id}/message`);
  };
  return (
    <CardContainer>
      <CircleButton onClick={handleCardButtonClick}>
        <PlusIcon />
      </CircleButton>
    </CardContainer>
  );
};

export default Card;
