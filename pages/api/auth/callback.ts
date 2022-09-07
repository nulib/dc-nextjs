import {
  API_TOKEN_COOKIE,
  AUTH_DOMAIN,
  NUSSO_REDIRECT_URL,
} from "@/lib/constants/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { UserNUSSO } from "@/types/context/user";

const { redeemSsoToken, token } = require("./utils");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user: UserNUSSO = await redeemSsoToken(req);

  console.log("Authed User", user);

  if (!user) {
    deleteCookie(API_TOKEN_COOKIE as string, {
      domain: AUTH_DOMAIN,
      req,
      res,
    });

    res.redirect("/");
  } else {
    const jwtToken = token(user, process.env.JWT_TOKEN_SECRET);

    /**
     * Set domain cookies
     */
    setCookie(API_TOKEN_COOKIE as string, jwtToken, {
      domain: AUTH_DOMAIN,
      req,
      res,
    });

    let redirectUrl = getCookie(NUSSO_REDIRECT_URL as string, {
      req,
      res,
    });

    if (redirectUrl === undefined || redirectUrl === "") redirectUrl = "/";

    console.log("redirect to", redirectUrl);

    deleteCookie(NUSSO_REDIRECT_URL as string, { req, res });

    /**
     * Redirect user to DC v2 app
     */
    if (redirectUrl) {
      res.redirect(redirectUrl as string);
    }
  }
};

export default handler;
