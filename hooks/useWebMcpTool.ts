import { useEffect, useRef } from "react";

type ToolDefinition = Omit<WebMCP.ModelContextTool, "execute">;

/**
 * Register a WebMCP tool for the lifetime of the component that provides it.
 * The AbortSignal is the specification's unregistration mechanism.
 */
export default function useWebMcpTool<
  Input extends Record<string, unknown> = Record<string, unknown>,
>(
  definition: ToolDefinition,
  execute: WebMCP.ToolExecuteCallback<Input>,
  enabled = true,
) {
  const executeRef = useRef(execute);

  useEffect(() => {
    executeRef.current = execute;
  }, [execute]);

  useEffect(() => {
    const modelContext = document.modelContext;
    if (!enabled || typeof modelContext?.registerTool !== "function") return;

    const controller = new AbortController();
    let mounted = true;

    const tool: WebMCP.ModelContextTool = {
      ...definition,
      execute: (input, options) =>
        executeRef.current(
          input as Input,
          options ?? { signal: new AbortController().signal },
        ),
    };

    void modelContext
      .registerTool(tool, { signal: controller.signal })
      .catch((error: unknown) => {
        if (!mounted || controller.signal.aborted) return;
        console.warn(
          `Unable to register WebMCP tool "${definition.name}"`,
          error,
        );
      });

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [definition, enabled]);
}

export type { ToolDefinition };
