import { HydrationBoundary, QueryClientProvider, dehydrate } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import { PageHead } from '#components/PageHead';
import { queryClient } from '#lib/api';
import { usePersistedQueryClient } from '#lib/hooks/query/usePersistedQueryClient';
import { getHealth } from '#lib/services/health';
import '#styles/main.css';

const montserrat = Montserrat({
  preload: true,
  display: 'swap',
  subsets: ['latin']
});

function App({ Component, pageProps }: AppProps) {
  usePersistedQueryClient(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <SessionProvider session={pageProps.session}>
          <ToastContainer />
          <style jsx global>{`
            html {
              font-family: ${montserrat.style.fontFamily};
            }
          `}</style>
          <main className="flex h-full w-full flex-col items-center justify-center bg-neutral-100 font-normal text-neutral-600">
            <PageHead />
            <Component {...pageProps} />
          </main>
        </SessionProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

export async function getServerSideProps() {
  // TODO: Get queryKey from useHealth hook or abstract into a util to prefetch certain hooks.
  await queryClient.prefetchQuery({
    queryKey: ['/health'],
    queryFn: getHealth
  });
  // TODO: Abstract as a type beforehand so we can specify and infer types inside pageProps.
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default App;
