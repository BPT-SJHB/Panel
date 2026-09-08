# BPT SJHB Panel - Architecture & Guidelines

Enterprise Angular management panel built with **Angular 21**, **PrimeNG 21**, **Tailwind CSS v4**, **NgRx Store**, **RxJS**, **Leaflet**, and **Jalali Calendar/RTL support**.

---

## 🛠️ Core Commands

```bash
# Start local development server (port 4200)
npm start
# or: ng serve

# Production build
npm run build
# or: ng build --configuration production

# Linting (Angular ESLint + ESLint 9)
npm run lint

# Unit tests
npm run test

# Documentation (Compodoc)
npm run doc
```

---

## 🏛️ Architecture & Best Practices

1. **Angular & Standalone Architecture**:
   - Prefer standalone components, directives, and pipes.
   - Separate concerns cleanly: `src/app/pages/` (page views), `src/app/components/` (shared/forms/trees), `src/app/services/` (API and business logic), `src/app/store/` (NgRx state).
   - Use Angular Signals where appropriate alongside RxJS Observables.

2. **State & Reactive Streams (NgRx / RxJS)**:
   - Manage shared global UI state (sidebar, content tabs) in `src/app/store/`.
   - Prevent memory leaks: unsubscribe from RxJS subscriptions via `takeUntilDestroyed()`, `destroyRef`, or `async` pipe.
   - Keep side-effects isolated in dedicated service layers.

3. **UI & Design System (PrimeNG + Tailwind CSS)**:
   - PrimeNG styled components combined with Tailwind utility classes.
   - RTL & Persian UI: support right-to-left layout, Vazirmatn font, and Jalali date conversions (`jalali-ts`, `ng-persian-datepicker`).
   - Keep forms DRY using shared form components (`src/app/components/forms/`).

4. **Security & Data Handling**:
   - Strict route guards (`src/app/guard/login-guard`, `src/app/guard/dashboard-guard`).
   - Secure token and credential storage (`ngx-cookie-service`, `crypto-js`).
   - Sanitize dynamic HTML/URL bindings (`DomSanitizer`) to prevent XSS.
   - Centralize API error interceptors and HTTP status handling.
