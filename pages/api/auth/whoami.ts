import { API_TOKEN_COOKIE, AUTH_DOMAIN } from "lib/constants/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";
const jwt = require("jsonwebtoken");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = getCookie(API_TOKEN_COOKIE as string, {
    domain: AUTH_DOMAIN,
    req,
    res,
  });

  try {
    const user = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    res.send(user);
  } catch (error) {
    res.send(null);
  }
};

export default handler;
