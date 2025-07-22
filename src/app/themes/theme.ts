import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { ThemeType } from 'primeng/config';
import type { AuraBaseDesignTokens } from '@primeuix/themes/aura/base';


const customPreset: AuraBaseDesignTokens = {
  semantic: {
    primary: {
      50: '{emerald.50}',
      100: '{emerald.100}',
      200: '{emerald.200}',
      300: '{emerald.300}',
      400: '{emerald.400}',
      500: '{emerald.600}',
      600: '{emerald.600}',
      700: '{emerald.700}',
      800: '{emerald.800}',
      900: '{emerald.900}',
      950: '{emerald.950}',
    }
  }
};

export const customTheme: ThemeType = {
  preset: definePreset(Aura, customPreset as Record<string, unknown>),
  options: {
    darkModeSelector: false,
  },
};
