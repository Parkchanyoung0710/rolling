import { useState, useEffect } from "react";
import styled from "styled-components";
import backgroundImageService from "../../../../api/services/backgroundImagesService";

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
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center;
  border: ${(props) => (props.selected ? "4px solid #00a2fe" : "none")};
  box-shadow: ${(props) =>
    props.selected ? "0 0 15px rgba(0, 162, 254, 0.8)" : "none"};
`;

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
          />
        ))}
      </Bone>
    </div>
  );
};

export default ImgPicker;
