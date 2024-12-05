import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { decryptData, encryptData } from "../crypto";
import { getStorageItem, storeItem } from "../db/indexedDb";
import { copyToClipboard } from "../utils";
import usePassword from "./usePassword";
import { loadUser, updateLoading } from "../features/user/userSlice";
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
    // handleAccessProfile();
  }, []);

  useEffect(() => {
    if (password.value.trim() !== "")
      setPassword((prev) => ({ ...prev, error: "" }));
  }, [password.value]);

  async function handleAccessProfile() {
    if (password.value.trim() === "") {
      setPassword((prev) => ({
        ...prev,
        error: "Please enter the Password",
      }));
      return;
    }

    const encryptUserInfo = await getStorageItem("userInfo");

    const userInfo = await decryptData(encryptUserInfo, password.value);

    dispatch(loadUser({ ...userInfo }));
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
  }

  async function handleCopyUpdatedPassword() {
    copyToClipboard(newPassword);

    const encryptUserData = await encryptData(user, newPassword);

    if ("error" in encryptUserData) {
      toast({
        title: "Unexpected Error",
        description: "Something went wrong, please refresh the page.",
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
