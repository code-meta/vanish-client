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
import { encryptData } from "../crypto";
import { api } from "../api";

export default function useHandleChatMessage(params: {
  channelRef: React.MutableRefObject<Channel | null>;
}) {
  const [textMessage, setTextMessage] = useState("");

  const user = useAppSelector((state) => state.user.user);

  const { scrollToView } = useServices();

  const messages = useAppSelector((state) => state.chatMessage.roomMessages);
  const selectedChatRoom = useAppSelector(
    (state) => state.chatMessage.selectedChatRoom
  );

  const [selectedFiles, setSelectedFiles] = useState<
    { id: string; file: File }[]
  >([]);

  const dispatch = useAppDispatch();

  async function submitTextMessage() {
    if (!selectedChatRoom || !messages || textMessage.trim() === "") return;

    const from_room_id = `${
      selectedChatRoom.room.id
    }.${selectedChatRoom.room.messageSecret.slice(0, 8)}`;

    let newMessage: Message = {
      msg_id: ulid(),
      creator_name: user.name,
      creator_id: user.id,
      from_room_id,
      message_payload: {
        type: "TEXT",
        content: textMessage,
      },
      expiry: new Date(Date.now() + 3 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString(),
    };

    dispatch(updateMessages(newMessage));

    setTextMessage("");

    scrollToView("chatBoard");

    const { error, iv, data, salt } = await encryptData(
      { data: textMessage },
      selectedChatRoom.room.messageSecret
    );

    if (error) return;

    const channelRef = params.channelRef.current;

    if (!channelRef) return;

    let encryptedMessage = JSON.parse(JSON.stringify(newMessage));

    encryptedMessage.message_payload.iv = iv;
    encryptedMessage.message_payload.salt = salt;

    if (encryptedMessage.message_payload.type === "TEXT" && data) {
      encryptedMessage.message_payload.content = data;
    }

    //! broadcast
    channelRef.push("new_msg", {
      body: encryptedMessage,
    });

    // ! save

    api
      .post("/chats/create_message", {
        ...encryptedMessage,
        expiry: 5,
      })
      .then((res) => {
        console.log("saved message", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
