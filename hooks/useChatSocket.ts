import { useCallback, useEffect, useRef, useState } from "react";

import { DCAPI_CHAT_ENDPOINT } from "@/lib/constants/endpoints";
import { StreamingMessage } from "@/types/components/chat";
import axios from "axios";

const useChatSocket = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState<StreamingMessage>();

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    axios({
      method: "GET",
      url: DCAPI_CHAT_ENDPOINT,
      withCredentials: true,
    })
      .then((response) => {
        const { auth: authToken, endpoint } = response.data;
        if (!authToken || !endpoint) return;

        // const temporaryEndpoint =
        //   "wss://0cjj7geo7h.execute-api.us-east-1.amazonaws.com/latest";

        setAuthToken(authToken);
        setUrl(endpoint);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!url) return;

    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    socketRef.current.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      setMessage(data);
    };

    return () => {
      socketRef.current?.close();
    };
  }, [url]);

  const sendMessage = useCallback((data: object) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    }
  }, []);

  return {
    authToken,
    isConnected,
    message,
    sendMessage,
  };
};

export default useChatSocket;
