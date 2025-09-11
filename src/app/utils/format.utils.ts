/**
 * Combines a plate and serial into a formatted car plate string.
 *
 * @param plate - The car plate letters/numbers
 * @param serial - The car serial number
 * @returns A formatted car plate string,
 */
export function formatCarPlate(plate: string, serial: string): string {
  console.log(plate);

  // Basic validation – trim to remove extra spaces
  const cleanPlate = plate.trim();

  const cleanSerial = serial.trim();

  return `| ${cleanSerial} | ${cleanPlate.replace(/([\u0600-\u06FF])/g, '-$1-')}`;
}
