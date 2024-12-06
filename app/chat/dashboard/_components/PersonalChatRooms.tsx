import React from "react";
import SectionHeading from "./SectionHeading";
import InfoMessageText from "./InfoMessageText";
import { Button } from "@/components/ui/button";
import useCreateNewRoom from "@/lib/hooks/useCreateNewRoom";
import CreateRoomDialog from "./CreateRoomDialog";
import { useAppSelector } from "@/lib/hooks";
import PersonalRoomCard from "./PersonalRoomCard";

const PersonalChatRooms = () => {
  const personalRooms = useAppSelector((state) => state.user.personalRooms);
  return (
    <div className="mt-16">
      <SectionHeading text="Your Chat Rooms" />

      <div className="mt-4">
        <CreateRoomDialog />

        {personalRooms.length <= 0 && (
          <div className="mt-2">
            <InfoMessageText text="No chat rooms yet—start a new one!" />
          </div>
        )}

        {personalRooms.length >= 1 && (
          <div className="mt-2">
            <div className="flex flex-wrap gap-4 mt-3">
              {personalRooms.map((item) => (
                <div key={item.id}>
                  <PersonalRoomCard {...item} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalChatRooms;
