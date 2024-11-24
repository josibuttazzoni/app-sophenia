import Image from 'next/image';
import React from 'react';

import image from '#assets/sophenia.png';

export default function Landing() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="max-h-xs relative h-full w-full max-w-xs">
        <Image src={image} alt="Description of image" fill style={{ objectFit: 'contain' }} />
      </div>
    </div>
  );
}
