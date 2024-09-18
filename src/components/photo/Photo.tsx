import React, { useState } from "react";
import { Photo as PhotoType } from "../../types/photos";
import "./Photo.styles.css";

interface PhotoProps {
  photo: PhotoType;
  onImageLoad: () => void;
}

const Photo: React.FC<PhotoProps> = ({ photo, onImageLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
    onImageLoad();
  };
  return (
    <img
      className={`photo ${isLoaded ? "loaded" : "loading"}`}
      src={photo.previewUrl}
      alt={photo.name}
      onLoad={handleImageLoad}
    />
  );
};

export default Photo;
