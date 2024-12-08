import Brand from "@/components/shared/icons/Brand";
import { Cog } from "lucide-react";
import React, { useState } from "react";
import ChatRoomSettingsDrawer from "../direct/_components/ChatRoomSettingsDrawer";

const TopChatHeader = ({ name }: { name: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center justify-between py-4 bg-background relative">
      <div className="text-xs font-roboto font-medium uppercase text-muted-foreground">
        {name}
      </div>

      <ChatRoomSettingsDrawer isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="text-muted-foreground cursor-pointer">
        <Cog onClick={() => setIsOpen(true)} />
      </div>
    </div>
  );
};

export default TopChatHeader;
