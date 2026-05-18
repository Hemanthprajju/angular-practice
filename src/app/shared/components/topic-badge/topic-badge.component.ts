import { Component, input } from '@angular/core';

@Component({
  selector: 'app-topic-badge',
  standalone: true,
  template: `<span class="topic-badge">{{ label() }}</span>`,
  styles: [
    `
      .topic-badge {
        display: inline-block;
        font-size: 0.7rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        background: rgba(99, 102, 241, 0.2);
        color: #a5b4fc;
        margin-right: 0.35rem;
      }
    `,
  ],
})
export class TopicBadgeComponent {
  readonly label = input.required<string>();
}
