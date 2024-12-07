"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Brand from "@/components/shared/icons/Brand";
import { Input } from "@/components/ui/input";

import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import useCreateNewRoom from "@/lib/hooks/useCreateNewRoom";

const CreateRoomDialog = () => {
  const { isOpen, setIsOpen, roomName, setRoomName, handleCreateRoom } =
    useCreateNewRoom();

  return (
    <div>
      <Button variant={"outline"} onClick={() => setIsOpen(true)}>
        Create a new room
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="outline-none w-[95%] md:w-[440px]"
        >
          <VisuallyHidden.Root>
            <DialogHeader className="!text-left">
              <Brand />
              <DialogTitle className="pt-4 text-primary">
                Create a new profile
              </DialogTitle>
              <DialogDescription className="pt-1">
                This information will be used while chatting.
              </DialogDescription>
            </DialogHeader>
          </VisuallyHidden.Root>

          <div>
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <label htmlFor="newRoom" className="font-medium text-sm">
                  Room Name
                </label>
                <div className="relative">
                  <Input
                    id="newRoom"
                    placeholder="Type your room name..."
                    value={roomName.value}
                    autoComplete="off"
                    onChange={(e) =>
                      setRoomName((prev) => ({
                        ...prev,
                        value: e.target.value,
                      }))
                    }
                  />
                  {roomName.error && (
                    <p className="text-rose-600 font-medium mt-2">
                      {roomName.error}
                    </p>
                  )}
                </div>
                <div className="text-muted-foreground w-[95%] flex items-center gap-x-2">
                  <div>
                    <Info className="w-4 h-4" />
                  </div>
                  <p className="text-sm leading-snug font-medium">
                    Keep it short and mysterious
                  </p>
                </div>
              </div>
            </div>

            <div className="text-right">
              <Button variant={"secondary"} onClick={() => handleCreateRoom()}>
                Create Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateRoomDialog;
