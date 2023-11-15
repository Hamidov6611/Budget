import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IUser } from "../../types/types";
import { removeTokenFromLocalStorage } from "../../helpers/localstorage.helper";

// Define a type for the slice state
interface UserState {
  user: IUser | null;
  isAuth: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  user: null,
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      removeTokenFromLocalStorage();
    },
  },
});

export const { login, logout } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user;

export default userSlice.reducer;
