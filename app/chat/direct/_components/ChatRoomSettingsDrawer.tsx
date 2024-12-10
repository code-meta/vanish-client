import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  updateAssetExpiry,
  updateTextMessageExpiry,
} from "@/lib/features/chat/chatMessageSlice";
import useHandleChatMessage from "@/lib/hooks/useHandleChatMessage";

const ChatRoomSettingsDrawer = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const roomSettings = useAppSelector(
    (state) => state.chatMessage.roomSettings
  );

  const { handleSendOnEnter } = useHandleChatMessage();

  const dispatch = useAppDispatch();

  return (
    <div>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="pb-28">
          <div className="w-[90%] lg:w-[580px] mx-auto">
            <DrawerHeader className="text-left">
              <DrawerTitle>Customize Room</DrawerTitle>
              <DrawerDescription>
                Adjust settings and control how long messages last with a timer
                in minutes.
              </DrawerDescription>
            </DrawerHeader>

            <div className="px-4 mt-4 flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-2.5">
                <label
                  htmlFor="message-expiry"
                  className="block text-sm font-medium"
                >
                  Message Expiry Time
                </label>

                <Select
                  defaultValue={`${roomSettings.textMessageExpiry}`}
                  onValueChange={(value) => {
                    dispatch(updateTextMessageExpiry(+value));
                  }}
                >
                  <SelectTrigger id="message-expiry" className="w-[180px]">
                    <SelectValue placeholder="Select Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Instant</SelectItem>
                    <SelectItem value="1">1 Minute</SelectItem>
                    <SelectItem value="3">3 Minutes</SelectItem>
                    <SelectItem value="5">5 Minutes</SelectItem>
                    <SelectItem value="10">10 Minutes</SelectItem>
                    <SelectItem value="15">15 Minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-y-2.5">
                <label
                  htmlFor="asset-expiry"
                  className="block text-sm font-medium"
                >
                  File Asset Expiry Duration
                </label>

                <Select
                  defaultValue={`${roomSettings.assetExpiry}`}
                  onValueChange={(value) => {
                    dispatch(updateAssetExpiry(+value));
                  }}
                >
                  <SelectTrigger id="asset-expiry" className="w-[180px]">
                    <SelectValue placeholder="Select Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Minute</SelectItem>
                    <SelectItem value="3">3 Minutes</SelectItem>
                    <SelectItem value="5">5 Minutes</SelectItem>
                    <SelectItem value="10">10 Minutes</SelectItem>
                    <SelectItem value="15">15 Minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="my-4" />

              <div className="flex items-center gap-x-4">
                <Switch
                  id="send-on-enter"
                  defaultChecked={roomSettings.sendOnEnter}
                  onCheckedChange={(value) => {
                    handleSendOnEnter(value);
                  }}
                />
                <label
                  htmlFor="send-on-enter"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Send Text Message on Enter
                </label>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ChatRoomSettingsDrawer;
