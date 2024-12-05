import React from "react";
import SectionHeading from "./SectionHeading";
import InfoMessageText from "./InfoMessageText";

const ConnectedProfiles = () => {
  return (
    <div className="mt-14">
      <SectionHeading text="Connected Friends" />

      <div className="mt-4">
        <InfoMessageText text="Looks like your friend list is empty. Start connecting!" />
      </div>
    </div>
  );
};

export default ConnectedProfiles;
