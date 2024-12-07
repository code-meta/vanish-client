import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { Message, SelectedChatRoom } from "@/lib/types";

interface chatMessageState {
  loading: boolean;
  selectedChatRoom: SelectedChatRoom | null;
}

const initialState: chatMessageState = {
  loading: true,
  selectedChatRoom: null,
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
  },
});

export const { setSelectedChatRoom, updateMessages } = chatMessageSlice.actions;

export const selectChatMessage = (state: RootState) => state.chatMessage;

export default chatMessageSlice.reducer;
