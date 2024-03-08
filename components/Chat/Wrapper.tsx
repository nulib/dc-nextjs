import Chat from "@/components/Chat/Chat";
import useChatSocket from "@/hooks/useChatSocket";
import useQueryParams from "@/hooks/useQueryParams";

const ChatWrapper = () => {
  const { searchTerm: question } = useQueryParams();
  const { authToken, chatSocket } = useChatSocket();

  if (!authToken || !chatSocket || !question) return null;

  return (
    <Chat authToken={authToken} chatSocket={chatSocket} question={question} />
  );
};

export default ChatWrapper;
