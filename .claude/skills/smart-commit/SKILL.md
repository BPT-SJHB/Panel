---
name: smart-commit
description: Analyzes git diffs, groups changes logically by atomic concern, and outputs a chained commit command matching repo style with descriptive why-bodies.
---

# Smart Commit

Analyzes git diffs at the hunk/line level, groups related changes into atomic commits, ignores local configs/secrets when not requested, and generates commit messages with clear "why" context bodies.

## Workflow

1. **Inspect granular changes:**
   - Run `git status -s` and `git diff` (including unstaged files).
   - Inspect individual diff hunks and line changes across all modified files.

2. **Handle local configs / endpoints:**
   - Unless user explicitly requests to include environment/endpoint updates:
     - In environment files (`environment*.ts`): if diff only touches `disableApi`, `production`, or `apiBaseUrl` / `apiPort` / `apiUrl`, ignore file from commits.
     - In API constants / service files: if diff only touches `ticketPort`, `ticketUrl`, or local proxy endpoints, ignore file from commits.

3. **Group changes by atomic concern:**
   - Group related line changes together across files into atomic commits.
   - Do NOT bundle unrelated changes together.
   - Separate concerns cleanly (e.g. `feat(auth)`, `fix(ui)`, `test(store)`, `chore(config)`, `refactor(components)`).

4. **Format commit messages:**
   - **Header:** `<type>(<scope>): <short imperative summary>`
   - **Body:** Explain **why** the change happened (context, motivation, root cause, impact).
   - Match conventional commits and repo commit conventions.
   - Format using `-m "<header>" -m "<body>"`.
   - No `Co-Authored-By` trailers or filler text.

5. **Output command:**
   - Output ONLY a single copy-pasteable bash command:
     `git add <files1> && git commit -m "<header1>" -m "<body1>" && git add <files2> && git commit -m "<header2>" -m "<body2>"`
