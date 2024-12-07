import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { Connection, PersonalRoom, SelectedChatRoom } from "@/lib/types";

interface chatMessageState {
  loading: boolean;
  selectedChatRoom: SelectedChatRoom;
}

// type User = Omit<userState, "loading">["user"];

// Define the initial state using that type
const initialState: chatMessageState = {
  loading: true,
  selectedChatRoom: {
    type: "DIRECT",
    roomId: "room123",
    room: {
      id: "room123",
      roomName: "Private Chat",
      type: "DIRECT",
      messageSecret: "secretKey123",
      sharedSecretBase64: "c2VjcmV0QmFzZTY0",
    },
  },
};

export const chatMessageSlice = createSlice({
  name: "chatMessage",
  initialState,
  reducers: {
    loadUser: (state, action: PayloadAction<string>) => {
      state.selectedChatRoom;
    },
  },
});

export const {} = chatMessageSlice.actions;

export const selectChatMessage = (state: RootState) => state.chatMessage;

export default chatMessageSlice.reducer;
