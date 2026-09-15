# Portfolio releases

The portfolio deploys to `tony.spaceman.sh` through OpenNext and Cloudflare
Workers. Pull requests targeting `main` build the Worker and upload an
aliased preview version. Changesets collects release notes and opens a release
pull request; merging that pull request creates a GitHub release and deploys the
new version to production.

## One-time repository setup

Add these GitHub Actions repository secrets under **Settings → Secrets and
variables → Actions**:

- `CLOUDFLARE_ACCOUNT_ID`: the ID of the Cloudflare account that owns the
  `spaceman.sh` zone.
- `CLOUDFLARE_API_TOKEN`: an API token created from Cloudflare's **Edit
  Cloudflare Workers** template and restricted to that account and the
  `spaceman.sh` zone.

Under **Settings → Actions → General**, allow GitHub Actions to create pull
requests. Create a GitHub environment named `production`; optionally add a
required reviewer so merging a release pull request still pauses before the
live deployment.

The first production release creates the `tony-portfolio` Worker and attaches
the `tony.spaceman.sh` Custom Domain. If pull-request previews are needed before
that first release, deploy the Worker once from a trusted local checkout with
`pnpm deploy`.

## Each release

Add a changeset in every pull request that should produce a release:

```bash
pnpm changeset
```

Choose `portfolio-v2`, select the version bump, and describe the user-visible
change. After the pull request merges into `main`, the release workflow
creates or updates `chore: release portfolio`. Review and merge that generated
pull request to publish the GitHub release and deploy the Worker.

No Cloudflare credentials need to be entered again. GitHub supplies the stored
account ID and API token to Wrangler on every preview and production run.
