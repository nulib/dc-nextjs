import { version } from "@/package.json";

const REPO = "https://github.com/nulib/dc-nextjs";

type DeployEnv = "production" | "staging" | "development";

export interface BuildInfo {
  version: string;
  env: DeployEnv;
  releaseUrl: string | null;
  commitUrl: string | null;
  shortSha: string | null;
  label: string | null;
}

export function getBuildInfo(): BuildInfo {
  const rawEnv = process.env.HONEYBADGER_ENV;
  const revision = process.env.HONEYBADGER_REVISION;

  const env: DeployEnv =
    rawEnv === "production"
      ? "production"
      : rawEnv === "staging"
        ? "staging"
        : "development";

  const shortSha = revision ? revision.slice(0, 7) : null;

  return {
    version,
    env,
    releaseUrl:
      env === "production" ? `${REPO}/releases/tag/v${version}` : null,
    commitUrl:
      env === "staging" && revision ? `${REPO}/commit/${revision}` : null,
    shortSha: env !== "production" ? shortSha : null,
    label: env === "production" ? null : env === "staging" ? "staging" : "DEV",
  };
}
