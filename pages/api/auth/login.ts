import { NextApiRequest, NextApiResponse } from "next";
import { NUSSO_REDIRECT_URL } from "@/lib/constants/auth";
import axios from "axios";
import { setCookie } from "cookies-next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      const host = req.headers["x-forwarded-host"] || req.headers.host;
      const callbackUrl = `https://${host}/api/auth/callback`;

      const returnPath = req.headers.referer;
      console.log("return", returnPath);

      // Save user's current url so we can redirect them back
      setCookie(NUSSO_REDIRECT_URL as string, returnPath, {
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
          res.redirect(response.data.redirecturl);
        });

      break;
    }
  }
};

export default handler;
