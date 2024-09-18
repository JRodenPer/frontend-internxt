import React from "react";
import "./Gallery.styles.css";
import { usePhotos } from "../../hooks/usePhotos";
import Photo from "../photo";
import Loading from "../loading";

const errorTxt = "Something went wrong. Please try again to charge pictures.";
const infoTxt = "This is the end of the gallery";

const Gallery: React.FC = () => {
  const { photos, loading, error, hasMore, lastPhotoRef, handleImageLoad } =
    usePhotos();

  return (
    <div>
      {loading && <Loading />}
      <div className="gallery">
        {photos.map((photo, index) => {
          if (index === photos.length - 1 && !loading) {
            return (
              <div ref={lastPhotoRef} key={index} className="photo">
                <Photo photo={photo} onImageLoad={handleImageLoad} />
              </div>
            );
          } else {
            return (
              <Photo key={index} photo={photo} onImageLoad={handleImageLoad} />
            );
          }
        })}
      </div>
      <div className="containerMsg">
        {error === "UNKNOWN_ERROR" ? (
          <p className="errorMsg">{errorTxt}</p>
        ) : (
          !hasMore && <p className="infoMsg">{infoTxt}</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
