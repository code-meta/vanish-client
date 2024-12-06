import React from "react";
import SectionHeading from "./SectionHeading";
import InfoMessageText from "./InfoMessageText";
import { Button } from "@/components/ui/button";
import useCreateNewRoom from "@/lib/hooks/useCreateNewRoom";
import CreateRoomDialog from "./CreateRoomDialog";
import { useAppSelector } from "@/lib/hooks";

const PersonalChatRooms = () => {
  const personalRooms = useAppSelector((state) => state.user.personalRooms);
  return (
    <div className="mt-16">
      <SectionHeading text="Your Chat Rooms" />

      <div className="mt-4">
        <CreateRoomDialog />
        <div className="mt-2">
          <InfoMessageText text="No chat rooms yet—start a new one!" />

          {personalRooms.map((item) => (
            <div key={item.id}>{item.roomName}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalChatRooms;
