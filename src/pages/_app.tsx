import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import { Footer } from '#components/Layout/Footer';
import QueryProvider from '#lib/providers/QueryClient';
// import { initAmplitude } from '#config/amplitude';
// import { initHotjar } from '#config/hotjar';
import '#styles/main.css';

function App({ Component, pageProps }: AppProps) {
  // initAmplitude();
  // initHotjar();

  return (
    <QueryProvider>
      <SessionProvider session={pageProps.session}>
        <main className="flex min-h-screen w-full flex-col items-center gap-4 bg-main-page-gradient p-10 text-white">
          <Component {...pageProps} />
          <Footer />
        </main>
      </SessionProvider>
    </QueryProvider>
  );
}

export default App;
