import { dehydrate } from '@tanstack/react-query';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { Counter } from '#components/Counter';
import { Header } from '#components/Layout/Header';
import { PageHead } from '#components/PageHead';
import { StatusIndicator } from '#components/StatusIndicator';
import { queryClient } from '#lib/api';
import { CounterProvider } from '#lib/providers/CounterContext';

export default function Home({ initialCount }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <PageHead />
      <Header />
      <StatusIndicator />
      <CounterProvider count={initialCount}>
        <Counter />
      </CounterProvider>
    </>
  );
}

// This is the only page where this data is fetched server side
export const getServerSideProps: GetServerSideProps<{
  initialCount: number;
}> = async () => {
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      initialCount: -10
    }
  };
};
