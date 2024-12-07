"use client";

import { useAppSelector } from "@/lib/hooks";
import React from "react";
import TopHeader from "../../_components/TopHeader";
import { useParams } from "next/navigation";
import TopChatHeader from "../../_components/TopChatHeader";
import ChatBoardWrapper from "./ChatBoardWrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatInputBox from "./ChatInputBox";

const MainChatContent = () => {
  const loading = useAppSelector((state) => state.user.loading);

  const params = useParams<{ one_to_one_room_id: string }>();

  if (loading) return null;

  return (
    <div className="flex flex-col h-dvh relative">
      <div className="container mx-auto px-4 max-w-[1024px] fixed left-1/2 transform -translate-x-1/2 top-0 z-50">
        <TopChatHeader />
      </div>

      <ScrollArea className="flex-1 pt-28 px-5">
        <ChatBoardWrapper />
      </ScrollArea>

      <div className="pt-1 pb-4 fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-background w-[calc(100%-1rem)]">
        <ChatInputBox />
      </div>
    </div>
  );
};

export default MainChatContent;
