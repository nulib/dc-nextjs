# Digital Collections

Digital Collections is a UI application for discovering and interacting with Collections and Works in NUL's repository.

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

Open [http://local.dev.rdc.library.northwestern.edu:3000](http://local.dev.rdc.library.northwestern.edu:3000) in your browser.

### AWS Developer Environment (Northwestern dev team only)

Open a remote SSH dev environment connection in VSCode.

`cd` into the `dc-nextjs` repository

1. Open a new terminal.

2. Make sure port 3000 is open by running `sgport show`. If you don't see port 3000, run `sgport open all 3000`. View more in [AWS convenience scripts](https://github.com/nulib/aws-developer-environment#convenience-scripts).

3. Temporarily change the following line in (`dc-nextjs/server.js`):

```js
// Change
const hostname = "local.dev.rdc.library.northwestern.edu";
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

## WebMCP site tools

The public application registers page-aware tools through
`document.modelContext.registerTool`. These tools reuse the same React state,
navigation, authenticated API client, and reading-room authorization as the
human interface. The remote MCP server remains in `dc-api-v2` for integrations
that operate independently of an open webpage.

Available tools change with the page:

- Every page: open a works search.
- Search results: read the current query, filters, pagination, and visible results.
- All Collections: read or filter the visible collection list.
- Collection details: read the current collection or search within it.
- Authorized work details: read the current work and viewer selection, search
  its textual content, or show similar works.

WebMCP is progressive enhancement. The regular site continues to work when
`document.modelContext` is unavailable. To test, use ChatGPT's in-app browser or
Chrome 149+ with `chrome://flags/#enable-webmcp-testing` enabled, then inspect
the registered tools in Chrome DevTools under Application > WebMCP. See the
[project WebMCP guide](docs/webmcp.md) for architecture and local testing, plus
the [WebMCP specification](https://webmachinelearning.github.io/webmcp/) and
[Chrome's WebMCP documentation](https://developer.chrome.com/docs/ai/webmcp)
for the evolving platform APIs.

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

## Testing

### End to end tests

Test fixtures can be accessed by pointing the app to a [Test Environment API](https://github.com/nulib/dc-test-environment).

_Note: Only currently supported in local dev environments. Tests are flaky due to network requests in Github Actions CI env._

```bash
NEXT_PUBLIC_DCAPI_ENDPOINT="https://dc-test-api.rdc-staging.library.northwestern.edu/api/v2"
```

```bash
# Start local server (automatically points NEXT_PUBLIC_DCAPI_ENDPOINT to the test data API)
npm run dev:playwright

# If in AWS Dev Environment, set a BASE_URL environment variable in a .env.local file
BASE_URL="[YOUR_DEV_ID].dev.rdc.library.northwestern.edu"

# Start Playwright tests in headless mode
npm run test:playwright
```

To run visual tests or debug errors, try experimenting with:

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
