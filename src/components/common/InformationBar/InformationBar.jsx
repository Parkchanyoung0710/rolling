import { useState, useRef, useEffect } from "react";
import Emoji from "../Emoji/Emoji";
import styled from "styled-components";
import {
  Complete,
  Close,
} from "../../../assets/images/icon/IconIndex.jsx";
import IconButton from "../Button/IconButton.jsx";

function InformationBar({
  name,
  profileImages,
  count,
  topReactions,
  setRecipientData,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [showToast, setShowToast] = useState(false);
  const buttonRef = useRef(null);


  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("0e75199aafea8afc76aa6dd724c8f4bd");  // 🔥 여기에 JavaScript 키 입력
      console.log("Kakao SDK Initialized");
    }
  }, []);

  const shareToKakao = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "롤링페이퍼 8팀",
          description: "친구들에게 멋진 롤링페이퍼를 공유해 보세요!🎉",
          imageUrl: "https://cdn-icons-png.flaticon.com/512/5220/5220478.png",
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
            {profileImages &&
              profileImages.slice(0, 3).map((url, index) => (
                <Avatar key={index}>
                  <img src={url} alt={`프로필 이미지 ${index + 1}`} />
                </Avatar>
              ))}

            {count > 3 && <Avatar>+{count - 3}</Avatar>}

            <WriteCount>{count}</WriteCount>
            <WritedText>명이 작성했어요!</WritedText>
          </WritedContainer>

          <SeparatorContainer>
            <LeftSeparator />
          </SeparatorContainer>

          <Emoji
            type=""
            count={5}
            name={name}
            topReactions={topReactions}
            setRecipientData={setRecipientData}
            />
          <Separator />
          
          <IconButton ref={buttonRef} onClick={toggleModal}
          image="share" width="56" height="40"/>
          
          {isModalOpen && (
            <Modal ref={modalRef}>
              <Option onClick={shareToKakao}> 카카오톡 공유</Option>
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


const LeftSeparator = styled.span`
display: inline-block;
width: 1px;
height: 30px;
background-color: ${({ theme }) => theme.colors.grayScale[300]};
margin: 0 13px;

@media (max-width: 1199px) {
    display: none;  
  }
`;
const Separator = styled.span`
  display: inline-block;
  width: 1px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.grayScale[300]};
  margin: 0 13px;

  @media (max-width: 768px) {
    margin: 0 0px;
  }
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
  width: min(100%, 1200px);
  margin-inline: auto;
  padding: 0 24px;
  box-sizing: border-box;
  height: 68px;
  background-color: ${({ theme }) => theme.colors.white};

  @media (max-width: 1199px) {
    padding: 13px 24px;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    height: auto;
    padding: 10px;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;

  @media (max-width: 767px) {
    width: 100%;
    justify-content: center;
    margin-bottom: 10px;
  }
`;

const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-top: 10px;

  @media (max-width: 1199px) {
    margin-top:0px;
  }
  @media (max-width: 767px) {
    margin-top:-8px;
    justify-content: center;
    gap: 20px;
  }
`;

const ToName = styled.div`
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 28px;
  line-height: 42px;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.grayScale[800]};
  margin-right: 10px;

  @media (max-width: 767px) {
    left: 22px;
    font-size: 24px;
    margin-right: 0;
    margin-bottom: 10px;
    top:10px;
    position: absolute;
  }
`;

const WritedContainer = styled.div`
  display: inline-flex;
  align-items: center;

  @media (max-width: 767px) {
    display: none;
  }
`;

const WriteCount = styled.span`
  color: #181818;
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0%;
  line-height: 27px;

  @media (max-width: 1199px) {
    display: none;  
  }
  @media (max-width: 767px) {
    display: none;
  }
`;

const WritedText = styled.span`
  color: #181818;
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0%;

  @media (max-width: 1199px) {
    display: none;  
  }
  @media (max-width: 767px) {
    display: none;
  }
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

  @media (max-width: 1199px) {
    display: none;  
  }
  @media (max-width: 767px) {
    display: none;
  }
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
  animation: fadeIn 0.3s forwards;
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

  @media (max-width: 767px) {
    top: 100px;
    width: 120px;
    height: 100px;
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

  @media (max-width: 767px) {
    width: 320px;
    height: 64px;
  }
`;

const ToastMessage = styled.span`
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: -1%;
  color: ${({ theme }) => theme.colors.white};
`;

const IconTextWrapper = styled.div`
  width: 350px;
  height: 26px;
  display: flex;
  align-items: center;
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
