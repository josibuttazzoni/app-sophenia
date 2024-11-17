import React, { useRef } from 'react';
import { cn } from 'src/utils/components';

import File from '#assets/file.svg';
import { Button } from '#components/ui/button';

export interface ImageUploadButtonProps {
  onFileSelect: (file: File | null) => void;
  buttonLabel?: string;
  accept?: string;
  className?: string;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  onFileSelect,
  accept = 'image/*',
  className
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileSelect(file);
  };

  return (
    <div className="flex flex-col items-center">
      <Button size="icon" variant="ghost" type="button" onClick={handleButtonClick} className={className}>
        <File className="text-lg" />
      </Button>
      <input ref={fileInputRef} type="file" accept={accept} className="hidden" onChange={handleFileChange} />
    </div>
  );
};

export default ImageUploadButton;
