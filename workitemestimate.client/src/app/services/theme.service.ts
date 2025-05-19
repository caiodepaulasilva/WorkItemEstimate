import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly THEME_KEY = 'planning_poker_theme';
  private darkTheme = false;

  constructor() {
    this.loadThemePreference();
  }

  isDarkTheme(): boolean {
    return this.darkTheme;
  }

  toggleTheme(): void {
    this.darkTheme = !this.darkTheme;
    this.applyTheme();
    this.saveThemePreference();
  }

  private loadThemePreference(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      this.darkTheme = JSON.parse(savedTheme);
    } else {      
      this.darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.applyTheme();
  }

  private applyTheme(): void {
    document.body.classList.toggle('dark-theme', this.darkTheme);
  }

  private saveThemePreference(): void {
    localStorage.setItem(this.THEME_KEY, JSON.stringify(this.darkTheme));
  }
}
