import { PersonalRoom } from "@/lib/types";
import { Antenna, Trash } from "lucide-react";
import React, { useState } from "react";
import WarningDialog from "../../_components/WarningDialog";

import { Button } from "@/components/ui/button";
import SendRoomInvitationDrawer from "./SendRoomInvitationDrawer";
import useHandlePersonalRooms from "@/lib/hooks/useHandlePersonalRooms";

const PersonalRoomCard = (props: PersonalRoom) => {
  const { handleRemovePersonalRoom } = useHandlePersonalRooms();
  const [alertOpen, setAlertOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <WarningDialog
        continueText="Remove"
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        nextFunction={() => {
          handleRemovePersonalRoom(props.id);
        }}
        title="Are you sure?"
        description="You’re about to remove this room. Do you wish to go ahead?"
      />

      <div className="bg-card w-[280px] h-28 px-3 py-2 rounded-lg border-2 border-border flex flex-col cursor-pointer hover:border-primary/70 transition-all group">
        <div className="flex items-center justify-between">
          <span className="font-roboto font-medium">{props.roomName}</span>
          <Trash
            className="w-5 h-5 text-destructive/80 cursor-pointer hover:text-destructive"
            onClick={() => {
              setAlertOpen(true);
            }}
          />
        </div>

        <div className="flex-1 flex items-end pb-2 text-muted group-hover:text-primary/70">
          <Button
            variant={"outline"}
            className="text-foreground w-full flex justify-between"
            onClick={() => setIsOpen(true)}
          >
            <span>Send Invitation</span>
            <Antenna className="text-primary" />
          </Button>

          <SendRoomInvitationDrawer
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            room={{ ...props }}
          />
        </div>
      </div>
    </>
  );
};

export default PersonalRoomCard;
