import { useAppSelector } from "@/lib/hooks";
import { Message, TextMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";

const TextMessageCard = ({ messagePayload, creator_id }: Message) => {
  const user = useAppSelector((state) => state.user.user);

  if (messagePayload.type !== "TEXT") return null;

  return (
    <div
      className={cn(
        "bg-card from-card to-primary/25 text-card-foreground px-4 max-w-[90%] md:max-w-[50%] inline-flex items-center justify-center py-2 rounded-2xl",
        user.id === creator_id ? "bg-gradient-to-br" : "bg-gradient-to-bl"
      )}
    >
      <p className="">{messagePayload.content}</p>
    </div>
  );
};

export default TextMessageCard;
