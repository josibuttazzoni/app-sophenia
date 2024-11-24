import Cloudy from '#assets/cloudy.svg';
import Rainy from '#assets/rainy.svg';
import SunCloudy from '#assets/sunCloudy.svg';
import Sunny from '#assets/sunny.svg';

const WEATHER_TYPES = {
  SNOW: 'snow',
  RAIN: 'rain',
  FOG: 'fog',
  WIND: 'wind',
  CLOUDY: 'cloudy',
  PARTLY_CLOUDY_DAY: 'partly-cloudy-day',
  PARTLY_CLOUDY_NIGHT: 'partly-cloudy-night',
  CLEAR_DAY: 'clear-day',
  CLEAR_NIGHT: 'clear-night'
};

export const WEATHER_ICONS = {
  [WEATHER_TYPES.SNOW]: Rainy,
  [WEATHER_TYPES.RAIN]: Rainy,
  [WEATHER_TYPES.FOG]: Cloudy,
  [WEATHER_TYPES.WIND]: Cloudy,
  [WEATHER_TYPES.CLOUDY]: Cloudy,
  [WEATHER_TYPES.PARTLY_CLOUDY_DAY]: SunCloudy,
  [WEATHER_TYPES.PARTLY_CLOUDY_NIGHT]: SunCloudy,
  [WEATHER_TYPES.CLEAR_DAY]: Sunny,
  [WEATHER_TYPES.CLEAR_NIGHT]: Sunny
};
