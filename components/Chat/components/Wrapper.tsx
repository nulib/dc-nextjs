import { useEffect, useState } from "react";

import Chat from "@/components/Chat";
import { ChatConfig } from "@/components/Chat/types/chat";
import axios from "axios";

const weaviateEndpointt = `https://dcapi-prototype.rdc-staging.library.northwestern.edu/api/v2/chat-endpoint`;
const chatEndpoint =
  "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/chat-endpoint";

const ChatWrapper = () => {
  const [chatConfig, setChatConfig] = useState<ChatConfig>();

  useEffect(() => {
    axios({
      method: "GET",
      url: chatEndpoint,
      withCredentials: true,
    })
      .then((response) => {
        console.log("Wrapper response.data", response.data);
        setChatConfig(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!chatConfig) return null;

  return (
    <div style={{ background: "#f0f0f0", padding: "2rem" }}>
      <Chat chatConfig={chatConfig} />
    </div>
  );
};

export default ChatWrapper;
