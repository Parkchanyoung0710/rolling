import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Emoji from "../Emoji/Emoji";
import styled from "styled-components";
import {
  Share,
  Complete,
  Close,
} from "../../../assets/images/icon/IconIndex.jsx";
import recipientsService from "../../../api/services/recipientsService.jsx";

function InformationBar() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const [profileImages, setProfileImages] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const buttonRef = useRef(null);

  useEffect(() => {
    if (!id) return;

    recipientsService
      .getRecipientsId(id)
      .then(({ data }) => {
        setName(data.name);
        setMessageCount(data.messageCount);

        const images = data.recentMessages.slice(0, 3);
        const imageUrls = images.map((msg) => msg.profileImageURL);
        setProfileImages(imageUrls);
      })
      .catch((error) => console.error("Error data", error))
      .finally(() => setIsLoading(false));
  }, [id]);

  const shareToKakao = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "웹사이트 공유 제목",
          description: "웹사이트 설명",
          imageUrl: "",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: "웹사이트 바로가기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    } else {
      alert("카카오톡 SDK 로드 실패");
    }
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000); // 토스트 메시지 창 시간 설정하기 5초
    });
  };

  const closeToast = () => {
    setShowToast(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <InformationBarWrapper>
      <InformationBarContainer>
        <LeftSection>
          <ToName>{`To. ${name}`}</ToName>
        </LeftSection>

        <RightSection>
          <WritedContainer>
            {profileImages.slice(0, 3).map((url, index) => (
              <Avatar key={index}>
                <img src={url} alt={`프로필 이미지 ${index + 1}`} />
              </Avatar>
            ))}

            {messageCount > 3 && (
              <Avatar>+{messageCount > 6 ? 6 : messageCount - 3} </Avatar>
            )}

            <WriteCount>{messageCount}</WriteCount>
            <WritedText>명이 작성했어요!</WritedText>
          </WritedContainer>

          <SeparatorContainer>
            <Separator />
          </SeparatorContainer>

          <Emoji type="" count={5} />
          <Separator />
          <Button ref={buttonRef} onClick={toggleModal}>
            <ShareIcon />
          </Button>
          {isModalOpen && (
            <Modal ref={modalRef}>
              <Option onClick={shareToKakao}>카카오톡 공유</Option>
              <Option onClick={handleCopyUrl}>URL 공유</Option>
            </Modal>
          )}
        </RightSection>
      </InformationBarContainer>

      {showToast && (
        <Toast>
          <IconTextWrapper>
            <IconWrapper>
              <Complete />
            </IconWrapper>
            <ToastMessage>URL이 복사되었습니다.</ToastMessage>
          </IconTextWrapper>

          <CloseButton onClick={closeToast}>
            <Close />
          </CloseButton>
        </Toast>
      )}
    </InformationBarWrapper>
  );
}

const ShareIcon = styled(Share)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Separator = styled.span`
  display: inline-block;
  width: 1px;
  height: 28px;
  background-color: ${({ theme }) => theme.colors.grayScale[300]};
  margin: 0 13px;
`;

const SeparatorContainer = styled.div`
  top: 6px;
  position: relative;
  left: -4px;
`;

const InformationBarWrapper = styled.nav`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;

const InformationBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1207px;
  height: 64px;
  padding: 13px 24px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const ToName = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 28px;
  line-height: 42px;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.grayScale[800]};
`;

const WritedContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

const WriteCount = styled.span`
  color: #181818;
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0%;
  line-height: 27px;
`;

const WritedText = styled.span`
  color: #181818;
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0%;
`;

const Avatar = styled.div`
  right: 10px;
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

  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grayScale[800]};

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

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.grayScale[300]};
  width: 56px;
  height: 36px;
  border-radius: 6px;
  padding: 6px 16px;
  cursor: pointer;
  font-size: 16px;
`;

const Modal = styled.div`
  padding: 10px 1px;
  position: absolute;
  top: 122px;
  background-color: ${({ theme }) => theme.colors.white};
  width: 140px;
  height: 120px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale[300]};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  opacity: 0;
  animation: fadeIn 0.3s forwards;

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

const Option = styled.div`
  padding: 10px;
  cursor: pointer;
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: -1%;
  color: ${({ theme }) => theme.colors.grayScale[800]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayScale[100]};
  }
`;

const Toast = styled.div`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 524px;
  height: 64px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 20px 40px;
  z-index: 100;
`;

const IconTextWrapper = styled.div`
  width: 350px;
  height: 26px;
  display: flex;
  align-items: center;
`;

const ToastMessage = styled.span`
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: -1%;
  color: ${({ theme }) => theme.colors.white};
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
`;

export default InformationBar;
