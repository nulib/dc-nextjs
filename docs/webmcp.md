# WebMCP in Digital Collections

## Overview

[WebMCP](https://webmachinelearning.github.io/webmcp/) is a proposed browser
standard that lets a web page expose structured tools to an AI agent. Instead
of inferring how to use the interface from DOM elements and simulated clicks,
an agent can discover a named operation, inspect its JSON Schema, call it with
structured input, and receive a structured result.

This application uses WebMCP's **imperative JavaScript API**. The tools run in
the open Digital Collections page, so they share the page's React state,
Next.js router, authenticated browser session, API access, and visible UI. This
is different from the remote MCP server in `dc-api-v2`, which can be used
without an open browser page.

WebMCP is a progressive enhancement. Browsers without `document.modelContext`
continue to use the normal site, and the registration hook becomes a no-op.

> WebMCP is experimental and its API may change. This document describes the
> implementation and draft specification as of September 1, 2026.

## How the browser flow works

1. A React component for the current page mounts.
2. `useWebMcpTool` combines a tool definition with an execution callback and
   calls `document.modelContext.registerTool(...)`.
3. The browser makes the registered definition available to agents. Browser
   agents use an internal discovery mechanism; an in-page JavaScript agent can
   call `document.modelContext.getTools()`.
4. An agent selects a tool using its name, description, input schema, and
   annotations, then invokes it with a JSON-compatible input object.
5. The execution callback runs in the page. It may read live React state,
   navigate with the Next.js router, update a page control, or call an API with
   the user's browser credentials.
6. The callback returns a JSON-serializable value. The WebMCP API serializes
   that result for the caller.
7. When the owning component unmounts or the tool is disabled, its registration
   signal is aborted. The browser unregisters the tool and discovery updates to
   reflect the new page context.

This lifecycle makes the tool list page-aware. For example, collection tools
exist only while a collection page is open. `search_works` is mounted in
`pages/_app.tsx`, so it remains available across page navigation.

Registration and unregistration notify consumers through the WebMCP
`toolchange` event. Consumers should not assume a site's tool list is static.

## Tool definitions

An imperative tool definition is a `ModelContextTool` with these fields:

| Field                              | Purpose                                                                                        |
| ---------------------------------- | ---------------------------------------------------------------------------------------------- |
| `name`                             | Required unique identifier used by an agent when it calls the tool.                            |
| `title`                            | Optional human-readable label for browser or developer UI.                                     |
| `description`                      | Required explanation of when to use the tool and what visible or application state it changes. |
| `inputSchema`                      | JSON Schema describing the accepted input object.                                              |
| `annotations.readOnlyHint`         | Indicates that the tool only reads state.                                                      |
| `annotations.untrustedContentHint` | Indicates that returned content must be treated as untrusted from the site's perspective.      |
| `execute`                          | Callback that receives the input object and an execution `AbortSignal`.                        |

Definitions in this repository are module-level constants in
`components/WebMCP/Tools.tsx`. Keeping them outside React components gives the
registration hook a stable object identity and avoids unnecessary
unregistration and re-registration during renders.

The input schemas use `additionalProperties: false`, bounded strings, and
explicit `required` fields. Execution callbacks still validate and normalize
their inputs with `requireQuery`; the schema is information for the agent and
browser and is not a replacement for application-side validation.

Read tools are marked with both `readOnlyHint: true` and
`untrustedContentHint: true` because their results can contain catalog metadata
or other externally supplied text. Tools that navigate or update the interface
are not marked read-only, and their descriptions explicitly disclose the
visible effect.

## Registration lifecycle

`hooks/useWebMcpTool.ts` owns registration for React components:

```tsx
useWebMcpTool<SearchInput>(SEARCH_WORKS_TOOL, async (input, { signal }) => {
  const query = requireQuery(input);
  if (signal.aborted)
    throw new DOMException("Tool call canceled", "AbortError");

  await router.push({ pathname: "/search", query: { q: query } });
  return { query, status: "Search results are now visible." };
});
```

The hook has three important behaviors:

- It checks for `document.modelContext.registerTool`, making unsupported
  browsers a no-op.
- It stores the execution callback in a ref. A tool registers once but always
  reads the latest props, context, and closures when executed.
- It passes an `AbortController` signal to `registerTool`. Aborting that signal
  is the WebMCP-defined unregistration mechanism, so React cleanup removes the
  tool automatically.

The `enabled` argument supports conditional registration. Work-page tools use
it to register only after `useWorkAuth` confirms that the current user can read
the work.

The signal passed to a tool's `execute` callback is separate from the
registration signal. It represents cancellation of that individual invocation.
Long-running work, including IIIF content search, passes the signal to `fetch`;
navigation tools check it before changing the page.

Registration can reject, for example because a name is already registered or a
definition is invalid. The hook logs an actionable warning unless the component
has already unmounted or intentionally aborted registration.

## Discovery and execution

WebMCP discovery is local to an open browser page. A browser or client must
visit the site before it knows which tools the page exposes; this is not a
site-wide tool catalog.

The specification distinguishes two consumers:

- A browser-integrated agent discovers tools through browser internals.
- JavaScript running in the page can call `document.modelContext.getTools()`.
  It receives exposed tools registered by the current document and its
  descendant documents. Cross-origin exposure is controlled separately.

A `RegisteredTool` returned from discovery contains the public definition plus
the registering window and origin. It does not expose the site's execution
callback directly. In-page callers pass that registered object back to
`document.modelContext.executeTool(tool, input)`; the browser dispatches the
call to the document that owns the tool.

For example, the browser console can inspect and call a tool as follows:

```js
const tools = await document.modelContext.getTools();
tools.map(({ name, description, inputSchema, annotations }) => ({
  name,
  description,
  inputSchema,
  annotations,
}));

const search = tools.find(({ name }) => name === "search_works");
const serializedResult = await document.modelContext.executeTool(search, {
  query: "Chicago history",
});
JSON.parse(serializedResult);
```

Tool registration and execution accept cancellation signals. Registration also
accepts `exposedTo` for cross-origin document trees, but this application does
not opt into cross-origin exposure. Discovery can instead be filtered by origin
with the `getTools({ fromOrigins: [...] })` option.

## Tools provided by Digital Collections

The globally available tool is present alongside any tools supplied by the
current route.

| Page                     | Tool                        | Behavior                                                                                                                              |
| ------------------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Every page               | `search_works`              | Navigates to a works search for the supplied query.                                                                                   |
| `/search`                | `get_search_results`        | Returns the current query, compacted filters, loading/error state, pagination, total hits, and up to five visible results.            |
| `/collections`           | `get_collections`           | Returns the active title filter and up to six matching collections.                                                                   |
| `/collections`           | `filter_collections`        | Updates the controlled title filter and visible collection list; an empty query clears it.                                            |
| `/collections/[id]`      | `get_current_collection`    | Returns collection metadata, visibility, work-type counts, and top subjects.                                                          |
| `/collections/[id]`      | `search_current_collection` | Navigates to a works search scoped to the open collection.                                                                            |
| Authorized `/items/[id]` | `get_current_work`          | Returns authorized work metadata and the viewer's selected canvas.                                                                    |
| Authorized `/items/[id]` | `search_within_work`        | Calls the manifest's IIIF Search API, updates the viewer's content-search query, opens its Search panel, and reports the match count. |
| Authorized `/items/[id]` | `show_similar_works`        | Navigates to the similar-works search for the open work.                                                                              |

Tool results are intentionally compact. String values are whitespace-normalized
and clipped, and arrays and search results are bounded. This keeps agent context
small and reduces exposure of page or catalog content that was not needed for
the requested operation.

## Page integration

The implementation is split by responsibility:

- `components/WebMCP/Tools.tsx` defines schemas, annotations, execution
  callbacks, compact result shapes, and the route-specific tool components.
- `hooks/useWebMcpTool.ts` adapts WebMCP registration to the React lifecycle.
- `pages/_app.tsx` mounts the site-wide tool.
- `pages/search.tsx`, `pages/collections/index.tsx`,
  `pages/collections/[id].tsx`, and `pages/items/[...id].tsx` mount contextual
  tools with live page state.
- `next.config.js` sends `Permissions-Policy: tools=(self)`.
- `webmcp-types` supplies the experimental API's TypeScript declarations.

Work content search uses the dedicated `content-search` query parameter rather
than the global `q` parameter. This prevents a viewer search from being confused
with a site-wide search. `WorkViewerWrapper` remounts Clover for a new
URL-driven query and selects its content-search tab after Clover initializes.

## Security and privacy

WebMCP is available only in a secure, origin-isolated context and is gated by
the `tools` Permissions Policy. Chrome documents the default allowlist as
`self`; this application sends that policy explicitly and does not enable
cross-origin iframes.

Tools execute with the open page's authority. They must preserve the same
authorization, validation, and state-transition rules as the human UI:

- Restricted work tools are not registered until `userCanRead` is true.
- IIIF content search uses `credentials: "include"` so the existing authenticated
  request path is preserved.
- Read operations expose bounded, selected fields instead of complete API
  responses.
- Catalog text returned to an agent is annotated as untrusted content.
- Execution cancellation is honored before navigation and during network work.

Do not expose a privileged operation merely because the UI has a similar
button. New tools should reuse the UI's authorization and validation path and
should describe consequential effects without ambiguity.

## Local Chrome setup

Chrome currently exposes WebMCP for local development behind a flag:

1. Open `chrome://flags/#enable-webmcp-testing`.
2. Set **WebMCP for testing** to **Enabled**.
3. Relaunch Chrome.
4. Start this application and open its HTTPS local URL. The API is a secure
   context feature, so use the repository's configured development certificate
   and `https://local.dev.rdc.library.northwestern.edu:3000` unless your local
   environment intentionally overrides `DEV_SERVER_HOSTNAME`.
5. Open Chrome DevTools and inspect the registered WebMCP tools. The
   [Model Context Tool Inspector extension](https://developer.chrome.com/docs/ai/webmcp#imitate_agent_chat_with_the_inspector_extension)
   can also list tools, invoke them manually, validate their schemas, and show
   structured results or errors.

Useful checks while moving between routes:

- `search_works` remains registered.
- Old route tools disappear and the new route's tools appear.
- Work tools do not appear for a work the current session cannot read.
- Navigation tools visibly update the URL and page.
- Read tools return compact structured data rather than rendered HTML.
- Canceling a content search aborts its network request.

If `document.modelContext` is missing, confirm that Chrome was relaunched after
enabling the flag, the page is using HTTPS, origin isolation has not been
disabled with `document.domain` or `Origin-Agent-Cluster: ?0`, and the `tools`
Permissions Policy is present.

The testing flag is a local-development path. Chrome's current public rollout
is an origin trial beginning in Chrome 149. This branch does not install an
origin-trial token, so production use in Chrome requires enrolling the deployed
origin and serving its token while that requirement remains in effect. Other
WebMCP-capable clients may have their own enablement rules.

## Adding a tool

1. Define a module-level `ToolDefinition` in
   `components/WebMCP/Tools.tsx`. Give it a unique verb-oriented name, a precise
   description, a strict JSON Schema, and accurate annotations.
2. Add the execution callback to the component whose lifetime matches the
   feature's page context. Use `enabled` when authorization or loaded state is a
   prerequisite.
3. Validate input again in the callback, honor the execution signal, and return
   a small JSON-serializable object with enough status information for an agent
   to understand the result.
4. Reuse the same router, state, API, and authorization paths as the visible UI.
5. Add lifecycle and behavior tests. Cover registration, unregistration,
   current-state execution, cancellation for asynchronous work, and the absence
   of the tool when it is unauthorized.
6. Verify the schema, visible effect, return value, and route-scoped discovery in
   Chrome's WebMCP tooling.

## References

- [WebMCP draft specification](https://webmachinelearning.github.io/webmcp/)
- [Chrome WebMCP documentation](https://developer.chrome.com/docs/ai/webmcp)
- [Chrome imperative API guide](https://developer.chrome.com/docs/ai/webmcp/imperative-api)
- [WebMCP GitHub repository](https://github.com/webmachinelearning/webmcp)
