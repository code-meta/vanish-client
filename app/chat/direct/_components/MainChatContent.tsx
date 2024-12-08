"use client";

import { useAppSelector } from "@/lib/hooks";
import React, { useRef } from "react";
import TopChatHeader from "../../_components/TopChatHeader";
import ChatBoardWrapper from "./ChatBoardWrapper";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ChatInputBox from "./ChatInputBox";
import useDirectChatRoom from "@/lib/hooks/useDirectChatRoom";
import InfoMessageText from "../../dashboard/_components/InfoMessageText";

const MainChatContent = () => {
  const loading = useAppSelector((state) => state.user.loading);

  const { exists, chattingWith } = useDirectChatRoom();

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
        <ChatInputBox />
      </div>
    </div>
  );
};

export default MainChatContent;
