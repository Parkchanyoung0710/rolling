import "../../../../styles/GlobalStyles";
import "../../../../styles/textStyle";
import "../../../../styles/theme";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { textStyle } from "../../../../styles/textStyle";
import profileImageService from "../../../../api/services/profileImagesService";

const Bone = styled.div`
  margin: 3.125rem auto 3.125rem auto;
  width: 44.813rem;
  height: auto;
  @media (max-width: 768px) {
    width: auto;
  }
`;

const ProfileText = styled.div`
  ${(props) => textStyle(24, 700)(props)}
  margin-bottom: 1.333rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
`;

const ProfileBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const ProfileImg = styled.img`
  width: 5rem;
  height: 5rem;
  margin-right: 2rem;
  border-radius: 50%;
  @media (max-width: 768px) {
    margin-right: 1.76rem;
  }
  @media (max-width: 360px) {
    margin-right: 1.5rem;
  }
`;

const ProfileChoiceText = styled.div`
  ${(props) => textStyle(16, 400)(props)}
`;

const ProfileImgChoice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 37.813rem;
  height: 3.5rem;
  margin: 0.75rem 0 0 0;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    margin: 0.75rem 0 0 0;
    flex-wrap: wrap;
    gap: 4px;
    justify-content: flex-start;
    width: auto;
    height: auto;
  }
`;

const Image = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "image",
})`
  display: flex;
  flex-direction: row;
  width: 3.5rem;
  height: 3.5rem;
  cursor: pointer;
  border-radius: 50%;
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center;
  border: ${(props) => (props.selected ? "3px solid #00a2fe" : "none")};
  transition: box-shadow 0 0 5px rgba(0, 162, 254, 0.5); /* 부드러운 전환 효과 추가 */
  box-shadow: ${(props) =>
    props.selected
      ? "0 0 5px rgba(0, 162, 254, 0.5)"
      : "none"}; /* 선택 시 box-shadow 추가 */
  @media (max-width: 360px) {
    width: 40px;
    height: 40px;
  }
`;

function ProfileInputChoiceImage({ onImageSelect }) {
  const [images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);

  // API에서 이미지 가져오기
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await profileImageService.getProfileImageService();
        setImages(response.data.imageUrls);
        console.log(response);
      } catch (error) {
        console.error("이미지를 불러오는 중 오류 발생:", error);
      }
    };
    fetchImages();
  }, []);

  const handleImageChange = (image) => {
    setSelectedImg(image);
    onImageSelect(image);
    console.log("선택된 프로필 이미지:", image);
  };

  return (
    <Bone>
      <ProfileText>프로필 이미지</ProfileText>
      <ProfileBox>
        <ProfileImg src={selectedImg || images[0]} />
        <div>
          <ProfileChoiceText>프로필 이미지를 선택해주세요!</ProfileChoiceText>
          <ProfileImgChoice>
            {images.map((image, index) => (
              <Image
                key={index}
                image={image}
                selected={selectedImg === image}
                onClick={() => handleImageChange(image)}
              />
            ))}
          </ProfileImgChoice>
        </div>
      </ProfileBox>
    </Bone>
  );
}
export default ProfileInputChoiceImage;
