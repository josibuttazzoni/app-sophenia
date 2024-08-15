import Hotjar from '@hotjar/browser';

const hotjarId = process.env.NEXT_PUBLIC_HOTJAR_ID || '';
const hotjarVersion = process.env.NEXT_PUBLIC_HOTJAR_VERSION || '6';

export const initHotjar = () => Hotjar.init(parseInt(hotjarId), parseInt(hotjarVersion));
