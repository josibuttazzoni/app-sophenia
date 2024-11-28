import { ReactNode } from 'react';

import { Sidebar } from './Sidebar';

export default function Layout({
  children,
  selectedTab,
  className
}: {
  children: ReactNode;
  selectedTab: string;
  className?: string;
}) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar selectedTab={selectedTab} />
      <div className={`ml-auto flex h-screen w-5/6 flex-col gap-y-6 overflow-auto px-8 py-12 ${className}`}>
        {children}
      </div>
    </div>
  );
}
