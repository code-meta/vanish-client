import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/lib/hooks";
import useHandleChatMessage from "@/lib/hooks/useHandleChatMessage";
import { Paperclip, Send } from "lucide-react";
import React from "react";

// ! use this pattern for the websocket link CrUMzBdRKGH31ICm9gRAQEOK0tkZ3w-_rCL3GXVl-DI-sharedSecretKy

const ChatInputBox = () => {
  const {
    textMessage,
    setTextMessage,
    submitTextMessage,
    handleFileUploadSelect,
    selectedFiles,
    submitFileUpload,
  } = useHandleChatMessage();

  const roomSettings = useAppSelector(
    (state) => state.chatMessage.roomSettings
  );

  return (
    <div className="max-w-3xl w-full px-4 mx-auto min-h-20 bg-card pt-2 rounded-sm">
      {selectedFiles.length <= 0 && (
        <Textarea
          placeholder="Start typing your message..."
          className="px-0 mx-0 border-none focus-visible:ring-0 resize-none scrollbar-transparent !h-[56px] min-h-0"
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && roomSettings.sendOnEnter) {
              e.preventDefault();
              submitTextMessage();
            }
          }}
        />
      )}

      {selectedFiles.length >= 1 && (
        <>
          {selectedFiles.map(({ name, type }, i) => {
            const fileName = name.split(".").slice(0, -1).join(".");

            const extension = name.substring(name.lastIndexOf(".") + 1);

            const displayName = `${fileName.slice(0, 18)}${
              fileName.length > 18 && ".."
            }.${extension}`;

            return (
              <div
                key={name + i}
                className="bg-background border border-border w-max px-4 py-1 rounded-full"
              >
                <p className="text-muted-foreground">{displayName}</p>
              </div>
            );
          })}
        </>
      )}

      <div className="flex justify-between items-center py-4">
        <input
          type="file"
          multiple
          id="uploadFilesInput"
          className="w-0 h-0 overflow-hidden absolute opacity-0"
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              handleFileUploadSelect([...files]);
            }
          }}
        />

        <label htmlFor="uploadFilesInput">
          <Paperclip className="text-muted-foreground cursor-pointer" />
        </label>

        {selectedFiles.length >= 1 ? (
          <Send
            className="text-red-950 cursor-pointer"
            onClick={() => {
              submitFileUpload();
            }}
          />
        ) : (
          <Send
            className="text-primary cursor-pointer"
            onClick={() => {
              submitTextMessage();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ChatInputBox;
