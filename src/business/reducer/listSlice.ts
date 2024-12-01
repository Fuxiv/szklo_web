import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "./store";

export interface listState {
listType:[{
    fieldName:string;
    elementsOrder:{
      text:string;
      default:string;
      shortText:string
    }
}]
data:[]
}

const initialState: listState = {
 listType:[{
    fieldName:'',
    elementsOrder:{
        text:'',
        default:'',
        shortText:''
    }
 }],
 data:[]
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setDataList:(state, action: PayloadAction<any>) => {
        state.data = action.payload;
       },
  },
});

export const {
setDataList
} = listSlice.actions;
export default listSlice.reducer;
