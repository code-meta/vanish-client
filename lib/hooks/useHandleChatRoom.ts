import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect, useRef, useState } from "react";
import { updateMessages } from "../features/chat/chatMessageSlice";
import { SelectedChatRoom } from "../types";
import { Channel, Socket } from "phoenix";
import useServices from "./useServices";

export default function useHandleChatRoom({
  exists,
  selectedChatRoom,
}: {
  exists: boolean;
  selectedChatRoom: SelectedChatRoom | null;
}) {
  const channelRef = useRef<Channel | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user);

  const { scrollToView } = useServices();

  useEffect(() => {
    console.log({ exists });

    if (!exists || !selectedChatRoom) return;

    if (!socketRef.current) {
      const socket = new Socket("ws://localhost:4000/socket");
      socket.connect();
      socketRef.current = socket;
    }

    const { room } = selectedChatRoom;

    const channelTopic =
      room.type === "DIRECT"
        ? `room:${room.id}.${room.sharedSecretBase64}`
        : `room:${room.id}`;

    const channel = socketRef.current.channel(channelTopic, {});

    if (!channel) return;

    channel
      .join()
      .receive("ok", (resp) => {
        channelRef.current = channel;

        channel.on("new_msg", (payload) => {
          console.log("new message");
          console.log(payload.body);

          if (user.id === payload.body.creator_id) return;

          dispatch(updateMessages(payload.body));

          scrollToView("chatBoard");

          console.log("new message");
        });

        console.log(
          `Joined room ${selectedChatRoom.roomId} successfully:`,
          resp
        );
      })
      .receive("error", (resp) =>
        console.log(`Unable to join room ${selectedChatRoom.roomId}:`, resp)
      );

    return () => {
      if (channelRef.current) {
        channelRef.current.leave();
        channelRef.current = null;
      }
    };
  }, [exists, selectedChatRoom, dispatch]);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return { channelRef };
}
