import { renderHook, waitFor } from "@testing-library/react";
import useWebMcpTool, { ToolDefinition } from "./useWebMcpTool";

const TOOL: ToolDefinition = {
  name: "test_tool",
  description: "Test a component-backed WebMCP tool.",
  inputSchema: {
    type: "object",
    properties: { value: { type: "string" } },
    required: ["value"],
    additionalProperties: false,
  },
  annotations: { readOnlyHint: true, untrustedContentHint: false },
};

const installModelContext = () => {
  const tools = new Map<string, WebMCP.ModelContextTool>();
  const registerTool = jest.fn(
    async (
      tool: WebMCP.ModelContextTool,
      options?: WebMCP.ModelContextRegisterToolOptions,
    ) => {
      tools.set(tool.name, tool);
      options?.signal?.addEventListener(
        "abort",
        () => {
          if (tools.get(tool.name) === tool) tools.delete(tool.name);
        },
        { once: true },
      );
    },
  );

  Object.defineProperty(document, "modelContext", {
    configurable: true,
    value: { registerTool },
  });

  return { registerTool, tools };
};

afterEach(() => {
  Reflect.deleteProperty(document, "modelContext");
});

describe("useWebMcpTool", () => {
  it("registers for the component lifecycle and calls the latest handler", async () => {
    const { registerTool, tools } = installModelContext();
    const { rerender, unmount } = renderHook(
      ({ suffix }) =>
        useWebMcpTool<{ value: string }>(TOOL, ({ value }, { signal }) => {
          expect(signal).toBeInstanceOf(AbortSignal);
          return `${value}-${suffix}`;
        }),
      { initialProps: { suffix: "first" } },
    );

    await waitFor(() => expect(tools.has("test_tool")).toBe(true));
    expect(registerTool).toHaveBeenCalledTimes(1);
    expect(registerTool.mock.calls[0][0].annotations).toEqual(TOOL.annotations);

    rerender({ suffix: "latest" });
    const result = await tools
      .get("test_tool")
      ?.execute({ value: "result" }, { signal: new AbortController().signal });

    expect(result).toBe("result-latest");
    expect(registerTool).toHaveBeenCalledTimes(1);

    unmount();
    expect(tools.size).toBe(0);
  });

  it("supplies a signal when the browser omits execution options", async () => {
    const { tools } = installModelContext();
    const execute = jest.fn((_input, { signal }) => signal.aborted);

    const { unmount } = renderHook(() => useWebMcpTool(TOOL, execute));
    await waitFor(() => expect(tools.has("test_tool")).toBe(true));

    const chromeExecute = tools.get("test_tool")?.execute as (
      input: Record<string, unknown>,
    ) => WebMCP.MaybePromise<unknown>;
    const result = await chromeExecute({ value: "result" });

    expect(result).toBe(false);
    expect(execute.mock.calls[0][1].signal).toBeInstanceOf(AbortSignal);

    const executionSignal = execute.mock.calls[0][1].signal;
    unmount();
    expect(executionSignal.aborted).toBe(false);
  });

  it("is a no-op when the browser does not support WebMCP", () => {
    expect(() =>
      renderHook(() => useWebMcpTool(TOOL, () => "unused")),
    ).not.toThrow();
  });
});
