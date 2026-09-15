# Changesets

Add a changeset to each pull request that should produce a portfolio release:

```bash
pnpm changeset
```

Choose `portfolio-v2`, select the appropriate version bump, and describe the
user-visible result. Pull requests created by the release workflow do not need
an additional changeset.
