import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { ThemeType } from 'primeng/config';
import { ThemePreset } from 'app/data/model/theme.model';

const customPreset: ThemePreset = {
  semantic: {
    primary: {
      50: '{emerald.50}',
      100: '{emerald.100}',
      200: '{emerald.200}',
      300: '{emerald.300}',
      400: '{emerald.400}',
      500: '{emerald.400}',
      600: '{emerald.600}',
      700: '{emerald.700}',
      800: '{emerald.800}',
      900: '{emerald.900}',
      950: '{emerald.950}',
    }
  }
};

export const customTheme: ThemeType = {
  preset: definePreset(Aura, customPreset),
  options: {
    darkModeSelector: false,
  },
};
