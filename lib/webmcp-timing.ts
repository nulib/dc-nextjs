/** Measure only site execution, without changing results or adding payload data. */
export function measureWebMcpExecution<T>(name: string, execute: () => T): T {
  const start = performance.now();
  const finish = () => {
    // Keep only the latest completion per tool; never record input or output.
    // Unsupported User Timing implementations must not break tool execution.
    try {
      const end = performance.now();
      const label = `webmcp:${name}:execute`;
      performance.clearMeasures(label);
      performance.measure(label, { start, end });
    } catch {
      // Timing is diagnostic only.
    }
  };

  try {
    const result = execute();
    if (
      result &&
      typeof (result as unknown as PromiseLike<unknown>).then === "function"
    ) {
      return Promise.resolve(result).finally(finish) as T;
    }
    finish();
    return result;
  } catch (error) {
    finish();
    throw error;
  }
}
