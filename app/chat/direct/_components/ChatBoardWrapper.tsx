import { useAppSelector } from "@/lib/hooks";
import React from "react";

const ChatBoardWrapper = () => {
  const messages = useAppSelector(
    (state) => state.chatMessage.selectedChatRoom?.Message
  );

  if (!messages) return <>Something went wrong</>;

  return (
    <div className="max-w-[900px] mx-auto min-[calc(h-dvh-4rem)] pb-36">
      {messages.map((item) => (
        <div key={item.id}>
          {item.messagePayload.type === "TEXT" && (
            <div className="py-4">{item.messagePayload.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatBoardWrapper;
