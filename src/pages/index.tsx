import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { PAGES_PATHS } from '#constants/pages';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(PAGES_PATHS.LOGIN);
  }, [router]);

  return null;
}
