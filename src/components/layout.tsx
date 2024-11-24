import { ReactNode } from 'react';

import { Sidebar } from './Sidebar';

export default function Layout({ children, selectedTab }: { children: ReactNode; selectedTab: string }) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar selectedTab={selectedTab} />
      <div className="ml-auto flex h-screen w-5/6 flex-col gap-y-6 overflow-auto px-8 py-12">{children}</div>
    </div>
  );
}
