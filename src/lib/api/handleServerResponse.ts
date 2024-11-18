import { ApiResponse } from 'apisauce';

export function handleServerResponse<T>(response: ApiResponse<T>) {
  if (!response.ok) {
    throw new Error(response.problem);
  }
  return response.data;
}
