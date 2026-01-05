import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="p-8 bg-slate-50 dark:bg-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-200 dark:border-slate-700 transition-colors duration-300">
        <div class="shloka-box p-4 rounded-r-xl md:w-1/2">
            <p class="text-lg font-bold text-orange-800 dark:text-orange-300">संगच्छध्वं संवदध्वं सं वो मनांसि जानताम्</p>
            <p class="text-xs text-slate-600 dark:text-slate-400 italic mt-1">"Walk together, speak together; let your minds be of one accord."</p>
        </div>
        <div class="text-center md:text-right md:w-1/2">
            <div class="text-slate-800 dark:text-slate-100 font-bold">Impact: ₹40L Cr Unlocked | 150M Green/Mfg Jobs</div>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">One Nation. Many Skill Superpowers. No Strategic Waste.</p>
        </div>
    </footer>
  `,
  styles: `
    .shloka-box {
        background: rgba(255, 255, 255, 0.95);
        border-left: 4px solid #FF9933;
        transition: background-color 0.3s;
    }
    .dark .shloka-box {
        background: rgba(30, 41, 59, 0.5); /* slate-800 with opacity */
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
