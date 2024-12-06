import Brand from "@/components/shared/icons/Brand";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/lib/hooks";
import useHandleNameEdit from "@/lib/hooks/useHandleNameEdit";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import React, { useRef, useState } from "react";

const TopHeader = () => {
  const { name, handleChange, width, readOnly, setReadOnly } =
    useHandleNameEdit();

  const inputRef = useRef<null | HTMLInputElement>(null);

  return (
    <div className="flex items-center justify-between py-4">
      <Brand />
      <div className="flex items-center gap-x-1.5 text-muted-foreground">
        <Input
          ref={inputRef}
          style={{ width: `${width}px` }}
          className={cn(
            "font-medium font-roboto !p-0 h-max rounded-none outline-none border-transparent focus-visible:ring-0 focus-visible:border-b-primary disabled:cursor-text disabled:!opacity-100"
          )}
          value={name}
          readOnly={readOnly}
          disabled={readOnly}
          onChange={handleChange}
          onBlur={() => setReadOnly(true)}
        />
        <Pencil
          className="w-4 h-4 hover:text-primary cursor-pointer"
          onClick={() => {
            setReadOnly(false);
            if (!inputRef.current) return;
            inputRef.current.disabled = false;
            inputRef.current.focus();
          }}
        />
      </div>
    </div>
  );
};

export default TopHeader;
