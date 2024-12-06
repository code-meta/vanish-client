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

        {connections.length >= 1 && (
          <>
            <InfoMessageText text="Tap on a card to start a private chat" />

            <div className="flex flex-wrap gap-4 mt-3">
              {connections.map((item) => (
                <div
                  key={item.id}
                  className="flex-grow md:flex-grow-0 min-w-[280px]"
                >
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
