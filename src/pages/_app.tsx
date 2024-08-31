import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';

import QueryProvider from '#lib/providers/QueryClient';
import '#styles/main.css';

const montserrat = Montserrat({
  preload: true,
  display: 'swap',
  subsets: ['latin']
});

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <SessionProvider session={pageProps.session}>
        <main
          className={`${montserrat.className} bg-neutral-200 text-oxford-blue flex h-screen min-h-screen w-full flex-col items-center gap-4`}
        >
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </QueryProvider>
  );
}

export default App;
