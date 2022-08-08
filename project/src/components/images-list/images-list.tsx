import React from 'react';
import PropertyImage from '../property-image/property-image';

type ImagesListProps = {
  imagesList: string[]
}

const ImagesList: React.FC<ImagesListProps> = ({ imagesList }) => {
  const imagesLimitCount = imagesList.slice(0, 6);
  return (
    <div className="property__gallery">
      {imagesLimitCount.map((src) => <PropertyImage key={src} src={src} />)}
    </div>
  );
};

export default ImagesList;
