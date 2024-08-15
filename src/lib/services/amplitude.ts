import { DestinationPlugin, Event, Result } from '@amplitude/analytics-types';
import { default as hj } from '@hotjar/browser';

type UserInfo = Record<string | number, string | number | Date | boolean>;

export class HotjarPlugin implements DestinationPlugin {
  name = 'hotjar';
  type = 'destination' as const;
  siteId: number;
  hotjarVersion: number;

  constructor(siteId: number, hotjarVersion: number) {
    this.siteId = siteId;
    this.hotjarVersion = hotjarVersion;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async setup(): Promise<void> {
    hj.init(this.siteId, this.hotjarVersion);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async execute(event: Event): Promise<Result> {
    if (event.event_type === '$identify') {
      const { user_id, device_id, user_properties } = event;
      const hotjarId = user_id || device_id || '';
      hj.identify(hotjarId, (user_properties || {}) as UserInfo);
    } else {
      hj.event(event.event_type);
    }
    return {
      code: 0,
      event,
      message: 'Event forwarded to Hotjar API'
    } as Result;
  }
}
