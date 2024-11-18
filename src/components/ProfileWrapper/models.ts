import { ErrorApiResponse } from 'src/types/api/errors';

import { STATUS_CODES } from '#constants/api';

export const isUnauthorized = (data: ErrorApiResponse) => data.statusCode === STATUS_CODES.UNAUTHORIZED;
