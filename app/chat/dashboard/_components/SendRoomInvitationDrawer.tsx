import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Antenna } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { PersonalRoom } from "@/lib/types";
import { useAppSelector } from "@/lib/hooks";
import InfoMessageText from "./InfoMessageText";

const SendRoomInvitationDrawer = ({
  isOpen,
  setIsOpen,
  room,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  room: PersonalRoom;
}) => {
  const connections = useAppSelector((state) => state.user.connections);

  return (
    <div>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="pb-16">
          <div className="w-[90%] lg:w-[580px] mx-auto">
            <DrawerHeader className="text-left">
              <DrawerTitle>Send Invitations</DrawerTitle>
              <DrawerDescription>
                Choose who you'd like to invite to this room.
              </DrawerDescription>
            </DrawerHeader>

            {connections.length <= 0 && (
              <div className="px-4 mt-4">
                <InfoMessageText text="No connected friends found. Start building your connections!" />
              </div>
            )}

            {connections.length >= 1 && (
              <div className="px-4 mt-4">
                <Button variant={"outline"}>
                  <span>Send Invitations to All</span>
                  <Antenna className="ml-4 text-primary" />
                </Button>

                <Separator className="my-4" />

                <ScrollArea className="h-40">
                  <div className="flex flex-col gap-y-4">
                    {connections.map((item) => (
                      <div
                        className="flex items-center space-x-2"
                        key={item.id}
                      >
                        <Checkbox
                          id="terms"
                          onCheckedChange={(value) => {
                            if (value) {
                              // sendInvitation
                            }
                          }}
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {item.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SendRoomInvitationDrawer;
