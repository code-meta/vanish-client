import useHandleConnection from "@/lib/hooks/useHandleConnection";
import { Connection } from "@/lib/types";
import { MessagesSquare, Trash } from "lucide-react";
import React, { useState } from "react";
import WarningDialog from "../../_components/WarningDialog";

const ConnectionCard = ({ id, name }: Connection) => {
  const { handleRemoveConnection } = useHandleConnection();
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <>
      <div className="bg-card w-full h-28 px-3 py-2 rounded-lg border-2 border-border flex flex-col cursor-pointer hover:border-primary/70 transition-all group">
        <WarningDialog
          continueText="Remove"
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          nextFunction={() => handleRemoveConnection(id)}
          title="Are you sure?"
          description="You’re about to remove your friend’s connection. Do you wish to go ahead?"
        />
        <div className="flex items-center justify-between">
          <span className="font-roboto font-medium">{name}</span>
          <Trash
            className="w-5 h-5 text-destructive/80 cursor-pointer hover:text-destructive"
            onClick={() => {
              setAlertOpen(true);
            }}
          />
        </div>
        <div className="flex-1 flex items-end px-3 pb-2 text-muted group-hover:text-primary/70">
          <MessagesSquare />
        </div>
      </div>
    </>
  );
};

export default ConnectionCard;
