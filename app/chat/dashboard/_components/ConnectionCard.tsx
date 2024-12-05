import { Connection } from "@/lib/types";
import { MessagesSquare, Trash } from "lucide-react";
import React from "react";

const ConnectionCard = ({ id, name }: Connection) => {
  return (
    <div className="bg-card w-[280px] h-28 px-3 py-2 rounded-lg border-2 border-border flex flex-col cursor-pointer hover:border-primary/70 transition-all group">
      <div className="flex items-center justify-between">
        <span className="font-roboto font-medium">{name}</span>
        <Trash className="w-5 h-5 text-destructive" />
      </div>
      <div className="flex-1 flex items-end px-3 pb-2 text-muted group-hover:text-primary/70">
        <MessagesSquare />
      </div>
    </div>
  );
};

export default ConnectionCard;
