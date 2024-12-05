import React from "react";
import SectionHeading from "./SectionHeading";
import InfoMessageText from "./InfoMessageText";
import { Button } from "@/components/ui/button";

const PersonalChatRooms = () => {
  return (
    <div className="mt-16">
      <SectionHeading text="Your Chat Rooms" />

      <div className="mt-4">
        <Button variant={"outline"}>Create a new room</Button>
        <div className="mt-2">
          <InfoMessageText text="No chat rooms yet—start a new one!" />
        </div>
      </div>
    </div>
  );
};

export default PersonalChatRooms;
