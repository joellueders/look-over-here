# Look Over Here — Codex Workflow

## Source of Truth

Codex chats are temporary workers, not durable project records.

GitHub, the local repository, the `/docs` directory, and commit history are the source of truth for project state and decisions. Codex must inspect those sources for every task and must not rely on previous chat history.

## Start Every Task With a Workspace Check

Before editing, run:

```bash
pwd
git remote -v
git status --short
```

Confirm that the working directory and remote match Look Over Here. If either does not match, stop immediately without editing.

Look Over Here and KillBox must remain separate projects. Never edit one project while working on a task for the other.

## Task Rules

- Keep each task small and self-contained.
- Make only the changes required by the task.
- Do not use screenshots or browser automation unless explicitly requested.
- Stop once the stated acceptance criteria are met.
- Do not continue into adjacent fixes, cleanup, refactors, or polish.

## Completion and Recovery

Report the implementation, validation performed, and files changed when the task is complete.

If archive or update activity hangs after implementation and tests are complete, report that completion and stop.

If a chat disappears, return to the correct local repository and run:

```bash
git status --short
```

Use the working tree and commit history to recover the actual project state instead of relying on the missing chat.
