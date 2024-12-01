import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { ErrorMessage } from "../../locales/string";
import { store } from "./store";

export interface editUserState {
  data:any

}

const initialState:  editUserState  = {
  data:[]
  

};

const editUserSlice = createSlice({
  name: "editUser",
  initialState,
  reducers: {
    setDatas:(state, action: PayloadAction<any>) => {
        state.data = action.payload;
       },
  },
});

export const {
  setDatas
} = editUserSlice.actions;
export default editUserSlice.reducer;
