
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { ThemeType } from 'primeng/config';


// لینک زیر برای مشاهده تنظیمات و مستندات تم است:
// https://primeng.org/theming


export const customTheme: ThemeType = {

  preset: definePreset(Aura, {
    // در این قسمت می‌توانید رنگ‌ها یا تنظیمات دلخواه تم را اضافه و سفارشی کنید

  }),


  options: {
    // گزینه‌های اضافی برای تنظیمات تم
    darkModeSelector: false || 'none'
  }
};
