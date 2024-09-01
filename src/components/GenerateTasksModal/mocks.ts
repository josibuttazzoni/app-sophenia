import Cloudy from '#assets/cloudy.svg';
import Rainy from '#assets/rainy.svg';
import SunCloudy from '#assets/sunCloudy.svg';
import Sunny from '#assets/sunny.svg';

export const EMPLOYEES_MOCK = [
  'Santiago Benedetti',
  'Juan Ontiveros',
  'Maria Jose Buttazzoni',
  'Martina Mattioli',
  'Matias Puyol',
  'Eugenia de Aramburu'
];

const WEATHER_TYPES = {
  SUNNY: 'sunny',
  RAINY: 'rainy',
  SUN_CLOUDY: 'sunCloudy',
  CLOUDY: 'cloudy'
};

export const WEATHER_ICONS = {
  [WEATHER_TYPES.SUNNY]: Sunny,
  [WEATHER_TYPES.SUN_CLOUDY]: SunCloudy,
  [WEATHER_TYPES.RAINY]: Rainy,
  [WEATHER_TYPES.CLOUDY]: Cloudy
};

export const WEATHER_MOCK = [
  {
    day: 'lunes',
    min: 9,
    max: 22,
    weather: WEATHER_TYPES.SUNNY
  },
  {
    day: 'martes',
    min: 4,
    max: 18,
    weather: WEATHER_TYPES.SUNNY
  },
  {
    day: 'miercoles',
    min: 6,
    max: 24,
    weather: WEATHER_TYPES.CLOUDY
  },
  {
    day: 'jueves',
    min: 9,
    max: 23,
    weather: WEATHER_TYPES.SUN_CLOUDY
  },
  {
    day: 'viernes',
    min: 8,
    max: 20,
    weather: WEATHER_TYPES.RAINY
  }
];
