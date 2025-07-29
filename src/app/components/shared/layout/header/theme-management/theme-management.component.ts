import { Component, signal } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-theme-management',
  standalone: true,
  imports: [Button],
  templateUrl: './theme-management.component.html',
  styleUrl: './theme-management.component.scss',
})
export class ThemeManagementComponent {
  readonly icon = signal(''); // 'pi-sun' or 'pi-moon'

  constructor() {
    this.setInitialTheme();
  }

  private setInitialTheme(): void {
    const html = document.querySelector('html');
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    const isDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
    html?.classList.toggle('dark', isDark);
    this.icon.set(isDark ? 'pi-sun' : 'pi-moon');
  }

  toggleTheme(): void {
    const html = document.querySelector('html');
    const isDark = html?.classList.toggle('dark');

    if (isDark) {
      this.icon.set('pi-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      this.icon.set('pi-moon');
      localStorage.setItem('theme', 'light');
    }
  }
}
