import generator from "generate-password";
import { useAppSelector } from "../hooks";
import { to_base64_for_string } from "../crypto";
import { useEffect, useState } from "react";
import { copyToClipboard } from "../utils";
import { useToast } from "@/hooks/use-toast";

export default function useHandleCopyPublicKey() {
  const user = useAppSelector((state) => state.user.user);

  const [sharePublicKey, setSharePublicKey] = useState(
    "HA3b1nHtIuICBQlGNPXEY5-Bu5WFQKjPvBRjp5DxsQM"
  );

  const { toast } = useToast();

  async function genSharePublicKey() {
    if (!user.id) return;

    const { base64Value: name } = await to_base64_for_string(user.name);
    const { base64Value: id } = await to_base64_for_string(user.id);

    setSharePublicKey(`${user.publicKeyBase64}.${id}.${name}`);
  }

  function copySharePublicKey() {
    copyToClipboard(sharePublicKey);

    toast({
      title: "Key copied",
      description: "Share this public key with your friend and exchange.",
    });
  }

  useEffect(() => {
    (async () => {
      genSharePublicKey();
    })();
  }, [user.name]);

  return { sharePublicKey, copySharePublicKey };
}
