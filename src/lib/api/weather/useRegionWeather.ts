import { createQuery } from 'react-query-kit';
import { WeatherData } from 'src/types/weather';

import { getRegionWeather } from '#lib/services/weather';

export const useRegionWeather = createQuery({
  queryKey: [`/weather`],
  fetcher: (): Promise<WeatherData> => getRegionWeather()
});
