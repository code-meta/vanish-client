import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { decryptData, encryptData, genRandomKey } from "../crypto";
import { getStorageItem, removeItem, storeItem } from "../db/indexedDb";
import { copyToClipboard } from "../utils";
import usePassword from "./usePassword";
import {
  loadUser,
  setConnections,
  setPersonalRooms,
  updateLoading,
} from "../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ulid } from "ulid";

export default function useCreateNewRoom() {
  const [isOpen, setIsOpen] = useState(false);

  const [roomName, setRoomName] = useState({
    value: "",
    error: "",
  });

  const user = useAppSelector((state) => state.user.user);
  const personalRooms = useAppSelector((state) => state.user.personalRooms);

  const { toast } = useToast();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (roomName.value.trim() !== "")
      setRoomName((prev) => ({ ...prev, error: "" }));
  }, [roomName.value]);

  function validateRoomName() {
    if (roomName.value.trim().length <= 1) {
      setRoomName((prev) => ({
        ...prev,
        error: "Name too short. It needs to have at least 2 characters.",
      }));

      return true;
    }

    const exists = personalRooms.some(
      (item) =>
        item.roomName.trim().toLowerCase() ===
        roomName.value.trim().toLowerCase()
    );

    if (exists) {
      setRoomName((prev) => ({
        ...prev,
        error:
          "A room with this name already exists. Please choose a different name.",
      }));

      return true;
    }
  }

  async function handleCreateRoom() {
    try {
      if (validateRoomName()) return;

      const newRoom = {
        id: ulid(),
        roomName: roomName.value,
        creator: {
          id: user.id,
          name: user.name,
        },
        room_id: await genRandomKey(),
        room_message_secret: await genRandomKey(),
      };

      dispatch(setPersonalRooms([...personalRooms, newRoom]));

      const encryptRoomData = await encryptData(
        [...personalRooms, newRoom],
        user.privateKeyBase64
      );

      setRoomName({ value: "", error: "" });

      if ("error" in encryptRoomData) {
        toast({
          title: "Unexpected Error",
          description:
            "An unexpected error occurred. Please refresh the page and try again.",
          variant: "destructive",
        });

        return;
      }

      await storeItem("personalRooms", JSON.stringify(encryptRoomData));

      setIsOpen(false);

      toast({
        title: "Room Created!",
        description: "Your room is ready. Start inviting others to join!",
      });
    } catch (error) {
      toast({
        title: "Unexpected Error",
        description:
          "An unexpected error occurred. Please refresh the page and try again.",
        variant: "destructive",
      });
    }
  }

  return {
    isOpen,
    setIsOpen,
    roomName,
    setRoomName,
    handleCreateRoom,
  };
}
