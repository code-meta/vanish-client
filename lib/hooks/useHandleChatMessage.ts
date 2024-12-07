import { useParams } from "next/navigation";
import { useAppSelector } from "../hooks";
import { useEffect, useState } from "react";

export default function useDirectChatRoom() {
  const params = useParams<{ one_to_one_room_id: string }>();
  const connections = useAppSelector((state) => state.user.connections);
  const loading = useAppSelector((state) => state.user.loading);

  const [exists, setExists] = useState(false);

  function selectConnection() {
    try {
      const connection = connections.find(
        (item) => item.one_to_one_room_id === params.one_to_one_room_id
      );

      if (!connection) {
        setExists(false);
        return;
      }

      const directChatRoomInfo = {
        one_to_one_room_id: connection.one_to_one_room_id,
        one_to_one_message_secret: connection.one_to_one_message_secret,
        sharedSecretBase64: connection.sharedSecretBase64,
      };

      setExists(true);

      console.log("xxxxxxxxxxxxxx");
      console.log(directChatRoomInfo);
      console.log("xxxxxxxxxxxxxx");
    } catch (error) {
      console.log("something went wrong");
    } finally {
      setExists(false);
    }
  }

  useEffect(() => {
    selectConnection();
  }, [loading]);

  return { exists };
}
