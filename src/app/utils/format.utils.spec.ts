import { normalizeArabicToPersian, formatCarPlate } from './format.utils';

describe('format.utils', () => {
  describe('normalizeArabicToPersian', () => {
    it('should convert Arabic letters to Persian', () => {
      const arabicText = 'كشور پيامبر ى ئ إ أ ٱ ؤ ة';
      const expected = 'کشور پیامبر ی ی ا ا ا و ه';
      expect(normalizeArabicToPersian(arabicText)).toBe(expected);
    });

    it('should convert Arabic digits to Persian digits', () => {
      const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
      const expected = '۰۱۲۳۴۵۶۷۸۹';
      expect(normalizeArabicToPersian(arabicDigits)).toBe(expected);
    });

    it('should return empty string or null untouched', () => {
      expect(normalizeArabicToPersian('')).toBe('');
      expect(normalizeArabicToPersian(null as unknown as string)).toBeNull();
    });

    it('should leave already-Persian and English text untouched', () => {
      const normalText = 'سلام دنیا 123 ABC';
      expect(normalizeArabicToPersian(normalText)).toBe(normalText);
    });
  });

  describe('formatCarPlate', () => {
    it('should format car plate correctly', () => {
      expect(formatCarPlate('12الف345', '67')).toBe('| 67 | 12-الف-345');
    });
  });
});
