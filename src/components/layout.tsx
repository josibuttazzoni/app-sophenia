import { ReactNode, useState } from 'react';

import { Sidebar } from './Sidebar';
import { SIDEBAR_TABS } from './Sidebar/constants';

export default function Layout({ children }: { children: ReactNode }) {
  const [selectedTab, setSelectedTab] = useState(SIDEBAR_TABS.TASKS);

  return (
    <>
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {children}
    </>
  );
}
