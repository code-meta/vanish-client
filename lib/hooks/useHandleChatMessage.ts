import { useAppDispatch, useAppSelector } from "../hooks";
import { useState } from "react";
import {
  updateMessages,
  updateSendOnEnter,
} from "../features/chat/chatMessageSlice";
import { Message } from "../types";
import { ulid } from "ulid";
import { Channel } from "phoenix";
import useServices from "./useServices";

export default function useHandleChatMessage(params: {
  channelRef: React.MutableRefObject<Channel | null>;
}) {
  const [textMessage, setTextMessage] = useState("");

  const user = useAppSelector((state) => state.user.user);

  const { scrollToView } = useServices();

  const messages = useAppSelector((state) => state.chatMessage.roomMessages);

  const [selectedFiles, setSelectedFiles] = useState<
    { id: string; file: File }[]
  >([]);

  const dispatch = useAppDispatch();

  function submitTextMessage() {
    if (!messages || textMessage.trim() === "") return;

    const newMessage: Message = {
      id: ulid(),
      creator_name: user.name,
      creator_id: user.id,
      messagePayload: {
        type: "TEXT",
        content: textMessage,
        iv: "x",
        salt: "kk",
      },
      created_at: new Date().toISOString(),
    };

    dispatch(updateMessages(newMessage));

    setTextMessage("");

    scrollToView("chatBoard");

    const channelRef = params.channelRef.current;

    if (!channelRef) return;

    channelRef.push("new_msg", { body: newMessage });
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

  function handleFileUploadSelect(files: File[]) {
    const filesList = files.map((item) => {
      return { id: ulid(), file: item };
    });

    setSelectedFiles((prev) => [...prev, ...filesList]);
  }

  function handleRemoveSelectedFile(id: string) {
    const filesList = selectedFiles.filter((item) => item.id !== id);

    setSelectedFiles(() => [...filesList]);
  }

  function submitFileUpload() {
    console.log("file uploaded");
    setSelectedFiles([]);
  }

  return {
    textMessage,
    setTextMessage,
    submitTextMessage,
    setSendOnEnter,
    handleSendOnEnter,
    handleFileUploadSelect,
    selectedFiles,
    submitFileUpload,
    handleRemoveSelectedFile,
  };
}
