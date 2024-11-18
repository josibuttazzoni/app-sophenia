import { create } from 'apisauce';
import { getCookie, hasCookie } from 'cookies-next';

import { HEADERS } from '#constants/api';
import { COOKIES } from '#constants/cookies';

const api = create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    ...(hasCookie(COOKIES.AUTH_TOKEN)
      ? { [HEADERS.AUTHORIZATION]: `Bearer ${getCookie(COOKIES.AUTH_TOKEN)}` }
      : {})
  }
});

export default api;
