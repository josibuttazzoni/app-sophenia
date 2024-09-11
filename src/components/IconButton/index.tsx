import React from 'react';

type IconButtonProps = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
};

export function IconButton({ icon: Icon, onClick }: IconButtonProps) {
  return (
    <button onClick={onClick}>
      <Icon className="hover:opacity-25" />
    </button>
  );
}
