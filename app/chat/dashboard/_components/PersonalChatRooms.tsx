import React from "react";
import SectionHeading from "./SectionHeading";
import InfoMessageText from "./InfoMessageText";
import { Button } from "@/components/ui/button";
import useCreateNewRoom from "@/lib/hooks/useCreateNewRoom";
import CreateRoomDialog from "./CreateRoomDialog";

const PersonalChatRooms = () => {
  return (
    <div className="mt-16">
      <SectionHeading text="Your Chat Rooms" />

      <div className="mt-4">
        <CreateRoomDialog />
        <div className="mt-2">
          <InfoMessageText text="No chat rooms yet—start a new one!" />
        </div>
      </div>
    </div>
  );
};

export default PersonalChatRooms;
