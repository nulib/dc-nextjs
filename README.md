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

In a local dev environment, to view API data coming from the index (for now), run the following:

```
export AWS_PROFILE=staging
aws-adfs login --profile $AWS_PROFILE
es-proxy
```
