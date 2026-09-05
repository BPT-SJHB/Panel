---
name: agents-flow
description: Runs sequential multi-agent review pipeline: ui-reviewer, security-reviewer, refactorer, and verifier.
---

# Sequential Agents Review Pipeline

Execute the following agents in exact sequence:

1. **`ui-reviewer`**: Audit UI components, PrimeNG controls, Tailwind classes, RTL/Jalali layouts, form bindings, and accessibility.
2. **`security-reviewer`**: Audit code changes for route guards, token storage, crypto usage, XSS sanitization, and API security.
3. **`refactorer`**: Review code for RxJS leaks (`takeUntilDestroyed`), NgRx patterns, DRY components, Signals usage, and clean architecture.
4. **`verifier`**: Run Angular ESLint (`npm run lint`) and build (`npm run build`).

Summarize findings from each agent in a structured report.
