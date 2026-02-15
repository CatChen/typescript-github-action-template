# Claude Code Instructions

Follow `AGENTS.md` as the source of truth for repository-wide agent workflow requirements.

## Commands to always run

1. After project setup:

   ```bash
   yarn
   ```

2. After making code changes:

   ```bash
   yarn codegen && yarn lint --fix && yarn build && yarn bundle
   ```

Do not finish a task until the post-change command completes successfully.
