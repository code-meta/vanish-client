import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";

export default function useHandleNameEdit() {
  const user = useAppSelector((state) => state.user.user);

  const [name, setName] = useState(user.name);
  const [readOnly, setReadOnly] = useState(true);

  const [width, setWidth] = useState(0);

  const measureTextWidth = (text: string) => {
    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.whiteSpace = "nowrap";
    span.style.font = "inherit";
    span.textContent = text;
    document.body.appendChild(span);
    const textWidth = span.offsetWidth;
    document.body.removeChild(span);
    return textWidth;
  };

  useEffect(() => {
    setWidth(measureTextWidth(name) + 4);
  }, [name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);

    const textWidth = measureTextWidth(e.target.value);
    setWidth(textWidth + 4);
  };

  function updateName() {}

  return { name, handleChange, width, readOnly, setReadOnly };
}
