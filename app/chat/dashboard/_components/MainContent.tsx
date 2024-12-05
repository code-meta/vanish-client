"use client";

import { useAppSelector } from "@/lib/hooks";
import React from "react";
import TopHeader from "../../_components/TopHeader";
import ExchangeSection from "./ExchangeSection";
import ConnectedProfiles from "./ConnectedProfiles";
import PersonalChatRooms from "./PersonalChatRooms";
import JoinedChatRooms from "./JoinedChatRooms";
import CreateRoomDialog from "./CreateRoomDialog";

const MainContent = () => {
  const loading = useAppSelector((state) => state.user.loading);

  if (loading) return null;

  return (
    <div className="container mx-auto px-4 min-h-dvh pb-28">
      <TopHeader />
      <ExchangeSection />
      <ConnectedProfiles />
      <PersonalChatRooms />
      <JoinedChatRooms />
    </div>
  );
};

export default MainContent;
