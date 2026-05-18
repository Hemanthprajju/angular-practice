import { Component, computed, effect, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signals-demo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './signals-demo.component.html',
  styleUrl: './signals-demo.component.scss',
})
export class SignalsDemoComponent {
  readonly quantity = signal(1);
  readonly unitPrice = signal(49.99);
  readonly taxRate = signal(0.08);

  readonly subtotal = computed(() => this.quantity() * this.unitPrice());
  readonly tax = computed(() => this.subtotal() * this.taxRate());
  readonly total = computed(() => this.subtotal() + this.tax());

  readonly effectLog = signal<string[]>([]);

  constructor() {
    effect(() => {
      const msg = `Total updated: $${this.total().toFixed(2)} (qty=${this.quantity()})`;
      this.effectLog.update((logs) => [msg, ...logs].slice(0, 8));
    });
  }

  setQuantity(delta: number): void {
    this.quantity.update((q) => Math.max(1, q + delta));
  }
}
