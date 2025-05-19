import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'app-root',
  template: `
    <button (click)="toggleTheme()" class="theme-toggle">
      {{ themeService.isDarkTheme() ? '☀️' : '🌙' }}
    </button>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .theme-toggle {
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--primary-color);
      border: none;
      padding: 8px 12px;
      border-radius: 50%;
      cursor: pointer;
      z-index: 1000;
    }
  `]
})
export class AppComponent {
  constructor(public themeService: ThemeService) { }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
