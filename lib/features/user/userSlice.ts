import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { Connection } from "@/lib/types";

interface userState {
  loading: boolean;
  user: {
    id: string;
    name: string;
    publicKeyBase64: string;
    privateKeyBase64: string;
  };

  connections: Connection[];
}

type User = Omit<userState, "loading">["user"];

// Define the initial state using that type
const initialState: userState = {
  loading: true,
  user: {
    id: "",
    name: "",
    publicKeyBase64: "",
    privateKeyBase64: "",
  },
  connections: [],
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

    setConnections: (state, action: PayloadAction<Connection[]>) => {
      state.connections = [...action.payload];
    },

    updateConnections: (state, action: PayloadAction<Connection>) => {
      state.connections.push(action.payload);
    },
  },
});

export const { loadUser, updateLoading, setConnections, updateConnections } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;