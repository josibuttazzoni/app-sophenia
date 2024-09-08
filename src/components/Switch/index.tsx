import React, { useState } from 'react';

type SwitchProps = {
  id: string;
  onToggle: (isChecked: boolean) => void;
};

export function Switch({ onToggle, id }: SwitchProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onToggle(newCheckedState);
  };

  return (
    <label
      htmlFor={id}
      className={`relative flex h-6 w-11 cursor-pointer rounded-full transition-all ${isChecked ? 'bg-disco' : 'bg-gray-200'} `}
    >
      <input type="checkbox" id={id} className="peer sr-only" onChange={handleToggle} />
      <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-all peer-checked:left-6" />
    </label>
  );
}
