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

### Static build

This app could be deployed statically, but will not support [these NextJS features](https://nextjs.org/docs/advanced-features/static-html-export#unsupported-features).

To test a static deploy, run:

```bash
// Build static files to the /out directory
npm run export

// Serve locally from the /out directory
cd out
npx serve

// Open up your locally hosted url and view the static site

```

## Code Quality

The app uses ESLint with a plugin for TypeScript support.

```bash
npm run lint
```

Or run Typescript's `tsc` compiler for type-checking directly.

```bash
npm run ts-lint
```

A pre-commit hook will ensure code is linted before committed.

## Testing

To run [Jest](https://jestjs.io/) w/ [React Testing-Library](https://testing-library.com/docs/react-testing-library/intro/) support, run:

```bash
npm run test
```

## API

The API endpoint is an environment variable which is accessed in a local dev environment via the `miscellany` Git repo.

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
curl -X POST 'http://127.0.0.1:3000/search' --data-binary '{"query": {"match_all": {}}, "_source": "id", "size": 1000}' | jq

# Search Collections
curl -X POST 'http://127.0.0.1:3000/search/collections' --data-binary '{"query": {"match_all": {}}, "_source": "id", "size": 1000}' | jq
```

### Work / Collection examples

```
https://pylxu5f2l2.execute-api.us-east-1.amazonaws.com/v2/works/4359936f-9091-499b-893f-b8e900db49ec

https://pylxu5f2l2.execute-api.us-east-1.amazonaws.com/v2/collections/18ec4c6b-192a-4ab8-9903-ea0f393c35f7

https://pylxu5f2l2.execute-api.us-east-1.amazonaws.com/v2/file-sets/ce1f6d18-8563-4f70-aabc-d4ce1688d8dc
```
