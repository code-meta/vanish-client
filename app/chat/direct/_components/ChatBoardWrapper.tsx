import { useAppSelector } from "@/lib/hooks";
import React from "react";
import TextMessageCard from "./TextMessageCard";
import { cn } from "@/lib/utils";

const ChatBoardWrapper = () => {
  const messages = useAppSelector(
    (state) => state.chatMessage.roomMessages
  );

  const user = useAppSelector((state) => state.user.user);

  if (!messages) return <>Something went wrong</>;

  return (
    <div className="max-w-[900px] mx-auto min-[calc(h-dvh-4rem)] pb-36 flex flex-col gap-y-4">
      {messages.map((item) => (
        <div
          key={item.msg_id}
          className={cn(
            "flex",
            item.creator_id === user.id ? "justify-end" : "justify-start"
          )}
        >
          {item.message_payload.type === "TEXT" && <TextMessageCard {...item} />}
        </div>
      ))}
    </div>
  );
};

export default ChatBoardWrapper;
