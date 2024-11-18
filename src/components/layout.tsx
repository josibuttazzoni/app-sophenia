import { ReactNode } from 'react';

import ProfileWrapper from './ProfileWrapper';
import { Sidebar } from './Sidebar';

export default function Layout({ children, selectedTab }: { children: ReactNode; selectedTab: string }) {
  return (
    <div className="flex min-h-screen w-full">
      <ProfileWrapper>
        <Sidebar selectedTab={selectedTab} />
        <div className="flex w-full flex-1 flex-col gap-y-8 px-8 py-12">{children}</div>
      </ProfileWrapper>
    </div>
  );
}
