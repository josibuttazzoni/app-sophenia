import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

import { getQueryClient } from '#utils/query';

export default function QueryProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={getQueryClient()}>{children}</QueryClientProvider>;
}
