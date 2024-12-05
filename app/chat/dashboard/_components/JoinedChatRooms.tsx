import React from "react";
import SectionHeading from "./SectionHeading";
import InfoMessageText from "./InfoMessageText";

const JoinedChatRooms = () => {
  return (
    <div className="mt-14">
      <SectionHeading text="Joined  Chat Rooms" />

      <div className="mt-4">
        <InfoMessageText text="No rooms joined yet" />
      </div>
    </div>
  );
};

export default JoinedChatRooms;
