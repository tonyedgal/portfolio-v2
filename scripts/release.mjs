import { spawnSync } from "node:child_process";

const publish = spawnSync("pnpm", ["exec", "changeset", "publish"], {
  encoding: "utf8",
  env: process.env,
});

process.stdout.write(publish.stdout);
process.stderr.write(publish.stderr);

if (publish.status !== 0) {
  process.exit(publish.status ?? 1);
}

if (!publish.stdout.includes("New tag:")) {
  console.log("No new release tag was created; skipping deployment.");
  process.exit(0);
}

const deploy = spawnSync("pnpm", ["run", "deploy"], {
  env: process.env,
  stdio: "inherit",
});

process.exit(deploy.status ?? 1);
