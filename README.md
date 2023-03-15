# Digital Collections v2 NextJS App

This is a work in progress, for experimenting with NextJS, AWS Amplify and various ways of building / data fetching / hosting.

## Getting Started

Install dependencies and run a NextJS development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Deploying

### NextJS Environment

Commits to the `deploy/staging` branch will trigger a build in an AWS Amplify Hosting solution.

Commits prefaced with `preview/branch-name-here` will deploy to a preview branch

### Data fetching

Currently in the Amplify AWS environment (Dec 2022), note that SSR (Server Side Rendering), will not pass authentication JWT tokens properly.

The primary dynamic route pages (`items/[id]` and `collections/[id]`), will support [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration), but we'll keep build time routes to statically generate at 1 for both a Work and Collection.

````

## Code Quality

The app uses ESLint with a plugin for TypeScript support.

```bash
npm run lint
````

Run Typescript's `tsc` compiler for type-checking directly.

```bash
npm run ts-lint
```

A pre-commit hook will ensure code is linted before committed.

## Testing

### End to end tests

#### Setup

We can run E2E tests against the test environment (...more coming soon)

E2E tests use [Cypress](https://docs.cypress.io/), and are linted with [Cypress ESLint Plugin](https://github.com/cypress-io/eslint-plugin-cypress)

To run the text suite:

```
npm run cypress:open
```

### Unit tests

Unit tests use Jest and Testing Library React. Convention is to write tests alongside their respective components:

```
// Sample directory
/components/search/Search.tsx
/components/search/Search.test.tsx
...
```

To run [Jest](https://jestjs.io/) w/ [React Testing-Library](https://testing-library.com/docs/react-testing-library/intro/) support, run:

```bash
npm run test
```

## API

### Notes

Currently DC v2 hits a new DC API v2 for it's indexed data.

`https://dcapi.rdc.library.northwestern.edu/docs/v2`

Behind the scenes, DC API v2 is using OpenSearch `v 1.2` or Elasticsearch `v 7.17`. (For documentation references).

### Endpoints

The API endpoint is an environment variable which is accessed in a local dev environment via the `miscellany` Git repo. The dev environment runs against Staging.

### Viewing OpenSearch data locally

In a local dev environment, to view API data coming from the index (for now), run the following:

```
export AWS_PROFILE=staging
aws-adfs login --profile $AWS_PROFILE
es-proxy
```

The API supports both POST for searching and GET for Work and Collection items.

### Search examples

```
# Search Works (default)
curl -X POST '[URL]/search' --data-binary '{"query": {"match_all": {}}, "_source": "id", "size": 1000}' | jq

# Search Collections
curl -X POST '[URL]/search/collections' --data-binary '{"query": {"match_all": {}}, "_source": "id", "size": 1000}' | jq
```

### Direct GET request endpoint examples

```
[URL]/works/4359936f-9091-499b-893f-b8e900db49ec

[URL]/collections/18ec4c6b-192a-4ab8-9903-ea0f393c35f7

[URL]/file-sets/ce1f6d18-8563-4f70-aabc-d4ce1688d8dc
```

See documentation in above link for more info

## Optimizations

`npm run analyze` will run the [Next Bundle Analyzer](https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer) to show snapshots of the app's bundled JS.

## Design

### Icons

Manually sourced from [Iconicons](https://ionic.io/ionicons) and locally created in `components/Shared/SVG/Icons.tsx`, as opposed to including the entire NPM package direct.
