import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect, useState } from "react";
import { setSelectedChatRoom } from "../features/chat/ChatMessageSlice";

export default function useDirectChatRoom() {
  const params = useParams<{ one_to_one_room_id: string }>();
  const connections = useAppSelector((state) => state.user.connections);
  const user = useAppSelector((state) => state.user.user);

  const [exists, setExists] = useState(false);
  const [chattingWith, setChattingWith] = useState("");

  const dispatch = useAppDispatch();

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
    } catch (error) {
      console.log("something went wrong");
      setExists(false);
    }
  }

  useEffect(() => {
    selectConnection();
  }, [user.id]);

  return { exists, chattingWith };
}
