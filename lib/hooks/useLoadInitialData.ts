import generator from "generate-password";
import { getStorageItem } from "../db/indexedDb";
import { useEffect, useState } from "react";

export default function useLoadInitialData() {
  const [userExists, setUserExists] = useState(true);
  const [loading, setLoading] = useState(false);

  async function checkUserInfo() {
    getStorageItem("userInfo")
      .then((encryptedUserInfo) => {
        if (encryptedUserInfo) {
          setUserExists(true);
        } else {
          setUserExists(false);
        }
      })
      .catch(() => {
        setUserExists(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    checkUserInfo();
  }, []);

  return { userExists, loading };
}
