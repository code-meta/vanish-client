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
    span.style.color = "white";
    span.style.font = "inherit";
    span.style.display = "inline-block";
    span.style.width = "max-content";
    span.style.fontSize = "14px";
    span.textContent = text.trim();
    document.body.appendChild(span);
    const textWidth = span.offsetWidth;
    document.body.removeChild(span);

    return textWidth;
  };

  useEffect(() => {
    setWidth(measureTextWidth(name));
  }, [name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);

    const textWidth = measureTextWidth(e.target.value);
    setWidth(textWidth);
  };

  function updateName() {}

  return { name, handleChange, width, readOnly, setReadOnly };
}
