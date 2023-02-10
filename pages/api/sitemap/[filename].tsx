import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError, AxiosResponse } from "axios";
import { DC_SITEMAP_BUCKET } from "@/lib/constants/bucket";

class NotFound extends Error {
  constructor() {
    super("Not Found");
  }
}

const getObject = async (filename: string): Promise<AxiosResponse> => {
  if (!DC_SITEMAP_BUCKET || !filename) throw new NotFound();
  try {
    return await axios(`http://${DC_SITEMAP_BUCKET}/${filename}`, { responseType: "stream" });
  } catch (err) {
    console.warn('caught in getObject', err);
    if (err instanceof AxiosError) throw new NotFound();
    throw err;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {  
  const { filename } = req.query;
  try {
    const response: AxiosResponse = await getObject(filename as string);

    res
      .status(200)
      .setHeader("Content-Type", response.headers["content-type"] as string)
      .setHeader("Content-Length", response.headers["content-length"] as string)
      .setHeader("ETag", response.headers["etag"] as string)
      .setHeader("Last-Modified", response.headers["last-modified"] as string);
    response.data.pipe(res);
  } catch (err) {
    if (err instanceof NotFound) {
      res.status(404).end("Not Found");
    } else {
      throw err;
    }
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
};
