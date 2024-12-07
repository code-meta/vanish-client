import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send } from "lucide-react";
import React from "react";


// ! use this pattern for the websocket link CrUMzBdRKGH31ICm9gRAQEOK0tkZ3w-_rCL3GXVl-DI-sharedSecretKy 

const ChatInputBox = () => {
  return (
    <div className="max-w-3xl w-full px-4 mx-auto min-h-20 bg-card pt-2 rounded-sm">
      <Textarea
        placeholder="Start typing your message..."
        className="px-0 mx-0 border-none focus-visible:ring-0 resize-none scrollbar-transparent !h-[56px] min-h-0"
      />
      <div className="flex justify-between items-center py-4">
        <Paperclip className="text-muted-foreground cursor-pointer" />
        <Send className="text-primary cursor-pointer" />
      </div>
    </div>
  );
};

export default ChatInputBox;
