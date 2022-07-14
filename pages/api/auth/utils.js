import { NUSSO_COOKIE } from "@/lib/constants/auth";
import { getCookie } from "cookies-next";
const axios = require("axios");
const jwt = require("jsonwebtoken");

async function redeemSsoToken(req) {
  let nussoToken = getCookie(NUSSO_COOKIE, { req });

  if (nussoToken) {
    try {
      const response = await axios
        .get(
          `${process.env.NUSSO_BASE_URL}validate-with-directory-search-response`,
          {
            headers: {
              apikey: process.env.NUSSO_API_KEY,
              webssotoken: nussoToken,
            },
          }
        );
      return response.data.results[0];
    } catch(err) {
      console.error(error);
      return null;
    }
  } else {
    console.warn("No NUSSO token found in request");
    return null;
  }
}

function token(user, secret) {
  return jwt.sign(user, secret);
}

module.exports = {
  redeemSsoToken: redeemSsoToken,
  token: token,
};
