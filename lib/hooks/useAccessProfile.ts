import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { decryptData, encryptData } from "../crypto";
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

export default function useAccessProfile() {
  const [isOpen, setIsOpen] = useState(true);

  const [password, setPassword] = useState({
    value: "",
    error: "",
  });

  const [newPassword, setNewPassword] = useState("");
  const [updatePassword, setUpdatePassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const user = useAppSelector((state) => state.user.user);

  const { toast } = useToast();

  const dispatch = useAppDispatch();

  const { genStrongPassword } = usePassword();

  useEffect(() => {
    if (password.value.trim() !== "")
      setPassword((prev) => ({ ...prev, error: "" }));
  }, [password.value]);

  async function handleAccessProfile() {
    try {
      if (password.value.trim() === "") {
        setPassword((prev) => ({
          ...prev,
          error: "Please enter the Password",
        }));
        return;
      }

      let userInfo;
      let profileInfo;
      let connections;
      let personalRooms;

      const encryptedUserInfo = await getStorageItem("userInfo");
      const encryptedProfileInfo = await getStorageItem("profileInfo");
      const encryptedConnections = await getStorageItem("connections");
      const encryptedPersonalRooms = await getStorageItem("personalRooms");

      if (encryptedUserInfo && encryptedProfileInfo) {
        userInfo = await decryptData(encryptedUserInfo, password.value);

        profileInfo = await decryptData(
          encryptedProfileInfo,
          userInfo.privateKeyBase64
        );
      }

      if (!userInfo) {
        await removeItem("userInfo");
        await removeItem("profileInfo");
      }

      if (encryptedConnections) {
        connections = await decryptData(
          encryptedConnections,
          userInfo.privateKeyBase64
        );
      }

      if (encryptedPersonalRooms) {
        personalRooms = await decryptData(
          encryptedPersonalRooms,
          userInfo.privateKeyBase64
        );
      }

      connections && dispatch(setConnections([...connections]));

      personalRooms && dispatch(setPersonalRooms([...personalRooms]));

      userInfo && dispatch(loadUser({ ...userInfo, ...profileInfo }));

      dispatch(updateLoading(false));

      if (updatePassword) {
        setNewPassword(genStrongPassword());
        setShowNewPassword(true);
        return;
      }

      setIsOpen(false);

      toast({
        title: "Welcome to the safe space",
      });
    } catch (error) {
      toast({
        title:
          "An unexpected error occurred. Please refresh the page and try again.",
        variant: "destructive",
      });
    }
  }

  async function handleCopyUpdatedPassword() {
    copyToClipboard(newPassword);

    const encryptUserData = await encryptData(user, newPassword);

    if ("error" in encryptUserData) {
      toast({
        title: "Unexpected Error",
        description:
          "An unexpected error occurred. Please refresh the page and try again.",
        variant: "destructive",
      });

      return;
    }

    await storeItem("userInfo", JSON.stringify(encryptUserData));

    setIsOpen(false);

    toast({
      title: "Password Copied!",
      description: "Keep the new password somewhere safe.",
    });
  }

  return {
    isOpen,
    setIsOpen,
    newPassword,
    setNewPassword,
    updatePassword,
    setUpdatePassword,
    showNewPassword,
    setShowNewPassword,
    password,
    setPassword,
    handleAccessProfile,
    genStrongPassword,
    handleCopyUpdatedPassword,
  };
}
