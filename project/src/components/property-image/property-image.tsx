import React from 'react';

type PropertyImageProps = {
  src: string
}


const PropertyImage: React.FC<PropertyImageProps> = ({ src }) => (
  <div className="property__image-wrapper">
    <img
      src={src}
      className="property__image"
      alt="Studio"
    />
  </div>
);

export default PropertyImage;
