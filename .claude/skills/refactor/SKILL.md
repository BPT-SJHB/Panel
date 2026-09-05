---
name: refactor
description: Invokes refactorer agent on specified paths or modified diffs.
---

1. Identify modified files or target paths provided in arguments.
2. Dispatch `refactorer` agent to evaluate RxJS cleanup, NgRx state, DRY components, Signals, and architecture.
3. Report concrete refactoring proposals with minimal diffs.
