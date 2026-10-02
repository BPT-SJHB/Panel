---
name: angular-developer
description: Best practices and modern guidelines for Angular 18+ development (Signals, Standalone, OnPush, Control Flow, inject).
---

# Angular Developer Guide

## System Instructions
You are an expert in Angular who values writing clean, maintainable, and modern code.

## Critical Angular Rules
- ALWAYS use Standalone Components (Angular 14+ default, required in modern versions)
- NEVER use NgModule unless maintaining legacy code
- ALWAYS use Signals for local component state
- ALWAYS use `inject()` for dependency injection instead of constructor injection
- NEVER use constructor parameter injection
- ALWAYS use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- ALWAYS use the new input/output signal APIs (`input()`, `output()`, `model()`) instead of `@Input()`, `@Output()`
- NEVER use `@Input()` or `@Output()` decorators
- ALWAYS use `@let` syntax for template variables (Angular 18.1+)
- ALWAYS use `ChangeDetectionStrategy.OnPush` on all components
- NEVER omit ChangeDetectionStrategy - defaults to Default which causes performance issues
- Use `computed()` for derived state and `effect()` ONLY for side effects (never for state changes)
- Handle async operations with RxJS, convert to Signals using `toSignal()` when binding to templates
- Clean up subscriptions using `takeUntilDestroyed()` or `toSignal()`
- Prefer template-driven forms with modern Signal integration, or reactive forms with Typed Forms
- Implement deferrable views (`@defer`) for heavy or below-the-fold components
- ALWAYS use TypeScript strict mode features

## Modern Angular Patterns Cheatsheet

### Component Definition
```typescript
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, OtherComponent],
  template: `
    @if (user(); as u) {
      <div class="profile">
        <h2>{{ u.name }}</h2>
        <p>{{ formattedRole() }}</p>
      </div>
    } @else {
      <app-loading-spinner />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent {
  // Dependency Injection
  private readonly userService = inject(UserService);

  // Inputs & Outputs (Signal-based)
  readonly userId = input.required<string>();
  readonly userUpdated = output<User>();

  // State (Signals)
  readonly user = toSignal(this.userService.getUser(this.userId()));

  // Derived State (Computed)
  readonly formattedRole = computed(() => {
    const role = this.user()?.role;
    return role ? role.toUpperCase() : 'GUEST';
  });
}
```

### Signal Forms / Two-Way Binding
```typescript
@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <button (click)="decrement()">-</button>
    <span>{{ value() }}</span>
    <button (click)="increment()">+</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  // Two-way bindable signal
  readonly value = model(0);

  increment() {
    this.value.update(v => v + 1);
  }

  decrement() {
    this.value.update(v => v - 1);
  }
}
```

### Deferrable Views
```html
@defer (on viewport) {
  <app-heavy-chart [data]="chartData()" />
} @placeholder {
  <div class="skeleton-chart">Loading chart...</div>
} @loading (minimum 500ms) {
  <app-spinner />
} @error {
  <p>Failed to load chart.</p>
}
```

## Quality Checklist
- [ ] Standalone component used (`standalone: true` or default in v19+)
- [ ] No `NgModule` references
- [ ] `ChangeDetectionStrategy.OnPush` explicitly set
- [ ] `inject()` used for all dependencies (no constructor DI)
- [ ] Signal inputs/outputs used (`input()`, `output()`, `model()`)
- [ ] Native control flow used (`@if`, `@for`, `@switch`)
- [ ] `@let` used for template local variables where appropriate
- [ ] Subscriptions cleaned up (`takeUntilDestroyed`, `toSignal`)
- [ ] `@defer` applied to lazy/heavy components
- [ ] Derived state uses `computed()`, not manual updates or methods in templates
- [ ] Typed forms used if using Reactive Forms
- [ ] Accessibility attributes included (ARIA, semantic HTML)
