"use client";

import React, { useEffect } from "react";
import ProfileDialog from "./ProfileDialog";
import { getStorageItem } from "@/lib/db/indexedDb";
import LoginDialog from "./LoginDialog";
import useLoadInitialData from "@/lib/hooks/useLoadInitialData";

const InitialPropmts = () => {
  const { loading, userExists } = useLoadInitialData();

  return (
    <div>{!loading && userExists ? <LoginDialog /> : <ProfileDialog />}</div>
  );
};

export default InitialPropmts;
