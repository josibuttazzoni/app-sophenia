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

export const WEATHER_ICONS = {
  sunny: Sunny,
  sunCloudy: SunCloudy,
  rainy: Rainy,
  cloudy: Cloudy
};

export const WEATHER_MOCK = [
  {
    day: 'lunes',
    min: 9,
    max: 22,
    weather: 'sunny'
  },
  {
    day: 'martes',
    min: 4,
    max: 18,
    weather: 'sunny'
  },
  {
    day: 'miercoles',
    min: 6,
    max: 24,
    weather: 'sunCloudy'
  },
  {
    day: 'jueves',
    min: 9,
    max: 23,
    weather: 'rainy'
  },
  {
    day: 'viernes',
    min: 8,
    max: 20,
    weather: 'cloudy'
  }
];
