import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  scan,
  startWith,
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { appEmail } from '../../../core/constants/app-brand';
import { AuthService } from '../../../core/services/auth.service';

interface UserRow {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-rxjs-demo',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, AsyncPipe],
  templateUrl: './rxjs-demo.component.html',
  styleUrl: './rxjs-demo.component.scss',
})
export class RxjsDemoComponent implements OnDestroy {
  private readonly auth = inject(AuthService);
  private sub?: Subscription;

  /** Demo BehaviorSubject — interview classic */
  private readonly searchSubject = new BehaviorSubject<string>('');
  readonly search$ = this.searchSubject.asObservable();

  readonly searchControl = new FormControl('', { nonNullable: true });

  /** Derived stream with map + combineLatest */
  readonly filteredUsers$: Observable<UserRow[]> = combineLatest([
    this.auth.currentUser$,
    this.search$.pipe(debounceTime(200), distinctUntilChanged()),
  ]).pipe(
    map(([user, term]) => {
      const rows: UserRow[] = user
        ? [{ name: user.name, email: user.email, role: user.role }]
        : [
            { name: 'Admin User', email: appEmail('admin'), role: 'admin' },
            { name: 'John Driver', email: appEmail('user'), role: 'user' },
            { name: 'Mike Mechanic', email: appEmail('mechanic'), role: 'mechanic' },
          ];
      if (!term) return rows;
      const q = term.toLowerCase();
      return rows.filter(
        (r) => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q)
      );
    })
  );

  /** Plain Subject — no initial value; scan accumulates emissions */
  private readonly clickSubject = new Subject<void>();
  readonly clickCount$ = this.clickSubject.pipe(scan((acc) => acc + 1, 0), startWith(0));

  constructor() {
    this.sub = this.searchControl.valueChanges
      .pipe(startWith(''), debounceTime(300))
      .subscribe((v) => this.searchSubject.next(v));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  emitClick(): void {
    this.clickSubject.next();
  }
}
