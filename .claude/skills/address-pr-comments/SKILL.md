---
name: address-pr-comments
description: Address unresolved review comments on the current PR. Fetches review feedback from others, then either implements the requested changes or responds to explain why a comment is being rejected.
disable-model-invocation: true
allowed-tools: Bash(gh *), Read, Grep, Glob, Edit, Write
---

Address unresolved PR review comments on the current branch.

## Steps

1. **Identify the current PR** by running `gh pr view --json number,url --jq '.number'`.

2. **Fetch all review comments**, filtering out resolved ones:

   ```
   gh api repos/{owner}/{repo}/pulls/{number}/comments --paginate --jq '.[] | select(.subject_type != "file" or true) | {id, path, line: (.line // .original_line), side, body, user: .user.login, in_reply_to_id, subject_type, diff_hunk}'
   ```

   Also fetch review threads to determine resolution status:

   ```
   gh pr view {number} --json reviewDecision,reviews,comments
   ```

   Use the GraphQL API to get thread resolution status:

   ```
   gh api graphql -f query='{ repository(owner: "{owner}", name: "{repo}") { pullRequest(number: {number}) { reviewThreads(first: 100) { nodes { isResolved, comments(first: 100) { nodes { id, databaseId, body, author { login }, path, line } } } } } } }'
   ```

3. **Skip resolved threads** — do not act on comments in threads that are already resolved.

4. **Skip threads you already responded to** — if the last comment in a thread was authored by you (the PR author / current GitHub user), skip that thread entirely. There is nothing new to address.

5. **For each remaining unresolved comment**, decide how to handle it:
   - If the feedback is valid and actionable: implement the requested change in the codebase.
   - If the feedback is incorrect, not applicable, or you disagree: reply to the comment on GitHub explaining your reasoning using `gh api` to post a reply.
   - Always respond to every unresolved comment — either with a code change or a reply.

6. **When replying to a comment** (whether after making changes or to reject), use:

   ```
   gh api repos/{owner}/{repo}/pulls/{number}/comments/{comment_id}/replies -f body='Your response'
   ```

7. **After addressing all comments**, provide a summary of what was done: which comments were addressed with code changes and which were responded to with explanations.
