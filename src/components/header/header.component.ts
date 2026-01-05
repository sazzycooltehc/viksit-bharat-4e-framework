import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  template: `
    <header class="gradient-bg text-white p-8 md:p-12 text-center relative">
        <div class="absolute top-4 right-8 flex gap-4 items-center">
             <button (click)="themeService.toggleTheme()" 
                    class="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-white/10 hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Toggle dark mode">
                @if (themeService.theme() === 'light') {
                  <i class="fas fa-moon"></i>
                } @else {
                  <i class="fas fa-sun text-yellow-300"></i>
                }
            </button>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png" alt="India Flag" class="h-6 opacity-80">
        </div>
        <h1 class="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight uppercase">4E Framework of Building Tomorrow</h1>
        <p class="text-xl md:text-2xl font-light opacity-90 italic">Mission Bharat Panchdhaar: A Workforce Command System</p>
        <div class="mt-6 inline-block bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm border border-white/20">
            <span class="text-orange-400 font-bold">Double Engine:</span> Skilled Minds, Sustainable Wealth
        </div>
    </header>
  `,
  styles: `
    .gradient-bg {
        background: linear-gradient(135deg, #081854 0%, #1e3a8a 100%);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  themeService = inject(ThemeService);
}
