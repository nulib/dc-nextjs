import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("req.host", req.headers.host);

  switch (req.method) {
    case "GET": {
      console.log(
        "SETTINGS__NUSSO__BASE_URL",
        process.env.SETTINGS__NUSSO__BASE_URL
      );
      // Construct callback URL
      const callbackUrl = `https://${req.headers.host}/api/auth/callback`;
      console.log("callbackUrl", callbackUrl);

      axios
        .get(`${process.env.SETTINGS__NUSSO__BASE_URL}get-ldap-redirect-url`, {
          headers: {
            apikey: process.env.NUSSO_API_KEY!,
            goto: callbackUrl,
          },
        })
        .then((response) => {
          res.redirect(response.data.redirecturl);
        });

      res.send("Hey");
      break;
    }
  }
};

export default handler;
