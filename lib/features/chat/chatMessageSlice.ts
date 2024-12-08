import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { Message, SelectedChatRoom } from "@/lib/types";

interface chatMessageState {
  loading: boolean;
  selectedChatRoom: SelectedChatRoom | null;
  roomExpirationSettings: {
    textMessageExpiry: number;
    assetExpiry: number;
  };
}

const initialState: chatMessageState = {
  loading: true,
  selectedChatRoom: null,

  roomExpirationSettings: {
    textMessageExpiry: 3,
    assetExpiry: 5,
  },
};

export const chatMessageSlice = createSlice({
  name: "chatMessage",
  initialState,
  reducers: {
    setSelectedChatRoom: (state, action: PayloadAction<SelectedChatRoom>) => {
      state.selectedChatRoom = action.payload;
    },

    updateMessages: (state, action: PayloadAction<Message[]>) => {
      if (!state.selectedChatRoom) return;
      state.selectedChatRoom.Message = [...action.payload];
    },

    updateTextMessageExpiry: (state, action: PayloadAction<number>) => {
      state.roomExpirationSettings.textMessageExpiry = action.payload;
    },

    updateAssetExpiry: (state, action: PayloadAction<number>) => {
      state.roomExpirationSettings.assetExpiry = action.payload;
    },
  },
});

export const {
  setSelectedChatRoom,
  updateMessages,
  updateTextMessageExpiry,
  updateAssetExpiry,
} = chatMessageSlice.actions;

export const selectChatMessage = (state: RootState) => state.chatMessage;

export default chatMessageSlice.reducer;
