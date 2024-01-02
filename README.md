# Digital Collections v2

Digital Collections v2 (DCv2) is a UI application for discovering and interacting with Collections and Works in NUL's repository.

## Tech Stack

- [NextJS](https://nextjs.org/) React JS fullstack framework
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [Radix UI](https://www.radix-ui.com/) A library of React primitives for accessibility and modular development
- [Stitches.dev](https://stitches.dev/) CSS in JS
- [IIIF](https://iiif.io/) Research APIs and Specs our data conforms to for open access.
- [AWS Amplify](https://aws.amazon.com/amplify/) Hosting environment
- [OpenSearch](https://opensearch.org/) Search index

### Dependency Notes

The following dependencies should be "pinned" or held behind `@latest` versions

- `@elastic/elasticsearch`: To match the version of `OpenSearch` our app uses.
- `swiper`
- `@honeybadger-io/js`
- `@iiif/presentation-3`

## Development Environments

### Local

Install dependencies and run a NextJS development server:

```bash
npm install
npm run dev
```

Open [http://devbox.library.northwestern.edu:3000](http://devbox.library.northwestern.edu:3000) in your browser.

### AWS Developer Environment (Northwestern dev team only)

Open a remote SSH dev environment connection in VSCode.

`cd` into the `dc-nextjs` repository

1. Open a new terminal.

2. Make sure port 3000 is open by running `sg show`. If you don't see port 3000, run `sg open all 3000`. View more in [AWS convenience scripts](https://github.com/nulib/aws-developer-environment#convenience-scripts).

3. Temporarily change the following line in (`dc-nextjs/server.js`):

```js
// Change
const hostname = "devbox.library.northwestern.edu";
// ...to
const hostname = "localhost";
```

Install dependencies

```bash
npm install
npm run dev
```

And now open your AWS dev environment URL (Northwestern developers only).

## Deploy Environments

### Staging

Commits (via merges) into the `deploy/staging` branch will trigger a build in AWS Amplify to the **staging** environment.

https://dc.rdc-staging.library.northwestern.edu/

Commits prefaced with `preview/branch-name-here` will deploy to a preview branch. The URL will be available within AWS Amplify. This is useful for sharing the feature with staff/users as a preview before committing to staging.

### Production

Commits (via merges) into the `main` branch will trigger a build in AWS Amplify to the **production** environment.

https://dc.library.northwestern.edu/

## Data fetching / APIs

The application makes network requests against the [DC API v2](https://github.com/nulib/dc-api-v2) to access repository data. By default, all metadata is returned in the application. Authenticated content's media (image/audio/video) will be protected and obscured from public access.

Behind the scenes, DC API v2 is using OpenSearch `v 1.2` or Elasticsearch `v 7.17`. (For documentation references). Network request urls with `?as=iiif` will return data in the shape of a [IIIF](https://iiif.io/) manifest.

### Viewing the Index (OpenSearch) directly

OpenSearch's data can be accessed directly via [Kibana](https://www.elastic.co/kibana/) by executing the following commands:

```bash
export AWS_PROFILE=staging
aws-adfs login --profile $AWS_PROFILE
es-proxy
```

The API supports both POST for searching and GET for Work and Collection items.

### Environment variables

The API endpoint is an environment variable which is accessed in a local dev environment via the `miscellany` Git repo.

## Code Quality

### Prettier

There are no pre-commit hooks, however deploy CI will run a Prettier check on all files to ensure code quality. It's recommended to:

- Install the [Prettier VSCode extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- Enable the "Format on Save" setting in VSCode
- Manually validate and/or fix, by running Prettier locally using the following commands:

```bash
npm run prettier:check # Check for formatting issues
npm run prettier:fix # Fix formatting issues
```

### ESLint

The app uses ESLint with a plugin for TypeScript support. Note currently with NextJS `v14`, this command won't run due to a dependency issue with ESLint `v9` support. Hopefully resolved by NextJS soon.

```bash
npm run lint
```

### Typechecking

Run Typescript's `tsc` compiler for type-checking directly.

```bash
npm run ts-lint
```

A pre-commit hook will ensure code is linted before committed.

## Testing

### End to end tests

Test fixtures can be accessed by pointing the app to a [Test Environment API](https://github.com/nulib/dc-test-environment).

_Note: Only currently supported in local dev environments. Tests are flaky due to network requests in Github Actions CI env._

```bash
NEXT_PUBLIC_DCAPI_ENDPOINT="https://dc-test-api.rdc-staging.library.northwestern.edu/api/v2"
```

```bash
# Start local server (automatically points NEXT_PUBLIC_DCAPI_ENDPOINT to the test data API)
npm run dev:test-env

# If in AWS Dev Environment, set a BASE_URL environment variable in a .env.local file
BASE_URL="[YOUR_DEV_ID].dev.rdc.library.northwestern.edu"

# Start Playwright tests in headless mode
npm run test:playwright
```

To run more visual tests, try experimenting with:

```bash
# Run in an interactive test browser to visually see tests run
npx playwright test --ui

# Run all tests in headed mode
npx playwright test --headed
```

For more info, view the docs: [Playwright](https://playwright.dev/).

### Unit tests

Unit tests use Jest and Testing Library React. Convention is to write tests alongside their respective components:

```
# Sample directory
/components/search/Search.tsx
/components/search/Search.test.tsx
...
```

To run [Jest](https://jestjs.io/) w/ [React Testing-Library](https://testing-library.com/docs/react-testing-library/intro/) support, run:

```bash
npm run test
```

## Optimizations

`npm run analyze` will run the [Next Bundle Analyzer](https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer) to show snapshots of the app's bundled JS.

## Design

### Icons

Manually sourced from [Iconicons](https://ionic.io/ionicons) and locally created in `components/Shared/SVG/Icons.tsx`, as opposed to including the entire NPM package direct.
