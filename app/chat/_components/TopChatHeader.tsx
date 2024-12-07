import Brand from "@/components/shared/icons/Brand";
import { Cog } from "lucide-react";
import React from "react";

const TopChatHeader = () => {
  return (
    <div className="flex items-center justify-between py-4 bg-background">
      <Brand />

      <div className="text-muted-foreground">
        <Cog />
      </div>
    </div>
  );
};

export default TopChatHeader;
