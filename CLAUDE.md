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

**Review comments**: When the user mentions comments, use GraphQL to fetch unresolved review threads (the REST API does not expose resolution state):

```bash
gh api graphql \
  -F owner=<OWNER> -F repo=<REPO> -F number=<PR_NUMBER> \
  -f query='
    query($owner: String!, $repo: String!, $number: Int!) {
      repository(owner: $owner, name: $repo) {
        pullRequest(number: $number) {
          reviewThreads(first: 100) {
            nodes {
              isResolved
              isOutdated
              path
              line
              comments(first: 50) {
                nodes {
                  body
                  author { login }
                  createdAt
                  url
                }
              }
            }
          }
        }
      }
    }' \
  | jq '.data.repository.pullRequest.reviewThreads.nodes | map(select(.isResolved == false))'
```

Focus on threads where `isResolved` is `false`. Ignore `isOutdated` threads unless specifically relevant.
