import { WeatherData } from 'src/types/weather';

import api from '#config/api';

export const getRegionWeather = async () => {
  const response = await api.get<WeatherData>('/weather');
  if (!response.data) {
    throw new Error('Failed to fetch weather data');
  }
  return response.data!;
};
