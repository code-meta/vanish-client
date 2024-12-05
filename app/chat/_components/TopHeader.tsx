import Brand from "@/components/shared/icons/Brand";
import { useAppSelector } from "@/lib/hooks";
import { Pencil } from "lucide-react";
import React from "react";

const TopHeader = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="flex items-center justify-between py-4">
      <Brand />
      <div className="flex items-center gap-x-4 text-muted-foreground">
        <span className="font-medium font-roboto">{user.name}</span>
        <Pencil className="w-4 h-4" />
      </div>
    </div>
  );
};

export default TopHeader;
