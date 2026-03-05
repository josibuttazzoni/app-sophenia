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
      <div
        className={`flex h-screen w-full flex-col gap-y-6 overflow-auto px-4 pt-20 pb-6 md:px-8 lg:ml-56 lg:w-[calc(100%-14rem)] lg:py-12 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
