import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-national-gap',
  template: `
    <section class="p-8 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
        <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="md:w-1/3 text-center md:text-left">
                <h2 class="text-2xl font-bold text-slate-800 dark:text-slate-100">The National Gap</h2>
                <p class="text-slate-600 dark:text-slate-400 mt-2 italic">"Infrastructure without skilled Indians is strategic waste."</p>
            </div>
            <div class="md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                <div class="bg-white dark:bg-slate-700 p-4 rounded-xl border dark:border-slate-600 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div class="text-blue-600 dark:text-blue-400 text-3xl font-bold">{{ infraReady() }}%</div>
                    <div class="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mt-1">Infra Ready</div>
                </div>
                <div class="bg-white dark:bg-slate-700 p-4 rounded-xl border text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-orange-200 dark:border-orange-500/50">
                    <div class="text-orange-600 dark:text-orange-400 text-3xl font-bold">{{ workforceReady() }}%</div>
                    <div class="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mt-1">Workforce Ready</div>
                </div>
                <div class="bg-white dark:bg-slate-700 p-4 rounded-xl border dark:border-slate-600 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div class="text-red-600 dark:text-red-400 text-3xl font-bold">{{ productivityLoss() }}%</div>
                    <div class="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mt-1">Productivity Loss</div>
                </div>
                <div class="bg-white dark:bg-slate-700 p-4 rounded-xl border dark:border-slate-600 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div class="text-slate-800 dark:text-slate-200 text-3xl font-bold">₹{{ idleRisk() }}L Cr</div>
                    <div class="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mt-1">Idle Risk</div>
                </div>
            </div>
        </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NationalGapComponent implements OnInit {
    infraReady = signal(0);
    workforceReady = signal(0);
    productivityLoss = signal(0);
    idleRisk = signal(0);

    ngOnInit() {
        this.animateValue(this.infraReady, 80, 1500);
        this.animateValue(this.workforceReady, 30, 1500);
        this.animateValue(this.productivityLoss, 25, 1500);
        this.animateValue(this.idleRisk, 40, 1500);
    }

    animateValue(sig: any, end: number, duration: number) {
        let start = 0;
        const range = end - start;
        let current = start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        
        const timer = setInterval(() => {
            current += increment;
            sig.set(current);
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }
}