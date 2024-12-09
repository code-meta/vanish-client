import useHandleConnection from "@/lib/hooks/useHandleConnection";
import { Connection } from "@/lib/types";
import { MessagesSquare, Trash } from "lucide-react";
import React, { useState } from "react";
import WarningDialog from "../../_components/WarningDialog";
import Link from "next/link";

const ConnectionCard = ({ id, name, one_to_one_room_id }: Connection) => {
  const { handleRemoveConnection } = useHandleConnection();
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <>
      <div className="bg-card w-full h-28 px-3 py-2 rounded-lg border-2 border-border flex cursor-pointer hover:border-primary/70 transition-all group relative">
        <WarningDialog
          continueText="Remove"
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          nextFunction={() => handleRemoveConnection(id)}
          title="Are you sure?"
          description="You’re about to remove your friend’s connection. Do you wish to go ahead?"
        />

        <Link
          href={`/chat/direct/${one_to_one_room_id}`}
          className="flex flex-col flex-1"
        >
          <span className="font-roboto font-medium select-none">{name}</span>
          <div className="flex-1 flex items-end px-3 pb-2 text-muted group-hover:text-primary/70">
            <MessagesSquare />
          </div>
        </Link>

        <div className="px-1 absolute right-1">
          <div className="w-8 h-8 flex justify-end">
            <Trash
              className="w-5 h-5 text-destructive/80 cursor-pointer hover:text-destructive"
              onClick={() => {
                setAlertOpen(true);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectionCard;
