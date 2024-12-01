import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { ErrorMessage } from "../../locales/string";
import { store } from "./store";

export interface editUserState {
  data:any
dataEdit:any
}

const initialState:  editUserState  = {
  data:[],
  dataEdit:null
  

};

const editOrdersParamsSlice = createSlice({
  name: "editParamsOrder",
  initialState,
  reducers: {
    setDatasOrder:(state, action: PayloadAction<any>) => {
        state.data = action.payload;
       },
       setDatasOrderEdit:(state, action: PayloadAction<any>) => {
        state.dataEdit = action.payload;
       },
  },
});

export const {
    setDatasOrder,
    setDatasOrderEdit
} = editOrdersParamsSlice.actions;
export default editOrdersParamsSlice.reducer;
