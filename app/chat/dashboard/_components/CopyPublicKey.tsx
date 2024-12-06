import useHandleCopyPublicKey from "@/lib/hooks/useHandleCopyPublicKey";
import { Copy, RefreshCcw } from "lucide-react";
import React from "react";

const CopyPublicKey = () => {
  const { sharePublicKey, copySharePublicKey } = useHandleCopyPublicKey();
  return (
    <div className="flex items-center gap-x-6 bg-card py-2 w-full lg:w-max px-2 rounded-lg justify-between">
      <div className="flex items-center">
        <span className="pr-2 font-medium text-sm">Your Public Key:</span>
        <span className="text-muted-foreground block lg:w-48 w-24 overflow-hidden text-ellipsis whitespace-nowrap font-bold font-code">
          {sharePublicKey}
        </span>
      </div>
      <div className="flex items-center gap-x-3">
        <Copy
          className="w-5 h-5 text-primary/70 hover:text-primary cursor-pointer"
          onClick={() => copySharePublicKey()}
        />
        <RefreshCcw className="w-5 h-5 text-primary/70 hover:text-primary cursor-pointer" />
      </div>
    </div>
  );
};

export default CopyPublicKey;
