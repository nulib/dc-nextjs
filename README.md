# NextJS throwaway playground

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Deploying

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

## API

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

There is a sample `/api/collection` endpoint which just returns a mock object. You can see this in action at: `http://localhost:3000/local-api`
