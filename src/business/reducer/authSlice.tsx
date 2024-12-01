import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { ErrorMessage } from "../../locales/string";
import { store } from "./store";

export interface authState {
  loggedIn: boolean;
  error: any;
  errorRegister:any;
  pending: boolean;
  loginSuccess: boolean;
  token: null | string;
  registerSuccess: boolean;
  registerFail: boolean;
  remindSuccess: boolean;
  id: string;
}

const initialState: authState = {
  id: "",
  loggedIn: false,
  pending: false,
  loginSuccess: false,
  registerSuccess: false,
  registerFail: false,
  remindSuccess: false,
  token: null,
  error: "",
  errorRegister:""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginPending: (state) => {
      state.pending = true;
      state.error = "";
    },
    setLogout: (state) => {
      state.loggedIn = false;
      state.pending = false;
      state.loginSuccess = false;
      state.registerSuccess = false;
      state.registerFail = false;
      state.remindSuccess = false;
      state.token = null;
      state.error = "";
      state.errorRegister=""
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = true;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.loginSuccess = true;
    },
    setLoginFail: (state, action) => {
      state.loginSuccess = false;
      state.token = null;
      state.pending = false;
      state.error = action.payload;
    },
    setRegister: (state,action) => {
      state.registerSuccess = true;
      state.registerFail = false;
      state.errorRegister = action.payload;
    },
    setRegisterFail: (state, action) => {
      state.registerSuccess = false;
      state.registerFail = true;
      state.errorRegister = action.payload;
    },
    setRemind: (state) => {
      state.remindSuccess = true;
      state.error = "";
    },
    setRemindFail: (state, action) => {
      state.error = action.payload;
      state.remindSuccess = false;
    },
    setResetErrors: (state) => {
      state.error = "";
      state.loginSuccess = false;
      state.registerSuccess = false;
      state.registerFail = false;
      state.remindSuccess = false;
    },
  },
});

export const {
  setLogout,
  setLoggedIn,
  setLoginPending,
  setLoginFail,
  setRegister,
  setRegisterFail,
  setRemind,
  setRemindFail,
  setResetErrors,
} = authSlice.actions;
export default authSlice.reducer;
