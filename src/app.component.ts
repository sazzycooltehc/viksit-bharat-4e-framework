import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { NationalGapComponent } from './components/national-gap/national-gap.component';
import { EnginesComponent } from './components/engines/engines.component';
import { RoadmapComponent } from './components/roadmap/roadmap.component';
import { FooterComponent } from './components/footer/footer.component';
import { AnimateInViewDirective } from './directives/animate-in-view.directive';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    NationalGapComponent,
    EnginesComponent,
    RoadmapComponent,
    FooterComponent,
    AnimateInViewDirective
  ]
})
export class AppComponent {
  // Inject to initialize the service and apply the theme
  private themeService = inject(ThemeService);
}