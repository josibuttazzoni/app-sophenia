import { ApiResponse } from 'apisauce';
import { Image } from 'src/types/api/image';

import api from '#config/api';

export const uploadImage = async (image: File): Promise<ApiResponse<string>> => {
  const formData = new FormData();
  formData.append('file', image);

  const response = await api.post<string>('/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  if (!response.data) {
    throw new Error('Failed to upload image');
  }

  return response;
};
