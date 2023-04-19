import { useContext } from "react";
import MessageContext from "../../store/MessageContext";

const ChatMessage = ({ message }: any) => {
  // const { message } = useContext(MessageContext);
  return (
    <div className="flex justify-start mb-4">
      <img
        className="h-12 w-12 rounded-full object-cover mt-4"
        src={message.userIcon}
        alt="usericon"
      ></img>
      <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
