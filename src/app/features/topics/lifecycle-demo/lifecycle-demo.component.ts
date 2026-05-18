import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LifecycleLoggerComponent } from '../shared/lifecycle-logger/lifecycle-logger.component';

@Component({
  selector: 'app-lifecycle-demo',
  standalone: true,
  imports: [RouterLink, LifecycleLoggerComponent],
  templateUrl: './lifecycle-demo.component.html',
  styleUrl: './lifecycle-demo.component.scss',
})
export class LifecycleDemoComponent implements OnInit, OnDestroy {
  readonly counter = signal(0);
  readonly showChild = signal(true);
  readonly childMessage = signal('Hello from parent');

  readonly logs = signal<string[]>([]);

  ngOnInit(): void {
    this.pushLog('LifecycleDemoComponent — ngOnInit');
  }

  ngOnDestroy(): void {
    this.pushLog('LifecycleDemoComponent — ngOnDestroy');
  }

  increment(): void {
    this.counter.update((n) => n + 1);
  }

  toggleChild(): void {
    this.showChild.update((v) => !v);
  }

  updateMessage(): void {
    this.childMessage.set(`Updated at ${new Date().toLocaleTimeString()}`);
  }

  onChildLog(msg: string): void {
    this.pushLog(`Child event: ${msg}`);
  }

  private pushLog(msg: string): void {
    this.logs.update((list) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...list].slice(0, 20));
  }
}
