import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import React, { useState } from "react";
import ExchangeKeyForm from "./ExchangeKeyForm";
import CopyPublicKey from "./CopyPublicKey";

const ExchangeSection = () => {
  return (
    <div className="mt-12">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-y-8 lg:gap-y-0">
        <div className="w-full lg:w-[400px]">
          <ExchangeKeyForm />
        </div>
        <CopyPublicKey />
      </div>
    </div>
  );
};

export default ExchangeSection;
