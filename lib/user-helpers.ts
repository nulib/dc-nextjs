import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import axios from "axios";
import { handleError } from "./dc-api";

export async function getUser() {
  try {
    const response = await axios.get(`${DCAPI_ENDPOINT}/auth/whoami`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    handleError(err);
  }
}
