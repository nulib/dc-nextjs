import {
  HONEYBADGER_API_KEY,
  HONEYBADGER_ENV,
  HONEYBADGER_REVISION,
} from "./config.vars.js";
import Honeybadger from "@honeybadger-io/js";

const setupHoneyBadger = () => {
  // https://docs.honeybadger.io/lib/javascript/reference/configuration.html
  const sharedHoneybadgerConfig = {
    apiKey: HONEYBADGER_API_KEY,
    environment: HONEYBADGER_ENV || process.env.NODE_ENV,
    projectRoot: "webpack://_N_E/./",

    // Uncomment to report errors in development:
    //reportData: true,

    revision: HONEYBADGER_REVISION,
  };

  if (typeof window === "undefined") {
    // Node config
    const projectRoot = process.cwd();
    Honeybadger.configure({
      ...sharedHoneybadgerConfig,
      projectRoot: "webpack:///./",
    }).beforeNotify((notice) => {
      notice.backtrace = notice.backtrace.map((line) => {
        if (line.file) {
          line.file = line.file.replace(
            `${projectRoot}/.next/server`,
            `${process.env.NEXT_PUBLIC_DC_URL}/_next/..`,
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
    }).beforeNotify((notice) => {
      notice.backtrace = notice.backtrace.map((line) => {
        if (line.file) {
          line.file = line.file.replace(
            /^.+\/_next\//,
            `${process.env.NEXT_PUBLIC_DC_URL}/_next/`,
          );
        }
        return line;
      });
    });
  }

  // This is handy for testing; remove it in production.
  if (typeof window !== "undefined") {
    window.Honeybadger = Honeybadger;
  }
};

export default setupHoneyBadger;
