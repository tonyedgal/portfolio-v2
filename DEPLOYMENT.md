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
- `CLOUDFLARE_API_TOKEN`: an account API token created from Cloudflare's **Edit
  Cloudflare Workers** template and restricted to that account and the
  `spaceman.sh` domain.

Under **Settings → Actions → General**, allow GitHub Actions to create pull
requests. Create a GitHub environment named `production`; optionally add a
required reviewer so merging a release pull request still pauses before the
live deployment.

The `tony-portfolio` Worker and its `tony.spaceman.sh` Custom Domain already
exist. Keep **Preview URLs** enabled for this Worker in Cloudflare so pull
requests can receive aliased `workers.dev` URLs.

The current API token expires after 90 days. Before it expires, create a
replacement token with the same scope and update the GitHub secret:

```bash
gh secret set CLOUDFLARE_API_TOKEN --repo tonyedgal/portfolio-v2
```

After replacing an expired or revoked token, rerun the failed GitHub Actions
job. An authentication failure occurs before Wrangler uploads the Worker;
a missing preview URL after a successful upload means Preview URLs are disabled
for the Worker.

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

## PostHog configuration

The GitHub Actions repository variables use PostHog project `321708`
(`Default project`), shared with `spaceman.sh`:

- `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`: the shared PostHog project's public token.
- `NEXT_PUBLIC_POSTHOG_HOST`: that project's ingestion host.

Add the same values to the ignored `.env.production.local` for local production
builds. The release workflow injects them at build time. Preview builds omit
these values, and the browser also requires the exact production hostname.

After deployment, visit `https://tony.spaceman.sh` and navigate between pages.
Verify pageviews in PostHog Activity with `$host` set to `tony.spaceman.sh`,
then check Web Analytics with the same domain filter. A local build does not
confirm production ingestion.

The sitemap is available at `https://tony.spaceman.sh/sitemap.xml`. Submit it
in the verified Google Search Console property after deployment. Search Console
verification and Google indexing are separate from the code setup.
