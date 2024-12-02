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
import { Info, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProfileDialog = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState("");
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
    setPassword(strong_password);
  }, []);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          closeIcon={false}
          closeOnOutside={false}
          className="outline-none w-[95%] md:w-[440px]"
        >
          <DialogHeader className="!text-left">
            <Brand />
            <DialogTitle className="pt-4 text-primary">
              Build Anonymous profile
            </DialogTitle>
            <DialogDescription className="pt-1">
              This information will be used while chatting.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="name" className="font-medium text-sm">
                Your Pseudonym
              </label>
              <Input
                placeholder="Type your pseudonym..."
                id="name"
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="password" className="font-medium text-sm">
                Your Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="Type a very strong password"
                  value={password}
                  autoComplete="off"
                  readOnly
                />
                <button
                  className="absolute right-0 top-0 flex items-center justify-center w-10 h-full cursor-pointer group"
                  onClick={() => setPassword(genStrongPassword())}
                >
                  <RefreshCcw className="text-primary/70 group-hover:text-primary" />
                </button>
              </div>
              <div className="text-muted-foreground w-[95%] flex items-center justify-center gap-x-2">
                <div>
                  <Info className="w-4 h-4" />
                </div>
                <p className="text-sm leading-snug font-medium">
                  This password is auto-generated. Write it down somewhere
                  safe—it’s used to encrypt your private keys.
                </p>
              </div>
            </div>
          </div>

          <div className="text-right">
            <Button variant={"secondary"}>Continue</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileDialog;
