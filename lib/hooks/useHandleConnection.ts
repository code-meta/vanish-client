import { FormEvent, useState } from "react";
import { create_new_connection, encryptData } from "../crypto";
import { useAppDispatch, useAppSelector } from "../hooks";
import { updateConnections } from "../features/user/userSlice";
import { getStorageItem, storeItem } from "../db/indexedDb";
import { useToast } from "@/hooks/use-toast";

export default function useHandleConnection() {
  const [foreignPublicKey, setForeignPublicKey] = useState({
    value: "",
    error: "",
  });

  const { toast } = useToast();

  const user = useAppSelector((state) => state.user.user);
  const connections = useAppSelector((state) => state.user.connections);

  const dispatch = useAppDispatch();

  async function handlePublicKeyExchange(e: FormEvent) {
    if (!user.privateKeyBase64) return;

    e.preventDefault();

    const [foreignPublicKeyBase64, sharedIdBase64, sharedNameBase64] =
      foreignPublicKey.value.split(".");

    if (foreignPublicKey.value.trim() === "") {
      setForeignPublicKey((prev) => ({
        ...prev,
        error: "Please Enter the public key",
      }));
      return;
    }

    if (
      !sharedIdBase64 ||
      !sharedNameBase64 ||
      !foreignPublicKeyBase64 ||
      foreignPublicKeyBase64 === user.publicKeyBase64
    ) {
      setForeignPublicKey({
        value: "",
        error:
          "Something went wrong with the key. Ensure you're using your friend's correct public key.",
      });

      return;
    }

    try {
      const { newConnection } = await create_new_connection(
        sharedIdBase64,
        sharedNameBase64,
        foreignPublicKeyBase64,
        user.privateKeyBase64
      );

      const exists = connections.some((item) => item.id === newConnection.id);

      if (exists) {
        toast({
          title: `${newConnection.name} is already Added`,
        });

        setForeignPublicKey({ value: "", error: "" });

        return;
      }

      const storedConnections = await getStorageItem("connections");

      if (!storedConnections) {
        const encryptedConnections = await encryptData(
          [newConnection],
          user.privateKeyBase64
        );
        await storeItem("connections", JSON.stringify(encryptedConnections));
      } else {
        const encryptedConnections = await encryptData(
          [...connections, newConnection],
          user.privateKeyBase64
        );
        await storeItem("connections", JSON.stringify(encryptedConnections));
      }

      dispatch(updateConnections(newConnection));

      setForeignPublicKey({ value: "", error: "" });

      toast({
        title: `${newConnection.name} is Added`,
        description: `You can start messaging!`,
      });
    } catch (error) {
      setForeignPublicKey({
        value: "",
        error:
          "Something went wrong with the key. Ensure you're using your friend's correct public key.",
      });
    }
  }

  return { handlePublicKeyExchange, foreignPublicKey, setForeignPublicKey };
}
