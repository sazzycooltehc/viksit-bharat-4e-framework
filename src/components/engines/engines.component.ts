import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineCardComponent } from '../engine-card/engine-card.component';
import { Engine } from '../../models/engine.model';
import { GeminiService } from '../../services/gemini.service';

@Component({
  selector: 'app-engines',
  imports: [CommonModule, EngineCardComponent],
  template: `
    <section class="p-8 grid md:grid-cols-2 gap-x-8 gap-y-12 bg-white dark:bg-slate-900 transition-colors duration-300">
        <!-- Human Capital Engine -->
        <div class="space-y-6">
            <div class="flex items-center gap-3 mb-2">
                <div class="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-300"><i class="fas fa-users-gear fa-lg"></i></div>
                <h3 class="text-2xl font-bold text-blue-900 dark:text-blue-200 uppercase tracking-wide">Human Capital Engine</h3>
            </div>
            <div class="grid grid-cols-1 gap-4">
                @for(engine of humanCapitalEngines; track engine.title) {
                  <app-engine-card [engine]="engine" (generateIdea)="onGenerateIdea($event)"></app-engine-card>
                }
            </div>
        </div>

        <!-- Prosperity Engine -->
        <div class="space-y-6">
            <div class="flex items-center gap-3 mb-2">
                <div class="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg text-orange-600 dark:text-orange-300"><i class="fas fa-hand-holding-dollar fa-lg"></i></div>
                <h3 class="text-2xl font-bold text-orange-900 dark:text-orange-200 uppercase tracking-wide">Prosperity Engine</h3>
            </div>
            <div class="grid grid-cols-1 gap-4">
                @for(engine of prosperityEngines; track engine.title) {
                  <app-engine-card [engine]="engine" (generateIdea)="onGenerateIdea($event)"></app-engine-card>
                }
            </div>
        </div>

    </section>

    @if(generationStatus() !== 'idle') {
      <div class="px-8 pb-8 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div class="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h4 class="font-bold text-slate-800 dark:text-slate-100 mb-2">AI-Powered Policy Idea for "{{ currentTopic() }}"</h4>
            @switch (generationStatus()) {
              @case ('loading') {
                <div class="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                    <i class="fas fa-spinner fa-spin"></i>
                    <span>Generating an innovative policy...</span>
                </div>
              }
              @case ('success') {
                <p class="text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 p-4 rounded-lg border border-slate-200 dark:border-slate-600">{{ generatedIdea() }}</p>
              }
              @case ('error') {
                <p class="text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/50 p-4 rounded-lg border border-red-200 dark:border-red-500/50">{{ generatedIdea() }}</p>
              }
            }
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnginesComponent {
    private geminiService = inject(GeminiService);

    generationStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
    generatedIdea = signal('');
    currentTopic = signal('');
    
    humanCapitalEngines: Engine[] = [
      {
        title: '1. Educate (Shiksha Sena)',
        sdg: 'SDG 4',
        quote: 'ஓதுவது ஒழியேல் (Never give up learning)',
        points: ['100-Hour Targeted Deployment Framework', 'AI Skill Scans for 50M Cognitive Creators'],
        theme: 'blue'
      },
      {
        title: '2. Employ (Udyog Sena)',
        sdg: 'SDG 8',
        quote: 'தூக்கி வினை செய் (Deliberate before action)',
        points: ['Zero Retraining Mandate for 100M Jobs', 'State Special Forces (e.g., TN EV Hub)'],
        theme: 'charcoal'
      }
    ];

    prosperityEngines: Engine[] = [
      {
        title: '3. Empower (Universal Inclusion)',
        sdg: 'SDG 5 & 10',
        quote: 'பருவத்தே பயிர் செய் (Cultivate at right time)',
        points: ['Wealth Ownership for Marginalized & Women', 'Skill Bonds & Skill-Linked Pensions'],
        theme: 'saffron'
      },
      {
        title: '4. Environment (Haryit Chakra)',
        sdg: 'SDG 12 & 15',
        quote: 'ஒப்புரவு ஒழுகு (Beneficial conduct)',
        points: ['50M Green Jobs via Waste-to-Wealth', 'Banao-Becho-Dubara Banao Model'],
        theme: 'green'
      }
    ];

    onGenerateIdea(engine: Engine) {
      this.currentTopic.set(engine.title.split('(')[0].trim());
      this.generationStatus.set('loading');
      this.generatedIdea.set('');
      
      const details = engine.points.join(', ');
      this.geminiService.generatePolicyIdea(this.currentTopic(), details)
        .then(idea => {
          this.generatedIdea.set(idea);
          this.generationStatus.set('success');
        })
        .catch(error => {
          console.error(error);
          this.generatedIdea.set('Failed to generate an idea. Please check the console for errors.');
          this.generationStatus.set('error');
        });
    }
}