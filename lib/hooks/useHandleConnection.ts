import generator from "generate-password";
import { FormEvent, useState } from "react";
import { create_new_connection } from "../crypto";
import { useAppSelector } from "../hooks";

export default function useHandleConnection() {
  const [foreignPublicKey, setForeignPublicKey] = useState({
    value: "",
    error: "",
  });

  const user = useAppSelector((state) => state.user.user);

  function addConnectionWithPublicKey() {}

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

      console.log("done.....");
      console.log(newConnection);
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
