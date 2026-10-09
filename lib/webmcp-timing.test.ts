import { measureWebMcpExecution } from "./webmcp-timing";

const measureDescriptor = Object.getOwnPropertyDescriptor(
  performance,
  "measure",
);
const clearDescriptor = Object.getOwnPropertyDescriptor(
  performance,
  "clearMeasures",
);

afterEach(() => {
  jest.restoreAllMocks();
  for (const [name, descriptor] of [
    ["measure", measureDescriptor],
    ["clearMeasures", clearDescriptor],
  ] as const) {
    if (descriptor) Object.defineProperty(performance, name, descriptor);
    else Reflect.deleteProperty(performance, name);
  }
});

const installTiming = () => {
  const measure = jest.fn();
  const clear = jest.fn();
  Object.defineProperty(performance, "measure", {
    configurable: true,
    value: measure,
  });
  Object.defineProperty(performance, "clearMeasures", {
    configurable: true,
    value: clear,
  });
  return { measure, clear };
};

it("preserves synchronous returns and replaces the prior measurement", () => {
  const { measure, clear } = installTiming();
  jest
    .spyOn(performance, "now")
    .mockReturnValueOnce(10)
    .mockReturnValueOnce(12);
  const result = { results: ["a private query must not appear in timing"] };
  expect(measureWebMcpExecution("read", () => result)).toBe(result);
  expect(clear).toHaveBeenCalledWith("webmcp:read:execute");
  expect(measure).toHaveBeenCalledWith("webmcp:read:execute", {
    start: 10,
    end: 12,
  });
  expect(clear.mock.invocationCallOrder[0]).toBeLessThan(
    measure.mock.invocationCallOrder[0],
  );
});

it("measures async settlement rather than just Promise creation", async () => {
  const { measure } = installTiming();
  jest
    .spyOn(performance, "now")
    .mockReturnValueOnce(10)
    .mockReturnValueOnce(30);
  let resolve!: (value: string) => void;
  const pending = measureWebMcpExecution(
    "search",
    () =>
      new Promise<string>((done) => {
        resolve = done;
      }),
  );
  expect(measure).not.toHaveBeenCalled();
  resolve("done");
  await expect(pending).resolves.toBe("done");
  expect(measure).toHaveBeenCalledWith("webmcp:search:execute", {
    start: 10,
    end: 30,
  });
});

it("records failures without replacing synchronous errors or rejections", async () => {
  const { measure } = installTiming();
  const error = new Error("failed");
  expect(() =>
    measureWebMcpExecution("sync", () => {
      throw error;
    }),
  ).toThrow(error);
  await expect(
    measureWebMcpExecution("async", () => Promise.reject(error)),
  ).rejects.toBe(error);
  expect(measure).toHaveBeenCalledTimes(2);
});

it("does not break execution when User Timing is unsupported", () => {
  const { measure } = installTiming();
  measure.mockImplementation(() => {
    throw new Error("unsupported options");
  });
  expect(measureWebMcpExecution("read", () => "ok")).toBe("ok");
});
