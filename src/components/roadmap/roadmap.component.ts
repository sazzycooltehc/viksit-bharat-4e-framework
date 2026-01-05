import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoadmapItem } from '../../models/roadmap.model';

@Component({
  selector: 'app-roadmap',
  imports: [CommonModule],
  template: `
    <section class="p-8 bg-slate-900 text-white">
        <h4 class="text-center font-bold uppercase tracking-widest text-slate-400 mb-8">Strategic Command Roadmap</h4>
        
        <div class="relative flex flex-col md:flex-row justify-between items-start">
            <!-- Dotted line for desktop -->
            <div class="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-slate-700 -z-0"></div>

            @for(item of roadmapItems; track item.year; let i = $index) {
              <div class="flex-1 text-center group z-10 p-2 cursor-pointer" (click)="selectItem(item)">
                  <div class="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-3 transition-all duration-300"
                       [ngClass]="isSelected(item) ? item.color + ' scale-110 ring-4 ring-white/50' : 'bg-slate-600 group-hover:bg-slate-500 dark:bg-slate-700 dark:group-hover:bg-slate-600'">
                      <i [class]="'fas ' + item.icon"></i>
                  </div>
                  <div class="text-sm font-bold transition-colors" [class.text-orange-400]="isSelected(item)">{{ item.year }}</div>
                  <div class="text-xs text-slate-400 group-hover:text-white transition-colors">{{ item.title }}</div>
              </div>
            }
        </div>
        
        @if(selectedItem()) {
            <div class="mt-8 bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center max-w-2xl mx-auto">
                <h5 class="font-bold text-lg text-orange-400">{{ selectedItem()?.year }}: {{ selectedItem()?.title }}</h5>
                <p class="text-slate-300 mt-2 text-sm">{{ selectedItem()?.description }}</p>
            </div>
        }
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoadmapComponent {
    roadmapItems: RoadmapItem[] = [
        { year: 2026, title: '100-Day Pilot Command', icon: 'fa-bolt', color: 'bg-orange-500', description: 'Launch a rapid 100-day pilot program to validate the 4E framework in select districts, focusing on quick wins and data collection.' },
        { year: 2030, title: 'Engine Rollout & Infra Sync', icon: 'fa-gears', color: 'bg-blue-500', description: 'Full-scale rollout of the Human Capital and Prosperity engines, ensuring seamless integration with national infrastructure projects.' },
        { year: 2035, title: 'Wealth Ownership Scale', icon: 'fa-chart-line', color: 'bg-slate-500', description: 'Achieve significant scale in wealth ownership for marginalized communities through Skill Bonds and skill-linked pension schemes.' },
        { year: 2040, title: 'AI Predictive Mastery', icon: 'fa-brain', color: 'bg-teal-500', description: 'Leverage AI for predictive skill-gap analysis and economic forecasting, enabling proactive policy adjustments and resource allocation.' },
        { year: 2047, title: 'Viksit Bharat Leadership', icon: 'fa-crown', color: 'bg-green-500', description: 'India emerges as a global leader in sustainable development and human capital, achieving the vision of a developed nation by 2047.' },
    ];

    selectedItem = signal<RoadmapItem | null>(this.roadmapItems[0]);

    selectItem(item: RoadmapItem) {
        this.selectedItem.set(item);
    }

    isSelected(item: RoadmapItem): boolean {
        return this.selectedItem()?.year === item.year;
    }
}