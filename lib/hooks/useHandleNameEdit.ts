import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { measureTextWidth } from "../utils";
import { useToast } from "@/hooks/use-toast";
import { loadUser } from "../features/user/userSlice";
import { encryptData } from "../crypto";
import { storeItem } from "../db/indexedDb";

export default function useHandleNameEdit() {
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  const { toast } = useToast();

  const [name, setName] = useState(user.name);

  const [readOnly, setReadOnly] = useState(true);

  const [width, setWidth] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setWidth(measureTextWidth(name));
  }, [name]);

  async function updateName(value: string) {
    try {
      dispatch(loadUser({ ...user, name: value }));

      const encryptProfileData = await encryptData(
        { name: value },
        user.privateKeyBase64
      );

      if ("error" in encryptProfileData) {
        throw new Error("This is a custom error");
      }

      await storeItem("profileInfo", JSON.stringify(encryptProfileData));
    } catch (error) {
      toast({
        title: "Unexpected Error",
        description:
          "An unexpected error occurred. Please refresh the page and try again.",
        variant: "destructive",
      });
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setName(value);

    const textWidth = measureTextWidth(value);

    setWidth(textWidth);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (value.trim() === "" || value.trim().length <= 1) {
      timeoutRef.current = setTimeout(() => {
        toast({
          title: "Name too short. It needs to have at least 2 characters.",
          variant: "destructive",
        });
      }, 1000);

      return;
    }

    if (value.trim().length > 18) {
      timeoutRef.current = setTimeout(() => {
        toast({
          title: "Name too long. It needs to be less than 18 characters.",
          variant: "destructive",
        });
      }, 1000);

      return;
    }

    updateName(value);
  };

  function handleOnBlur() {
    setReadOnly(true);

    if (name.trim() === "" || name.trim().length <= 1) {
      setName(user.name);
    }
  }

  return {
    name,
    setName,
    handleChange,
    handleOnBlur,
    width,
    readOnly,
    setReadOnly,
    user,
  };
}
