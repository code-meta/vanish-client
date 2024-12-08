import { Message, TextMessage } from "@/lib/types";
import React from "react";

const TextMessageCard = ({ messagePayload }: Message) => {
  if (messagePayload.type !== "TEXT") return null;

  return (
    <div className="bg-card bg-gradient-to-bl from-card to-primary/15 text-card-foreground px-4 max-w-[90%] md:max-w-[50%] inline-flex items-center justify-center py-2 rounded-2xl">
      <p className="">{messagePayload.content}</p>
    </div>
  );
};

export default TextMessageCard;
