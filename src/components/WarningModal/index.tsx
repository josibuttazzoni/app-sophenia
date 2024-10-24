import { ReactNode } from 'react';

import ExclamationIcon from '#assets/exclamation.svg';

export default function WarningModal({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-y-5">
      <div className="w-fit rounded-lg bg-prim p-3 ">
        <ExclamationIcon />
      </div>
      {children}
    </div>
  );
}
