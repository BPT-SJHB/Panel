import { MinuteAndSecondPipe } from './minute-and-second.pipe';

describe('MinuteAndSecondPipe', () => {
  let pipe: MinuteAndSecondPipe;

  beforeEach(() => {
    pipe = new MinuteAndSecondPipe();
  });

  it('should format 120 seconds as 02:00', () => {
    expect(pipe.transform(120)).toBe('02:00');
  });

  it('should format 65 seconds as 01:05', () => {
    expect(pipe.transform(65)).toBe('01:05');
  });

  it('should format 0 seconds as 00:00', () => {
    expect(pipe.transform(0)).toBe('00:00');
  });

  it('should handle null or undefined gracefully as 00:00', () => {
    expect(pipe.transform(null)).toBe('00:00');
    expect(pipe.transform(undefined)).toBe('00:00');
  });

  it('should handle negative numbers as 00:00', () => {
    expect(pipe.transform(-10)).toBe('00:00');
  });
});
