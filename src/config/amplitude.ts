import * as amplitude from '@amplitude/analytics-browser';

import { HotjarPlugin } from '#lib/services/amplitude';

export const initAmplitude = () => {
  amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || '');
  amplitude.add(
    new HotjarPlugin(
      parseInt(process.env.NEXT_PUBLIC_HOTJAR_ID || ''),
      parseInt(process.env.NEXT_PUBLIC_HOTJAR_VERSION || '6')
    )
  );
};
