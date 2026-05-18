import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-counter-child',
  standalone: true,
  template: `
    <div class="child-box">
      <h3>Counter child</h3>
      <p class="value">{{ value }}</p>
      <div class="btn-row">
        <button type="button" (click)="decrement()">−</button>
        <button type="button" (click)="increment()">+</button>
      </div>
      <p class="note">&#64;Input initialValue: {{ initialValue }}</p>
    </div>
  `,
  styles: [
    `
      .child-box {
        padding: 1.25rem;
        background: #134e4a;
        border-radius: 12px;
        border: 1px solid #2dd4bf44;
      }
      h3 {
        margin: 0 0 0.75rem;
        color: #5eead4;
      }
      .value {
        font-size: 2.5rem;
        font-weight: 700;
        color: #f0fdfa;
        margin: 0 0 1rem;
      }
      .btn-row {
        display: flex;
        gap: 0.5rem;
        button {
          width: 48px;
          height: 48px;
          font-size: 1.25rem;
          border-radius: 8px;
          border: none;
          background: #0d9488;
          color: #fff;
          cursor: pointer;
        }
      }
      .note {
        margin: 1rem 0 0;
        font-size: 0.8rem;
        color: #99f6e4;
      }
    `,
  ],
})
export class CounterChildComponent implements OnChanges {
  @Input() initialValue = 0;
  @Output() valueChange = new EventEmitter<number>();

  value = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValue']) {
      this.value = this.initialValue;
    }
  }

  increment(): void {
    this.value++;
    this.valueChange.emit(this.value);
  }

  decrement(): void {
    this.value--;
    this.valueChange.emit(this.value);
  }

  reset(): void {
    this.value = 0;
    this.valueChange.emit(0);
  }
}
