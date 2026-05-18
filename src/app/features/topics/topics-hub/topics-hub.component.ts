import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface TopicLink {
  path: string;
  title: string;
  concepts: string[];
}

@Component({
  selector: 'app-topics-hub',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './topics-hub.component.html',
  styleUrl: './topics-hub.component.scss',
})
export class TopicsHubComponent {
  readonly topics: TopicLink[] = [
    {
      path: 'lifecycle',
      title: 'Component lifecycle',
      concepts: ['ngOnInit', 'ngOnChanges', 'ngOnDestroy', 'constructor'],
    },
    {
      path: 'parent-child',
      title: 'Parent & child communication',
      concepts: ['@Input()', '@Output()', 'EventEmitter', 'ViewChild'],
    },
    {
      path: 'rxjs',
      title: 'RxJS & BehaviorSubject',
      concepts: ['Observable', 'map', 'filter', 'switchMap', 'async pipe'],
    },
    {
      path: 'signals',
      title: 'Signals',
      concepts: ['signal()', 'computed()', 'effect()', 'input()'],
    },
  ];
}
