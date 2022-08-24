import React from 'react';
import { ImageLimit } from '../../const';
import PropertyImage from '../property-image/property-image';

type ImagesListProps = {
  imagesList: string[]
}

const ImagesList: React.FC<ImagesListProps> = ({ imagesList }) => {
  const imagesLimitCount = imagesList.slice(ImageLimit.Start, ImageLimit.End);
  return (
    <div className="property__gallery">
      {imagesLimitCount.map((src) => <PropertyImage key={src} src={src} />)}
    </div>
  );
};

export default ImagesList;
