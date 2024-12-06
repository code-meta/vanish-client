import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { measureTextWidth } from "../utils";
import { useToast } from "@/hooks/use-toast";
import { loadUser } from "../features/user/userSlice";

export default function useHandleNameEdit() {
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  const { toast } = useToast();

  const [name, setName] = useState(user.name);

  const [readOnly, setReadOnly] = useState(true);

  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(measureTextWidth(name));
  }, [name]);

  function updateName() {
    dispatch(loadUser({ ...user, name }));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setName(value);

    const textWidth = measureTextWidth(value);

    setWidth(textWidth);

    if (value.trim() === "" || value.trim().length <= 1) {
      toast({
        title: "Name too short. It needs to have at least 2 characters.",
        variant: "destructive",
      });

      return;
    }

    updateName();
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
