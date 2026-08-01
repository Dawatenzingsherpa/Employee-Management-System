import API from "../http";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { Auth, Login, Status, UserData } from "../types/AuthTypes";

const initialState: Auth = {
  user: {} as UserData,
  token: "",
  status: Status.LOADING,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStatus(state: Auth, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setUserLogin(state: Auth, action: PayloadAction<Login>) {
      state.user = action.payload;
    },
    setToken(state: Auth, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { setStatus, setUserLogin, setToken } = authSlice.actions;
export default authSlice.reducer;

export function userLogin(loginData: any) {
  return async function userLoginThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("user/login", loginData);
      if (response) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setToken(response.data.data));
        localStorage.setItem("token", response.data.data);
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function userLogout() {
  return async function userLogoutThunk(dispatch: AppDispatch) {
    localStorage.removeItem("token");
    dispatch(setToken(""));
    dispatch(setStatus(Status.LOADING));
  };
}
