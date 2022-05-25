interface GetApiParams {
  body?: unknown;
  method?: "GET" | "POST";
  url: string;
}

async function getAPIData<R>(obj: GetApiParams): Promise<R | undefined> {
  const { body, method = "POST", url } = obj;
  try {
    const response = await fetch(url, {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      method,
    });
    const data = (await response.json()) as Promise<R>;
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}

export { getAPIData };
