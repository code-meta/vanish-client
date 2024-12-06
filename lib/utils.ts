import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function copyToClipboard(value: string) {
  navigator.clipboard
    .writeText(value)
    .then(() => {
      console.log("Text copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}


export const measureTextWidth = (text: string) => {
  const span = document.createElement("span");
  span.style.visibility = "hidden";
  span.style.whiteSpace = "nowrap";
  span.style.color = "white";
  span.style.font = "inherit";
  span.style.display = "inline-block";
  span.style.width = "max-content";
  span.style.fontSize = "14px";
  span.textContent = text;
  document.body.appendChild(span);
  const textWidth = span.offsetWidth;
  document.body.removeChild(span);

  return textWidth;
};