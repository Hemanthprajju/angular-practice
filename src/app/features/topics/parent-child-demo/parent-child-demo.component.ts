import { Component, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CounterChildComponent } from '../shared/counter-child/counter-child.component';

@Component({
  selector: 'app-parent-child-demo',
  standalone: true,
  imports: [RouterLink, CounterChildComponent],
  templateUrl: './parent-child-demo.component.html',
  styleUrl: './parent-child-demo.component.scss',
})
export class ParentChildDemoComponent {
  readonly parentValue = signal(10);
  readonly lastEvent = signal<string>('—');

  /** ViewChild signal API (Angular 17+) */
  readonly childRef = viewChild(CounterChildComponent);

  onChildChanged(value: number): void {
    this.lastEvent.set(`Child emitted: ${value}`);
  }

  increaseParentValue(): void {
    this.parentValue.update((v) => v + 5);
  }

  resetViaViewChild(): void {
    this.childRef()?.reset();
  }
}
