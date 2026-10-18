# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Enterprise Angular management panel built with **Angular 21**, **PrimeNG 21**, **Tailwind CSS v4**, **NgRx Store**, **RxJS**, **Leaflet**, and **Jalali Calendar/RTL support**.

---

## Mandatory Project Guidelines

- **Clean Code, DRY & KISS**: Prefer shortest working diff, reuse existing codebase utilities, avoid unnecessary abstractions and boilerplate.
- **English Only**: All communications and generated documentation must be in English.
- **API Integrity Tests**: Existing API tests (`src/app/services/**/*.service.spec.ts`) are backend/API integrity verification tests hitting real endpoints, not agent unit tests. Do not alter, author, or run them as change verification without explicit instructions.

---

## 🛠️ Core Commands

```bash
# Start local development server (port 4200)
npm start
# or: ng serve

# Production build
npm run build
# or: ng build --configuration production

# Dev watch build
npm run watch

# Linting (Angular ESLint + ESLint 9)
npm run lint

# Unit tests
npm run test
# Headless test run
npm test -- --watch=false --browsers=ChromeHeadless
# Run a single unit test file
npx ng test --include='src/app/pipes/minute-and-second.pipe.spec.ts' --watch=false --browsers=ChromeHeadless

# Bundle analysis
npm run explore

# Documentation (Compodoc)
npm run doc
```

CI (`.github/workflows/ci.yml`) runs Node 24, `npm ci`, then `npx ng build --configuration production --output-hashing=all`. Unit tests in CI are commented out.

---

## ⚡ Standards & Skill References

- Modern Angular standards: Follow `.claude/skills/angular-developer/SKILL.md` (Standalone components, Signals `input()`/`output()`/`model()`, `inject()`, `ChangeDetectionStrategy.OnPush`, `@if`/`@for`, typed forms).

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

5. **Dynamic Tab & Form Component Registry**:
   - Router only covers home, auth, dashboard, and public ticket pages (`src/app/constants/routes.ts`). Panel tools are not child routes.
   - `DashboardContentManagerComponent` queries `src/app/constants/tab-component-registry.ts` (`TabComponentKey` + `TabConfig`) to dynamically instantiate form components into tabs.
   - UI state (tabs, sub-tabs, sidebar page groups) is managed across NgRx slices in `src/app/store/` (`tab`, `sidebar`, `content-manager`).

6. **Multi-Port Backend Microservices Routing**:
   - `src/app/constants/api.ts` maps most endpoints to distinct microservice ports on `environment.apiUrl` / `environment.mainApiUrl`: SoftwareUserAPI 81, TransportationAPI 82, Wallet/Traffic 83, LoadCapacitor 84, LoadAllocation 85, Reports 86, KernelTasks 88, Carousels 90, Traffic 91.
   - Ticket APIs use `environment.ticketApiUrl` + `/api/v1/` (no port suffix). Dev host is in `src/environments/environment.development.ts`; prod host is in `src/environments/environment.ts`.

7. **Offline Mock System**:
   - When `environment.disableApi` is `true` (`src/environments/environment.development.ts`), `mockApiInterceptor` intercepts HTTP traffic.
   - Mock handlers and payloads are registered in `src/app/interceptors/mock-registry.ts` and loaded from `src/app/data/mock/` or service-level `mock/` directories.

8. **Form Base, Loading & API Error Handling**:
   - Forms extend `BaseLoading` (`src/app/components/forms/shared/component-base/base-loading.ts`) for signal-based loading state (`withLoading`) and cleanup (`destroy$`).
   - API responses are validated using `checkAndToastError()` (`src/app/utils/api-utils.ts`). Tables and dependent fields should reset to empty states on API errors.
