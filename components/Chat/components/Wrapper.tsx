import Chat from "@/components/Chat";
import useChatSocket from "../../../hooks/useChatSocket";
import useQueryParams from "@/hooks/useQueryParams";

const ChatWrapper = () => {
  const { searchTerm: question } = useQueryParams();
  const { authToken, chatSocket } = useChatSocket();

  if (!authToken || !chatSocket || !question) return null;

  return (
    <div style={{ background: "#f0f0f0", padding: "2rem" }}>
      <Chat authToken={authToken} chatSocket={chatSocket} question={question} />
    </div>
  );
};

export default ChatWrapper;
