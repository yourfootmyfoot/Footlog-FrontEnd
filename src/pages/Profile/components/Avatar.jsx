import { useState } from 'react';
import { cn } from '@/lib/utils';

function Avatar({ src, className }) {
  const defaultAlt = 'Avatar image';
  const defaultFallbackSrc = 'https://via.placeholder.com/150';
  const [imgSrc, setImgSrc] = useState(src || defaultFallbackSrc);

  const handleError = () => {
    setImgSrc(defaultFallbackSrc);
  };

  return (
    <img
      src={imgSrc}
      alt={defaultAlt}
      onError={handleError}
      className={cn('rounded-full object-cover', `w-16 h-16`, className)}
    />
  );
}

export default Avatar;
