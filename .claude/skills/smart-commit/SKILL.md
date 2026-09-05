---
name: smart-commit
description: Analyzes git diffs, groups changes logically by feature/fix/test/doc/refactor, and outputs a single chained commit command matching repo style without co-authors.
---

Inspect current git status and diffs:
1. Run `git status -s` and `git diff` (including unstaged files).
2. Ignore local dev configs / secrets / endpoints:
   - In environment files (`environment*.ts`): if diff only touches `disableApi`, `production`, or `apiBaseUrl` / `apiPort` / `apiUrl`, ignore file from commits.
   - In API constants / service files: if diff only touches `ticketPort`, `ticketUrl`, or local proxy endpoints, ignore file from commits.
3. Group remaining files logically by concern (e.g. `feat(auth)`, `fix(ui)`, `test(store)`, `chore(config)`, `refactor(components)`).
4. Do NOT bundle unrelated changes together.
5. Match conventional commit format matching repo commit history (`<type>(<scope>): <description>`).
6. Output ONLY a single copy-pasteable bash command:
   `git add <files1> && git commit -m "<msg1>" && git add <files2> && git commit -m "<msg2>"`
7. No `Co-Authored-By` or extra trailers.
