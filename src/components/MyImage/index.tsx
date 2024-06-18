import React from 'react';

import './MyImage.css';

interface MyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export const MyImage: React.FC<MyImageProps> = ({ src, ...props }) => {
  const [imageSrc, setImageSrc] = React.useState<string>('');

  React.useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setImageSrc(src);
    };
  });

  return (
    <div className="user-page__image-wrapper">
      {imageSrc !== '' ? (
        <img src={src} alt="User image" {...props} />
      ) : (
        <div className="image__skeleton"><p>Загрузка фото...</p></div>
      )}
    </div>
  );
};
