"use client";

import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Brand from "@/components/shared/icons/Brand";
import { Input } from "@/components/ui/input";

import generator from "generate-password";
import { Copy, Info, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { initIDB } from "@/lib/indexedDb";

const LoginDialog = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [updatePassword, setUpdatePassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [password, setPassword] = useState("");

  function genStrongPassword() {
    const strong_password = generator.generate({
      length: 12,
      numbers: true,
      uppercase: true,
      lowercase: true,
      strict: true,
    });
    return strong_password;
  }

  useEffect(() => {
    const strong_password = genStrongPassword();

    (async () => {
      await initIDB();
    })();
  }, []);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          closeIcon={false}
          closeOnOutside={false}
          className="outline-none w-[95%] md:w-[440px]"
        >
          <VisuallyHidden.Root>
            <DialogHeader className="!text-left">
              <Brand />
              <DialogTitle className="pt-4 text-primary">
                Access Anonymous profile
              </DialogTitle>
              <DialogDescription className="pt-1">
                This information will be used while chatting.
              </DialogDescription>
            </DialogHeader>
          </VisuallyHidden.Root>

          {!showNewPassword ? (
            <div>
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="password" className="font-medium text-sm">
                    Your Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="Enter the password here"
                      value={password}
                      autoComplete="off"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="text-muted-foreground w-[95%] flex items-center gap-x-2">
                    <div>
                      <Info className="w-4 h-4" />
                    </div>
                    <p className="text-sm leading-snug font-medium">
                      Enter the password you chose when creating this profile.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-y-2 mt-2">
                  <div className="flex items-center gap-x-2">
                    <Switch
                      id="update-password"
                      checked={updatePassword}
                      onCheckedChange={() => setUpdatePassword(!updatePassword)}
                    />
                    <label
                      htmlFor="update-password"
                      className="text-muted-foreground"
                    >
                      Update Password
                    </label>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <Button
                  variant={"secondary"}
                  onClick={() => {
                    setNewPassword(genStrongPassword());
                    setShowNewPassword(true);
                  }}
                >
                  Continue
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <div className="bg-accent px-4 flex items-center gap-x-4 py-1.5 rounded-full w-32">
                  <p className="w-20 text-ellipsis overflow-hidden text-accent-foreground">
                    {newPassword}
                  </p>
                </div>

                <div className="text-muted-foreground w-[95%] flex items-center gap-x-2 mt-4">
                  <div>
                    <Info className="w-4 h-4" />
                  </div>
                  <p className="text-sm leading-snug font-medium">
                    Copy and Write Down the Password.
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Button variant={"secondary"}>
                  Copy
                  <Copy className="text-primary/70 hover:text-primary cursor-pointer" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginDialog;
