---
name: post-change
description: Runs verification pipeline (lint, build) and targeted reviews after changes.
---

Post-change pipeline:
1. Run verifier: `npm run lint && npm run build`.
2. Inspect changed files via `git status -s`.
3. If routes, guards, or auth changed, invoke `security-reviewer`.
4. If UI / PrimeNG / Tailwind / templates changed, invoke `ui-reviewer`.
5. If services, state, or complex components changed, invoke `refactorer`.
6. Summarize verification and review results.
