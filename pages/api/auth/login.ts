import { NextApiRequest, NextApiResponse } from "next";
import { NUSSO_REDIRECT_URL } from "@/lib/constants/auth";
import axios from "axios";
import { setCookie } from "cookies-next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      console.log("NUSSO_BASE_URL", process.env.NUSSO_BASE_URL);
      // Construct callback URL
      const callbackUrl = `https://${req.headers.host}/api/auth/callback`;
      console.log("callbackUrl", callbackUrl);

      // Save user's current url so we can redirect them back
      setCookie(NUSSO_REDIRECT_URL as string, req.headers.referer, {
        req,
        res,
      });

      axios
        .get(`${process.env.NUSSO_BASE_URL}get-ldap-redirect-url`, {
          headers: {
            apikey: process.env.NUSSO_API_KEY!,
            goto: callbackUrl,
          },
        })
        .then((response) => {
          //console.log("response", response);

          res.redirect(response.data.redirecturl);
        });

      break;
    }
  }
};

export default handler;
