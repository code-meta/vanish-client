import { ulid } from "ulid";

import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { encryptData, gen_crypto_box_keypair } from "../crypto";
import { storeItem } from "../db/indexedDb";
import { copyToClipboard } from "../utils";
import usePassword from "./usePassword";
import { loadUser, updateLoading } from "../features/user/userSlice";
import { useAppDispatch } from "../hooks";

export default function useBuildProfile() {
  const [isOpen, setIsOpen] = useState(true);

  const [name, setName] = useState({
    value: "",
    error: "",
  });
  const [password, setPassword] = useState({
    value: "",
    error: "",
  });

  const { toast } = useToast();

  const dispatch = useAppDispatch();

  const { genStrongPassword } = usePassword();

  useEffect(() => {
    setPassword((prev) => ({
      ...prev,
      value: genStrongPassword(),
    }));
  }, []);

  useEffect(() => {
    if (name.value.trim() !== "") setName((prev) => ({ ...prev, error: "" }));

    if (password.value.trim() !== "")
      setPassword((prev) => ({ ...prev, error: "" }));
  }, [name.value, password.value]);

  async function handleCreateProfile() {
    if (name.value.trim() === "") {
      setName((prev) => ({
        ...prev,
        error: "We need a name to move forward. Please type one.",
      }));
      return;
    }

    if (name.value.trim().length <= 1) {
      setName((prev) => ({
        ...prev,
        error: "Name too short. It needs to have at least 2 characters.",
      }));
      return;
    }

    if (password.value.trim() === "") {
      setPassword((prev) => ({
        ...prev,
        error: "Use Auto-Generated Password",
      }));
      return;
    }

    const keys = await gen_crypto_box_keypair();

    const newUser = {
      id: ulid(),
      ...keys,
    };

    const newProfile = {
      name: name.value,
    };

    const encryptUserData = await encryptData(newUser, password.value);

    const encryptProfileData = await encryptData(
      newProfile,
      newUser.privateKeyBase64
    );

    if ("error" in encryptUserData || "error" in encryptProfileData) {
      toast({
        title: "Unexpected Error",
        description:
          "An unexpected error occurred. Please refresh the page and try again.",
        variant: "destructive",
      });

      return;
    }

    await storeItem("userInfo", JSON.stringify(encryptUserData));
    await storeItem("profileInfo", JSON.stringify(encryptProfileData));

    copyToClipboard(password.value);

    dispatch(loadUser({ ...newUser, ...newProfile }));
    dispatch(updateLoading(false));

    setIsOpen(false);

    toast({
      title: "Password Copied!",
      description: "Keep the password somewhere safe.",
    });

    setPassword({
      value: "",
      error: "",
    });
  }

  return {
    isOpen,
    setIsOpen,
    name,
    setName,
    password,
    setPassword,
    handleCreateProfile,
    genStrongPassword,
  };
}
