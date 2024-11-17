/* eslint-disable max-lines */
import { GET_DAY, GET_MONTH, LOCALES, TIME_ZONES, WEEKEND_DAYS } from './constants';

type ValidTypesToDateFormat = string | number | Date;

/**
 * @module Date
 */

// Getters
const currentDate = () => new Date();
export const currentYear = currentDate().getFullYear();

// Formatting

/**
 * Given a time in hours, returns it with a two digit format.
 * @function
 * @example
 * // returns '03'
 * formatTime('3');
 * @param {number} time Time in hours
 * @returns  {string} Formatted time
 */
export const formatTime = (time: number): string => `0${time}`.slice(-2);

/**
 * Given a date, returns it formatted as 'HH:MM'
 * @function
 * @example
 * // returns for example '17:30'
 * dateToTime(new Date());
 * @param {Date} date Date
 * @returns {string} Formatted time
 */
export const dateToTime = (date: Date): string =>
  `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}`;

/**
 * Given a date, returns it formatted as 'MM/DD/YYYY, HH:MM'
 * @param {Date} date Date
 * @returns {string} Formatted date
 */
export const buildDateAndHour = (date: Date): string => `${date.toLocaleDateString()}, ${dateToTime(date)}`;

/**
 * Given a date, returns it formatted as UTC.
 * @function
 * @param {Date} date Date
 * @returns {Date} UTC Date
 */
export const dateToUTC = (date: Date): Date =>
  new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );

/**
 * Given a date, returns a date formatted according to the locale and the timezone.
 * @function
 * @example
 * // returns '25/12/1995'
 * formatDateES(new Date('Mon, 25 Dec 1995 13:30:00 GMT'));
 * @param {Date} date Date
 * @param {string} locale Locale
 * @param {string} timeZone Time zone
 * @returns {string} Formatted date
 */
export const formatDate = (
  date: Date | null | undefined,
  locale: string,
  timeZone: string = TIME_ZONES.BUENOS_AIRES
): string => {
  return date ? dateToUTC(date).toLocaleDateString(locale, { timeZone }) : ''; // Retorna un string vacío si `date` es undefined o null
};

/**
 * Given a date, returns a date formatted as 'DD/MM/YYYY'.
 * @function
 * @example
 * // returns '25/12/1995'
 * formatDateES(new Date('Mon, 25 Dec 1995 13:30:00 GMT'));
 * @param {Date} date Date
 * @returns {string} Formatted date
 */
export const formatDateES = (date: Date) => formatDate(date, LOCALES.ES_AR, TIME_ZONES.BUENOS_AIRES);

// Setters

/**
 * Adds a number of years to a date.
 * @function
 * @param {Date} date Date
 * @param {number} years Number of years
 * @returns {Date} Date with added years
 */
export const addYears = (date: Date, years: number) => {
  const validDate = new Date(date);
  validDate.setFullYear(validDate.getFullYear() + years);
  return validDate;
};

/**
 * Adds a number of days to a date.
 * @function
 * @param {Date} date Date
 * @param {number} days Number of days
 * @returns {Date} Date with added days
 */
export const addDays = (date: ValidTypesToDateFormat, days: number): Date => {
  const validDate = new Date(date);
  validDate.setDate(validDate.getDate() + days);
  return validDate;
};

/**
 * Adds a number of hours to a date.
 * @function
 * @param {Date} date Date
 * @param {number} hours Number of hours
 * @returns {Date} Date with added hours
 */
export const addHours = (date: ValidTypesToDateFormat, hours: number): Date => {
  const validDate = new Date(date);
  validDate.setHours(validDate.getHours() + hours);
  return validDate;
};

/**
 * Adds a number of minutes to a date.
 * @function
 * @param {Date} date Date
 * @param {number} minutes Number of minutes
 * @returns {Date} Date with added minutes
 */
export const addMinutes = (date: ValidTypesToDateFormat, minutes: number): Date => {
  const validDate = new Date(date);
  validDate.setMinutes(validDate.getMinutes() + minutes);
  return validDate;
};

// Mappers
/**
 * Given an array of dates, returns an array with the years of the dates.
 * @function
 * @example
 * // returns [2000, 2005, 2008]
 * mapDatesToYears([new Date(2000, 4, 30), new Date(2005, 11, 3), new Date(2008, 7, 12)]);
 * @param {Array} dates Dates
 * @returns {Array} Years
 */
export const mapDatesToYears = (dates: Array<ValidTypesToDateFormat>): Array<number> =>
  dates && dates.map(date => new Date(date).getFullYear());

// Validations
/**
 * Given two date times, returns a boolean that indicates if the first one is before than the second one.
 * @function
 * @example
 * const today = new Date();
 * const tomorrow = addDays(today, 1);
 * // returns true
 * isDateTimeBefore(today, tomorrow);
 * @param {Date} startDateTime Date time
 * @param {Date} endDateTime Another Date time
 * @returns {boolean} If the first date time is before than the second one
 */
export const isDateTimeBefore = (
  startDateTime: ValidTypesToDateFormat,
  endDateTime: ValidTypesToDateFormat
): boolean => new Date(startDateTime).getTime() < new Date(endDateTime).getTime();

/**
 * Given two dates, returns a boolean that indicates if the first one is before than the second one.
 * @function
 * @example
 * const today = new Date();
 * const tomorrow = addDays(today, 1);
 * // returns true
 * isBefore(today, tomorrow);
 * @param {Date} date Date
 * @param {Date} compareDate Another Date
 * @returns {boolean} If the first date is before than the second one
 */
export const isBefore = (date: ValidTypesToDateFormat, compareDate: ValidTypesToDateFormat): boolean =>
  new Date(date) < new Date(compareDate);

/**
 * Given two dates, returns a boolean that indicates if the first one is after than the second one.
 * @function
 * @example
 * const today = new Date();
 * const tomorrow = addDays(today, 1);
 * // returns false
 * isAfter(today, tomorrow);
 * @param {Date} date Date
 * @param {Date} compareDate Another Date
 * @returns {boolean} If the first date is after than the second one
 */
export const isAfter = (date: ValidTypesToDateFormat, compareDate: ValidTypesToDateFormat): boolean =>
  new Date(date) > new Date(compareDate);

/**
 * Given a date, returns a boolean that indicates if is before current date.
 * @function
 * @example
 * const tomorrow = addDays(new Date(), 1);
 * // returns true
 * isBeforeNow(tomorrow);
 * @param {Date} date Date
 * @returns {boolean} If the date is before the current date
 */
export const isBeforeNow = (date: ValidTypesToDateFormat): boolean => isBefore(date, currentDate());

/**
 * Given a date, returns a boolean that indicates if is after current date.
 * @function
 * @example
 * const tomorrow = addDays(new Date(), 1);
 * // returns false
 * isAfterNow(tomorrow);
 * @param {Date} date Date
 * @returns {boolean} If the date is after the current date
 */
export const isAfterNow = (date: ValidTypesToDateFormat): boolean => isAfter(date, currentDate());

/**
 * Given a date, returns a boolean that indicates if is from the current year.
 * @function
 * @example
 * // returns true
 * isFromCurrentYear(new Date());
 * @param {Date} date Date
 * @returns {boolean} If the date is from current year
 */
export const isFromCurrentYear = (date: ValidTypesToDateFormat): boolean =>
  new Date(date).getFullYear() === currentYear;

/**
 * Given a date and a day, returns a boolean that indicates if the date's day is the same as the day passed by param.
 * @function
 * @example
 * const oneWeekLater = addDays(today, 7);
 * // returns true
 * const today = new Date();
 * isSameWeekDay(today, oneWeekLater.getDay());
 * @param {Date} date Date
 * @param {number} day Day
 * @returns {boolean} If the date's day is the same as the day passed by param
 */
export const isSameWeekDay = (date: ValidTypesToDateFormat, day: number): boolean =>
  new Date(date).getDay() === day;

/**
 * Given a date and an array of valid days, validates if the date's day is included in the valid days.
 * @function
 * @param {Date} date Date
 * @param {Array} validDays Array of valid days
 * @returns {boolean} If Date's day is valid
 */
export const isAValidDay = (date: ValidTypesToDateFormat, validDays: Array<number>): boolean =>
  validDays.includes(new Date(date).getDay());

/**
 * Given a date, returns a boolean that indicates if the date's day is a weekend day.
 * @function
 * @param {Date} date Date
 * @returns {boolean} If is weekend day
 */
export const isWeekendDay = (date: ValidTypesToDateFormat): boolean => isAValidDay(date, WEEKEND_DAYS);

/**
 * Given a date, returns a boolean that indicates if the date's day is a working day.
 * @function
 * @param {Date} date Date
 * @returns {boolean} If is working day
 */
export const isWorkingDay = (date: ValidTypesToDateFormat): boolean => !isWeekendDay(date);

/**
 * Given two dates, returns a boolean that indicates if they are the same date.
 * @function
 * @param {Date} date Date
 * @param {Date} compareDate Another date
 * @returns {boolean} If is same date
 */
export const isSameDate = (date: Date, compareDate: Date): boolean =>
  date.getDate() === compareDate.getDate() &&
  date.getMonth() === compareDate.getMonth() &&
  date.getFullYear() === compareDate.getFullYear();

/**
 * Given a date and a a 'numberOfDays', returns a boolean that indicates if have passed
 * more than n days from the current date.
 * @function
 * @param {Date} date Date
 * @param {number} numberOfDays Number of days
 * @returns {boolean} If passed more than n days
 */
export const passedMoreThanNdays = (date: ValidTypesToDateFormat, numberOfDays: number): boolean =>
  isBefore(addDays(date, numberOfDays), currentDate());

/**
 * Given a date, an initial date and a end date, returns a boolean that indicates if the first date
 * is out of the range generated by the other two dates.
 * @function
 * @param {Date} date Date
 * @param {Date} initialDate Initial date
 * @param {Date} endDate End date
 * @returns {boolean} If is out of range
 */
export const isOutOfRange = (
  date: ValidTypesToDateFormat,
  initialDate: ValidTypesToDateFormat,
  endDate: ValidTypesToDateFormat
): boolean => isBefore(date, initialDate) || isAfter(date, endDate);

// Ranges
/**
 * Given two dates, returns an array with the dates in range between them.
 * @function
 * @param {Date} startDate Start date
 * @param {Date} endDate End date
 * @returns {Array} Array of dates in range
 */
export const getDatesRange = (
  startDate: ValidTypesToDateFormat,
  endDate: ValidTypesToDateFormat
): Array<Date> => {
  const dateArray = [];
  let date = new Date(startDate);
  while (date <= new Date(endDate)) {
    dateArray.push(date);
    date = addDays(date, 1);
  }
  return dateArray;
};

/**
 * Given two dates and a function, returns an array with the dates in range between them that fulfill the condition.
 * @function
 * @param {Date} startDate Start date
 * @param {Date} endDate End date
 * @param {function} filter Filter condition
 * @returns {Array} Dates
 */
export const getFilteredDatesRange = (
  startDate: ValidTypesToDateFormat,
  endDate: ValidTypesToDateFormat,
  filter: (date: Date) => boolean
): Array<Date> => getDatesRange(startDate, endDate).filter(day => filter(day));

/**
 * Given two dates, returns an array with the dates in range between them that are working dates.
 * @function
 * @param {Date} startDate Start date
 * @param {Date} endDate End date
 * @returns {Array} Dates
 */
export const getWorkingDatesRange = (
  startDate: ValidTypesToDateFormat,
  endDate: ValidTypesToDateFormat
): Array<Date> => getFilteredDatesRange(startDate, endDate, isWorkingDay);

/**
 * Given two dates strings, returns the time range between them (in hours).
 * @function
 * @example
 * // returns '13:30 - 15:30'
 * getTimeRange('Mon, 25 Dec 1995 13:30:00 GMT', 'Mon, 25 Dec 1995 15:30:00 GMT');
 * @param {Date} startDate Start date
 * @param {Date} endDate End date
 * @returns {string} Range
 */
export const getTimeRange = (startDate: ValidTypesToDateFormat, endDate: ValidTypesToDateFormat): string => {
  const startHour = dateToTime(new Date(startDate));
  const endHour = dateToTime(new Date(endDate));
  return `${startHour} - ${endHour}`;
};

/**
 * Given two dates, returns the number of days between (including them).
 * @function
 * @param {Date} startDate Start date
 * @param {Date} endDate End date
 * @returns {number} Number of days
 */
export const getNumberOfDaysBetween = (
  startDate: ValidTypesToDateFormat,
  endDate: ValidTypesToDateFormat
): number => getDatesRange(startDate, endDate).length;

/**
 * Given a date, returns a boolean that indicates if it's a valid date.
 * @function
 * @param {Date} date Date
 * @returns {boolean} If is valid date
 */
export const isValidDate = (date: Date): boolean => date && date instanceof Date;
