import Honeybadger from "@honeybadger-io/js";

const setupHoneyBadger = () => {
  // https://docs.honeybadger.io/lib/javascript/reference/configuration.html
  const sharedHoneybadgerConfig = {
    apiKey: process.env.HONEYBADGER_API_KEY,
    environment: process.env.HONEYBADGER_ENV || process.env.NODE_ENV,
    projectRoot: "webpack://_N_E/./",

    // Uncomment to report errors in development:
    reportData: true,

    revision: process.env.AWS_COMMIT_ID,
  };

  if (typeof window === "undefined") {
    // Node config
    const projectRoot = process.cwd();
    Honeybadger.configure({
      ...sharedHoneybadgerConfig,
      projectRoot: "webpack:///./",
    }).beforeNotify((notice) => {
      notice.backtrace.forEach((line) => {
        if (line.file) {
          line.file = line.file.replace(
            `${projectRoot}/.next/server`,
            `${process.env.HONEYBADGER_ASSETS_URL}/..`
          );
        }
        return line;
      });
    });
  } else {
    // Browser config
    Honeybadger.configure({
      ...sharedHoneybadgerConfig,
      projectRoot: "webpack://_N_E/./",
    });
  }

  // This is handy for testing; remove it in production.
  if (typeof window !== "undefined") {
    window.Honeybadger = Honeybadger;
  }
};

export default setupHoneyBadger;
