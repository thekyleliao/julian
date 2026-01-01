/**
 * Calculate Julian Date (JD) from a Date object
 * Uses the formula: JD = (Date.now() / 86400000) + 2440587.5
 * 
 * @param date - JavaScript Date object (defaults to current date)
 * @returns Julian Date
 */
export function calculateJulianDate(date: Date = new Date()): number {
  return (date.getTime() / 86400000) + 2440587.5;
}

/**
 * Calculate Modified Julian Date (MJD) from a Date object
 * MJD = JD - 2400000.5
 * 
 * @param date - JavaScript Date object (defaults to current date)
 * @returns Modified Julian Date
 */
export function calculateModifiedJulianDate(date: Date = new Date()): number {
  return calculateJulianDate(date) - 2400000.5;
}

