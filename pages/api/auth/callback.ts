import {
  API_TOKEN_COOKIE,
  AUTH_DOMAIN,
  NUSSO_REDIRECT_URL,
} from "@/lib/constants/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
const { redeemSsoToken, token } = require("./utils");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      redeemSsoToken(req).then((user) => {
        console.log("user", user);
        if (!user) {
          deleteCookie(API_TOKEN_COOKIE as string, {
            domain: AUTH_DOMAIN,
            req,
            res,
          });
        } else {
          console.log(`${user.mail} successfully authenticated`);
          const jwtToken = token(user, process.env.JWT_TOKEN_SECRET);

          /**
           * Set domain cookies
           */
          setCookie(API_TOKEN_COOKIE as string, jwtToken, {
            domain: AUTH_DOMAIN,
            req,
            res,
          });

          const redirectUrl = getCookie(NUSSO_REDIRECT_URL as string, {
            req,
            res,
          });

          deleteCookie(NUSSO_REDIRECT_URL as string, { req, res });

          /**
           * Redirect user to DC v2 app
           */
          if (redirectUrl) {
            res.redirect(redirectUrl as string);
          }
        }
      });

      break;
    }
  }
};

export default handler;
