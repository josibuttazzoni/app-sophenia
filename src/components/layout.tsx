import { ReactNode } from 'react';

import { Sidebar } from './Sidebar';

export default function Layout({ children, selectedTab }: { children: ReactNode; selectedTab: string }) {
  return (
    <div className="flex h-full w-full">
      <Sidebar selectedTab={selectedTab} />
      <div className="flex h-full w-full flex-col gap-y-8 px-8 py-12">{children}</div>
    </div>
  );
}
