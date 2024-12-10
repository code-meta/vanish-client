import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { Message, SelectedChatRoom } from "@/lib/types";

interface chatMessageState {
  loading: boolean;
  selectedChatRoom: SelectedChatRoom | null;
  roomSettings: {
    textMessageExpiry: number;
    assetExpiry: number;
    sendOnEnter: boolean;
  };
  roomMessages: Message[];
}

const initialState: chatMessageState = {
  loading: true,
  selectedChatRoom: null,

  roomSettings: {
    textMessageExpiry: 3,
    assetExpiry: 5,
    sendOnEnter: true,
  },

  roomMessages: [],
};

export const chatMessageSlice = createSlice({
  name: "chatMessage",
  initialState,
  reducers: {
    setSelectedChatRoom: (state, action: PayloadAction<SelectedChatRoom>) => {
      state.selectedChatRoom = action.payload;
    },

    updateMessages: (state, action: PayloadAction<Message>) => {
      if (!state.selectedChatRoom) return;
      state.roomMessages.push(action.payload);
    },

    updateTextMessageExpiry: (state, action: PayloadAction<number>) => {
      state.roomSettings.textMessageExpiry = action.payload;
    },

    updateAssetExpiry: (state, action: PayloadAction<number>) => {
      state.roomSettings.assetExpiry = action.payload;
    },

    updateSendOnEnter: (state, action: PayloadAction<boolean>) => {
      state.roomSettings.sendOnEnter = action.payload;
    },
  },
});

export const {
  setSelectedChatRoom,
  updateMessages,
  updateTextMessageExpiry,
  updateAssetExpiry,
  updateSendOnEnter,
} = chatMessageSlice.actions;

export const selectChatMessage = (state: RootState) => state.chatMessage;

export default chatMessageSlice.reducer;
