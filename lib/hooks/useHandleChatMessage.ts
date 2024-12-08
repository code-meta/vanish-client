import { useAppDispatch, useAppSelector } from "../hooks";
import { useState } from "react";
import {
  updateMessages,
  updateSendOnEnter,
} from "../features/chat/ChatMessageSlice";
import { Message } from "../types";
import { ulid } from "ulid";

export default function useHandleChatMessage() {
  const [textMessage, setTextMessage] = useState("");

  const user = useAppSelector((state) => state.user.user);

  const messages = useAppSelector(
    (state) => state.chatMessage.selectedChatRoom?.Message
  );

  const dispatch = useAppDispatch();

  function scrollToView(id: string) {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  function submitTextMessage() {
    if (!messages || textMessage.trim() === "") return;

    const newMessage: Message = {
      id: ulid(),
      creator_name: user.name,
      creator_id: user.id,
      messagePayload: { type: "TEXT", content: textMessage },
      created_at: new Date().toISOString(),
    };

    dispatch(updateMessages([...messages, newMessage]));

    scrollToView("chatBoard");

    setTextMessage("");
  }

  function setSendOnEnter() {
    let onEnter = localStorage.getItem("onEnter");

    if (onEnter === null) {
      localStorage.setItem("onEnter", "true");
      onEnter = "true";
    }

    dispatch(updateSendOnEnter(JSON.parse(onEnter)));
  }

  function handleSendOnEnter(value: boolean) {
    localStorage.setItem("onEnter", JSON.stringify(value));

    dispatch(updateSendOnEnter(value));
  }

  return {
    textMessage,
    setTextMessage,
    submitTextMessage,
    setSendOnEnter,
    handleSendOnEnter,
  };
}
