import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect, useState } from "react";
import {
  setRoomChannel,
  setSelectedChatRoom,
} from "../features/chat/chatMessageSlice";
import useHandleChatMessage from "./useHandleChatMessage";
import { Socket } from "phoenix";

export default function useDirectChatRoom() {
  const params = useParams<{ one_to_one_room_id: string }>();
  const connections = useAppSelector((state) => state.user.connections);
  const user = useAppSelector((state) => state.user.user);

  const [selectedRoomInfo, setSelectedRoomInfo] = useState<{
    roomId: string;
    sharedSecret: string;
  } | null>(null);

  const { setSendOnEnter } = useHandleChatMessage();

  const [exists, setExists] = useState(false);
  const [chattingWith, setChattingWith] = useState("");

  const dispatch = useAppDispatch();

  const socket = new Socket("ws://localhost:4000/socket"); // No auth needed

  function selectConnection() {
    try {
      const connection = connections.find(
        (item) => item.one_to_one_room_id === params.one_to_one_room_id
      );

      if (!connection) {
        setExists(false);
        return;
      }

      setChattingWith(connection.name);

      dispatch(
        setSelectedChatRoom({
          roomId: connection.id,
          type: "DIRECT",
          room: {
            type: "DIRECT",
            id: connection.one_to_one_room_id,
            messageSecret: connection.one_to_one_message_secret,
            sharedSecretBase64: connection.sharedSecretBase64,
          },
          Message: [],
        })
      );

      setExists(true);

      setSelectedRoomInfo({
        roomId: connection.one_to_one_room_id,
        sharedSecret: connection.sharedSecretBase64,
      });
    } catch (error) {
      console.log("something went wrong");
      setExists(false);
    }
  }

  useEffect(() => {
    selectConnection();
    setSendOnEnter();
  }, [user.id]);

  useEffect(() => {
    if (!selectedRoomInfo) return;

    socket.connect();

    const channel = socket.channel(
      `room:${selectedRoomInfo.roomId}.${selectedRoomInfo.sharedSecret}`,
      {}
    );

    channel
      .join()
      .receive("ok", (resp) => {
        dispatch(setRoomChannel(channel));
        console.log(
          `Joined room ${selectedRoomInfo.roomId} successfully:`,
          resp
        );
      })
      .receive("error", (resp) =>
        console.log(`Unable to join room ${selectedRoomInfo.roomId}:`, resp)
      );

    return () => {
      channel.leave();
      socket.disconnect();
      dispatch(setRoomChannel(null));
    };
  }, [selectedRoomInfo]);

  return { exists, chattingWith };
}
