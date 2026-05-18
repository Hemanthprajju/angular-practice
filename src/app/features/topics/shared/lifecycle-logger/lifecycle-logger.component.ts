import {
  Component,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  input,
  numberAttribute,
} from '@angular/core';

@Component({
  selector: 'app-lifecycle-logger',
  standalone: true,
  template: `
    <div class="child-box">
      <h3>Child component</h3>
      <p>Message: {{ message() }}</p>
      <p>Count: {{ count() }}</p>
    </div>
  `,
  styles: [
    `
      .child-box {
        padding: 1rem;
        background: #312e81;
        border-radius: 8px;
        margin: 1rem 0;
        h3 {
          margin: 0 0 0.5rem;
          color: #c7d2fe;
        }
        p {
          margin: 0.25rem 0;
          color: #e0e7ff;
          font-size: 0.9rem;
        }
      }
    `,
  ],
})
export class LifecycleLoggerComponent implements OnInit, OnChanges, OnDestroy {
  /** Modern signal input (Angular 17+) */
  readonly message = input.required<string>();
  readonly count = input(0, { transform: numberAttribute });

  @Output() logged = new EventEmitter<string>();

  ngOnInit(): void {
    this.logged.emit('ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const keys = Object.keys(changes).join(', ');
    this.logged.emit(`ngOnChanges: ${keys}`);
  }

  ngOnDestroy(): void {
    this.logged.emit('ngOnDestroy');
  }
}
