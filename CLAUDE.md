# Agent Instructions

These instructions apply to all coding agents in this repository (Cursor, Claude Code, Codex).

## Required setup command

After opening or setting up the project, run:

```bash
yarn
```

## Required validation command

After making changes, run:

```bash
yarn codegen && yarn lint --fix && yarn build && yarn bundle
```

Do not treat work as complete until the validation command succeeds. If it fails, fix the issues and run it again.

## PR debugging

**Failed tests**: When the user mentions failed tests, fetch the PR's failed checks and inspect the relevant workflow runs:

```bash
gh pr checks <PR_NUMBER> --repo <OWNER/REPO>
gh run view <RUN_ID> --log-failed
```

**Review comments**: When the user mentions comments, fetch unresolved review comments from the PR and focus on those:

```bash
gh pr view <PR_NUMBER> --repo <OWNER/REPO> --comments
gh api repos/<OWNER/REPO>/pulls/<PR_NUMBER>/comments
```

Filter for unresolved threads — these are comments without a reply that resolves them, or where `in_reply_to_id` is absent and no subsequent reply marks the thread resolved.
