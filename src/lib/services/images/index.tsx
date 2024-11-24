import { ApiResponse } from 'apisauce';
import { ImageResponse } from 'src/types/images';

import api from '#config/api';

export const uploadImage = async (image: File): Promise<ApiResponse<ImageResponse>> => {
  const formData = new FormData();
  formData.append('file', image);

  const response = await api.post<{ fileId: string }>('/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  if (!response.data) {
    throw new Error('Failed to upload image');
  }

  const adaptedData: ImageResponse = {
    fileId: response.data.fileId
  };

  return {
    ...response,
    data: adaptedData
  };
};
