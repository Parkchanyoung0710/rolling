import { useState, useEffect } from "react";
import styled from "styled-components";
import backgroundImageService from "../../../../api/services/backgroundImagesService";
import { Check } from "../../../../assets/images/icon/IconIndex"; // Check 아이콘 불러오기

const Bone = styled.div`
  width: 45rem;
  height: 10.5rem;
  display: flex;
  justify-content: space-between;
  margin: 2.813rem 0;
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

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${(props) => `url(${props.image})`};
    background-size: cover;
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
const ImgPicker = () => {
  const [images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);

  // API에서 이미지 가져오기
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await backgroundImageService.getBackgroundImage();
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
  };

  return (
    <div>
      {/* 이미지 선택 버튼 */}
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
