export type ApiEndpoint = {
  route: string;
  data?: {
    body?: object;
    params?: object;
    query?: object;
  };
  response: object;
};

export type ApiError = {
  internalCode: number;
  message: string;
  details?: string[];
};

export const AMPLITUDE_SESSION_HEADER_KEY = 'x-amplitude-session-id';
