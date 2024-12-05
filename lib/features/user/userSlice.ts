import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";

interface userState {
  loading: boolean;
  user: {
    id: string | null;
    name: string | null;
    publicKeyBase64: string | null;
    privateKeyBase64: string | null;
  };
}

type User = Omit<userState, "loading">["user"];

// Define the initial state using that type
const initialState: userState = {
  loading: true,
  user: {
    id: null,
    name: null,
    publicKeyBase64: null,
    privateKeyBase64: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { loadUser, updateLoading } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
