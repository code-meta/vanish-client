import React from "react";
import SectionHeading from "./SectionHeading";
import InfoMessageText from "./InfoMessageText";
import { useAppSelector } from "@/lib/hooks";
import ConnectionCard from "./ConnectionCard";

const ConnectedProfiles = () => {
  const connections = useAppSelector((state) => state.user.connections);

  return (
    <div className="mt-14">
      <SectionHeading text="Connected Friends" />

      <div className="mt-4">
        {!connections.length && (
          <InfoMessageText text="Looks like your friend list is empty. Start connecting!" />
        )}

        {connections.length && (
          <>
            <InfoMessageText text="Tap on a card to start a private chat" />

            <div className="flex flex-wrap gap-4 mt-3">
              {connections.map((item) => (
                <div key={item.id}>
                  <ConnectionCard {...item} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConnectedProfiles;
