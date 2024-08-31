import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useState } from 'react';

import { PageHead } from '#components/PageHead';
import { Sidebar } from '#components/Sidebar';
import { SIDEBAR_TABS } from '#components/Sidebar/constants';

export default function Home({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [selectedTab, setSelectedTab] = useState(SIDEBAR_TABS.BOARD);
  return (
    <>
      <PageHead />
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </>
  );
}

// This is the only page where this data is fetched server side
export const getServerSideProps: GetServerSideProps<{}> = async () => {
  return {
    props: {}
  };
};
