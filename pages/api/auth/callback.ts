import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("CALLBACK req.body", req);

  switch (req.method) {
    case "GET": {
      // Construct callback URL
      console.log("CALLBACK req", req);

      res.send("Hey");
      break;
    }
  }
};

export default handler;
