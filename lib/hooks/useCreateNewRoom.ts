import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { decryptData, encryptData } from "../crypto";
import { getStorageItem, removeItem, storeItem } from "../db/indexedDb";
import { copyToClipboard } from "../utils";
import usePassword from "./usePassword";
import {
  loadUser,
  setConnections,
  updateLoading,
} from "../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

export default function useCreateNewRoom() {
  const [isOpen, setIsOpen] = useState(false);

  const [roomName, setRoomName] = useState({
    value: "",
    error: "",
  });

  const user = useAppSelector((state) => state.user.user);

  const { toast } = useToast();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (roomName.value.trim() !== "")
      setRoomName((prev) => ({ ...prev, error: "" }));
  }, [roomName.value]);

  async function handleCreateRoom() {
    // if ("error" in encryptUserData) {
    //   toast({
    //     title: "Unexpected Error",
    //     description: "Something went wrong, please refresh the page.",
    //     variant: "destructive",
    //   });

    //   return;
    // }

    setIsOpen(false);

    toast({
      title: "Room Created!",
      description: "Keep the new password somewhere safe.",
    });
  }

  return {
    isOpen,
    setIsOpen,
    roomName,
    setRoomName,
    handleCreateRoom,
  };
}
