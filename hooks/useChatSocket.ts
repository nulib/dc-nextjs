import { useEffect, useState } from "react";

import { DCAPI_CHAT_ENDPOINT } from "@/lib/constants/endpoints";
import axios from "axios";

const useChatSocket = () => {
  const [chatSocket, setChatSocket] = useState<WebSocket | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    axios({
      method: "GET",
      url: DCAPI_CHAT_ENDPOINT,
      withCredentials: true,
    })
      .then((response) => {
        const { auth: authToken, endpoint } = response.data;

        if (!authToken || !endpoint) return;

        const socket = new WebSocket(endpoint);

        setAuthToken(authToken);
        setChatSocket(socket);

        return () => {
          if (socket) socket.close();
        };
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return { authToken, chatSocket };
};

export default useChatSocket;
