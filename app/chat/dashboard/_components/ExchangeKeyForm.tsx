import { Input } from "@/components/ui/input";
import useHandleConnection from "@/lib/hooks/useHandleConnection";
import { Info } from "lucide-react";
import React, { useState } from "react";

const ExchangeKeyForm = () => {
  const { foreignPublicKey, setForeignPublicKey, handlePublicKeyExchange } =
    useHandleConnection();

  return (
    <form onSubmit={handlePublicKeyExchange}>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="publicKey" className="font-medium text-sm">
          Connect a Friend
        </label>
        <div className="relative">
          <Input
            id="publicKey"
            placeholder="Paste your friend’s public key here"
            value={foreignPublicKey.value}
            autoComplete="off"
            onChange={(e) =>
              setForeignPublicKey((prev) => ({
                ...prev,
                value: e.target.value,
              }))
            }
          />
          {foreignPublicKey.error && (
            <p className="text-rose-600 font-medium mt-2">
              {foreignPublicKey.error}
            </p>
          )}
        </div>
        <div className="text-muted-foreground w-[95%] flex items-center gap-x-2">
          <div>
            <Info className="w-4 h-4" />
          </div>
          <p className="text-sm leading-snug font-medium">
            Press Enter once you paste the key.
          </p>
        </div>
      </div>
    </form>
  );
};

export default ExchangeKeyForm;
