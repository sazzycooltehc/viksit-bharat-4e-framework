import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Engine } from '../../models/engine.model';

@Component({
  selector: 'app-engine-card',
  imports: [CommonModule],
  template: `
    @if(engine()) {
      <div class="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1" [ngClass]="themeClasses().border">
          <div class="flex justify-between items-start mb-3">
              <span class="text-sm font-bold uppercase" [ngClass]="themeClasses().text">{{ engine()?.title }}</span>
              <span class="text-xs font-semibold px-2 py-1 rounded" [ngClass]="themeClasses().badge">{{ engine()?.sdg }}</span>
          </div>
          <p class="text-xs italic text-slate-500 dark:text-slate-400 mb-3">{{ engine()?.quote }}</p>
          <ul class="text-sm text-slate-700 dark:text-slate-300 space-y-2">
              @for(point of engine()?.points; track point) {
                <li><i class="fas fa-check mr-2" [ngClass]="themeClasses().check"></i>{{ point }}</li>
              }
          </ul>
          <div class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-right">
              <button (click)="generateIdea.emit(engine())" 
                      class="text-xs font-bold py-2 px-4 rounded-full transition-all duration-300 flex items-center gap-2"
                      [ngClass]="themeClasses().button + ' hover:shadow-lg hover:brightness-110'">
                  <i class="fas fa-lightbulb"></i>
                  Generate Policy Idea
              </button>
          </div>
      </div>
    }
  `,
  styles: `
    .engine-blue { border-top: 6px solid #589CF4; }
    .engine-saffron { border-top: 6px solid #FF9933; }
    .engine-charcoal { border-top: 6px solid #36454F; }
    .engine-green { border-top: 6px solid #228B22; }
    .dark .engine-charcoal { border-top-color: #818d95; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EngineCardComponent {
  engine = input.required<Engine>();
  generateIdea = output<Engine>();
  
  themeClassesMap = {
    blue: {
      border: 'engine-blue', 
      text: 'text-blue-600 dark:text-blue-400', 
      badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300', 
      check: 'text-blue-400', 
      button: 'bg-blue-600 text-white'
    },
    saffron: {
      border: 'engine-saffron', 
      text: 'text-orange-600 dark:text-orange-400', 
      badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300', 
      check: 'text-orange-400', 
      button: 'bg-orange-500 text-white'
    },
    charcoal: {
      border: 'engine-charcoal', 
      text: 'text-slate-700 dark:text-slate-300', 
      badge: 'bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-200', 
      check: 'text-slate-400 dark:text-slate-500', 
      button: 'bg-slate-700 text-white dark:bg-slate-600'
    },
    green: {
      border: 'engine-green', 
      text: 'text-green-700 dark:text-green-400', 
      badge: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300', 
      check: 'text-green-400', 
      button: 'bg-green-600 text-white'
    }
  };

  themeClasses() {
    return this.themeClassesMap[this.engine()?.theme || 'charcoal'];
  }
}
