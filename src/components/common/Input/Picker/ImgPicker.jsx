import { useState, useEffect } from "react";
import styled from "styled-components";
import backgroundImageService from "../../../../api/services/backgroundImagesService";
import { Check } from "../../../../assets/images/icon/IconIndex"; // Check 아이콘 불러오기

const Bone = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin: 45px 0;
  @media (max-width: 767px) {
    display: grid;
    grid-template: 1fr 1fr / 1fr 1fr;
    width: fit-content;
  }
`;

const Image = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "image",
})`
  width: 10.5rem;
  height: 10.5rem;
  cursor: pointer;
  border-radius: 1rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  @media (max-width: 768px) {
    width: 154px;
    height: 154px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${(props) => `url(${props.image})`};
    background-size: 1920px 1080px; /*이미지 사이즈 조절함함*/
    background-position: center;
    opacity: ${(props) =>
      props.selected ? 0.3 : 1}; /* 선택된 이미지에만 opacity 30% 적용 */
  }
`;

const CheckWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #555555;
  display: flex;
  align-items: center;
  justify-content: center;
`;
// 토글 버튼에서 이미지 클릭시 적용되는 컴포넌트트
const ImgPicker = ({ onSelect }) => {
  const [images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await backgroundImageService.getBackgroundImage();
        if (response.data && response.data.imageUrls) {
          setImages(response.data.imageUrls);
        } else {
          console.log("이미지가 없습니다.");
        }
      } catch (error) {
        console.error("이미지를 불러오는 중 오류 발생:", error);
      }
    };
    fetchImages();
  }, []);

  const handleImageChange = (image) => {
    setSelectedImg(image);
    onSelect(image); // 부모 컴포넌트에 선택된 이미지 전달
  };

  if (images.length === 0) {
    return <p>이미지를 불러오는 중입니다...</p>; // 이미지가 없을 때 메시지
  }

  return (
    <div>
      <Bone>
        {images.map((image, index) => (
          <Image
            key={index}
            image={image}
            selected={selectedImg === image}
            onClick={() => handleImageChange(image)}
          >
            {selectedImg === image && (
              <CheckWrapper>
                <Check width={24} height={24} />
              </CheckWrapper>
            )}
          </Image>
        ))}
      </Bone>
    </div>
  );
};
export default ImgPicker;
