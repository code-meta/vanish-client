"use client";

import { useAppSelector } from "@/lib/hooks";
import React, { useEffect, useRef } from "react";
import TopChatHeader from "../../_components/TopChatHeader";
import ChatBoardWrapper from "./ChatBoardWrapper";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ChatInputBox from "./ChatInputBox";
import useDirectChatRoom from "@/lib/hooks/useDirectChatRoom";
import InfoMessageText from "../../dashboard/_components/InfoMessageText";
import { Channel, Socket } from "phoenix";
import useHandleChatRoom from "@/lib/hooks/useHandleChatRoom";

const MainChatContent = () => {
  // const channelRef = useRef<Channel | null>(null);
  // const socketRef = useRef<Socket | null>(null);

  const loading = useAppSelector((state) => state.user.loading);
  const selectedChatRoom = useAppSelector(
    (state) => state.chatMessage.selectedChatRoom
  );

  const { exists, chattingWith } = useDirectChatRoom();
  
  const { channelRef } = useHandleChatRoom({ exists, selectedChatRoom });

  // useEffect(() => {
  //   console.log({ exists });

  //   if (!exists || !selectedChatRoom) return;

  //   if (!socketRef.current) {
  //     const socket = new Socket("ws://localhost:4000/socket");
  //     socket.connect();
  //     socketRef.current = socket;
  //   }

  //   let channel: Channel | null = null;

  //   if (selectedChatRoom.room.type === "DIRECT") {
  //     channel = socketRef.current.channel(
  //       `room:${selectedChatRoom.room.id}.${selectedChatRoom.room.sharedSecretBase64}`,
  //       {}
  //     );
  //   }

  //   if (selectedChatRoom.room.type === "MANY") {
  //     channel = socketRef.current.channel(
  //       `room:${selectedChatRoom.room.id}`,
  //       {}
  //     );
  //   }

  //   if (!channel) return;

  //   channel
  //     .join()
  //     .receive("ok", (resp) => {
  //       channelRef.current = channel;

  //       channel.on("new_msg", (payload) => {
  //         console.log("new message");
  //         console.log(payload.body);
  //         console.log("new message");
  //       });

  //       console.log(
  //         `Joined room ${selectedChatRoom.roomId} successfully:`,
  //         resp
  //       );
  //     })
  //     .receive("error", (resp) =>
  //       console.log(`Unable to join room ${selectedChatRoom.roomId}:`, resp)
  //     );

  //   return () => {
  //     if (channelRef.current) {
  //       channelRef.current.leave();
  //       channelRef.current = null;
  //     }
  //   };
  // }, [exists]);

  if (loading) return null;

  if (!exists)
    return (
      <div className="pt-16 text-center">
        <InfoMessageText text="Oops! Couldn't find a connection. Please check the link and try again." />
      </div>
    );

  return (
    <div className="flex flex-col h-dvh relative">
      <div className="container mx-auto px-4 max-w-[1024px] fixed left-1/2 transform -translate-x-1/2 top-0 z-50">
        <TopChatHeader name={chattingWith} />
      </div>

      <ScrollArea className="flex-1 pt-28 px-5">
        <ChatBoardWrapper />
        <div className="p-8" id="chatBoard"></div>
      </ScrollArea>

      <div className="pt-1 pb-4 fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-background w-[calc(100%-1rem)]">
        <ChatInputBox channelRef={channelRef} />
      </div>
    </div>
  );
};

export default MainChatContent;
