/**
 * Arabic to Persian character and digit normalization map
 */
const ARABIC_TO_PERSIAN_MAP: Record<string, string> = {
  'ك': 'ک',
  'ي': 'ی',
  'ى': 'ی',
  'ئ': 'ی',
  'إ': 'ا',
  'أ': 'ا',
  'آ': 'ا',
  'ٱ': 'ا',
  'ؤ': 'و',
  'ة': 'ه',
  '٠': '۰',
  '١': '۱',
  '٢': '۲',
  '٣': '۳',
  '٤': '۴',
  '٥': '۵',
  '٦': '۶',
  '٧': '۷',
  '٨': '۸',
  '٩': '۹',
};

const ARABIC_CHAR_REGEX = /[كيىئإأآٱؤة٠-٩]/g;
const CAR_PLATE_LETTER_REGEX = /([؀-ۿ])/g;

/**
 * Normalizes Arabic letters and digits to standard Persian.
 */
export function normalizeArabicToPersian(value: string): string {
  if (!value) return value;
  return value.replace(ARABIC_CHAR_REGEX, (ch) => ARABIC_TO_PERSIAN_MAP[ch] ?? ch);
}

/**
 * Combines a plate and serial into a formatted car plate string.
 *
 * @param plate - The car plate letters/numbers
 * @param serial - The car serial number
 * @returns A formatted car plate string,
 */
export function formatCarPlate(plate: string, serial: string): string {
  // Basic validation – trim to remove extra spaces
  const cleanPlate = plate.trim();
  const cleanSerial = serial.trim();

  return `| ${cleanSerial} | ${cleanPlate.replace(CAR_PLATE_LETTER_REGEX, '-$1-')}`;
}
