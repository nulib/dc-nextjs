import { NUSSO_COOKIE } from "@/lib/constants/auth";
import { getCookie } from "cookies-next";
const axios = require("axios");
const jwt = require("jsonwebtoken");

async function redeemSsoToken(req) {
  let nussoToken = getCookie(NUSSO_COOKIE, { req });

  console.log("nussoToken", nussoToken);

  return new Promise((resolve) => {
    if (nussoToken != null) {
      axios
        .get(
          `${process.env.NUSSO_BASE_URL}validate-with-directory-search-response`,
          {
            headers: {
              apikey: process.env.NUSSO_API_KEY,
              webssotoken: nussoToken,
            },
          }
        )
        .then(function (response) {
          console.log("results", response.data.results[0]);
          resolve(response.data.results[0]);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      resolve(null);
    }
  });
}

function token(user, secret) {
  return jwt.sign(user, secret);
}

module.exports = {
  redeemSsoToken: redeemSsoToken,
  token: token,
};
