import Brand from "@/components/shared/icons/Brand";
import { Cog } from "lucide-react";
import React from "react";

const TopChatHeader = ({ name }: { name: string }) => {
  return (
    <div className="flex items-center justify-between py-4 bg-background relative">
      <div className="text-xs font-roboto font-medium uppercase text-muted-foreground">
        {name}
      </div>

      <div className="text-muted-foreground">
        <Cog />
      </div>
    </div>
  );
};

export default TopChatHeader;
