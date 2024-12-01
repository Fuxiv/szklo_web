import axios from "axios";
import { sendMessageApi } from "../../api/guest-api";
import { currentUserApi, deleteAccountApi, editUserApi, newPasswordApi } from "../../api/user-api";
import { BASE_URL } from "../../axios/instance";
import { setDatasOrder } from "../reducer/editOrdersParamsSlice";
import { setDatas } from "../reducer/editUserSlice";
import { AppThunk } from "../reducer/store";


export const sendMessage =
  (
    username: string,
    email: string,
    message: string
  ): AppThunk =>
  async (dispatch) => {
    try {
      const body = JSON.stringify({
        username,
        email,
        message,
      });
      console.log(body);
      const res=await sendMessageApi(body);
      console.log('res message',res)
      return true;
    } catch (e: any) {
      if (e?.response?.data !== undefined) {
        const {message, errorCode} = e.response.data;
        console.log(message);
      }
      return false;
    }
  };

  export const editUser =
  (
  data:any,
  token:any
  ): AppThunk =>
  async (dispatch) => {
    try {
      const body = JSON.stringify({
       data
      });
      console.log(data);
      const res=await editUserApi(data,token);
      console.log('res edit user',res.data)
      return true;
    } catch (e: any) {
      if (e?.response?.data !== undefined) {
        const {message, errorCode} = e.response.data;
        console.log(message);
      }
      return false; 
    }
  };

  export const currentUser =
  (
  token:any
  ): AppThunk =>
  async (dispatch) => {
    try {
    
      // const res=await currentUserApi(token);
      // console.log('current user',res.data)
      // dispatch(setName(res.data.name))
      // dispatch(setSurname(res.data.surname))
      // dispatch(setType(res.data.type))
      // dispatch(setPhone(res.data.phone))
      // dispatch(setCountry(res.data.country))
      // dispatch(setCity(res.data.city))
      // dispatch(setZipCode(res.data.zipCode))
      // dispatch(setAddresse(res.data.address))
      // dispatch(setNip(res.data.nip))
      // dispatch(setCompanyEmail(res.data.companyEmail))
      // dispatch(setEmail(res.data.email))
      // dispatch(setCompanyPhone(res.data.companyPhone))
      // dispatch(setOpenFrom(res.data.openFrom))
      // dispatch(setOpenTo(res.data.openTo))
      // dispatch(setCompanyName(res.data.companyName))
      return true;
    } catch (e: any) {
      if (e?.response?.data !== undefined) {
        const {message, errorCode} = e.response.data;
        console.log(message);
      }
      return false;
    }
  };


  export const deleteAccount =
  (
  token:any
  ): AppThunk =>
  async (dispatch) => {
    try {
    
      const res=await deleteAccountApi(token);
      
      console.log('delete',res.data)
      return true;
    } catch (e: any) {
      if (e?.response?.data !== undefined) {
        const {message, errorCode} = e.response.data;
        console.log(message);
      }
      return false; 
    }
  };

  export const newPasswordAction =
  (
    currentPassword: string,
    newPassword: string,
    token:string
  ): AppThunk<Promise<"NEGATIVE" | "POSITIVE">> =>
  async (dispatch) => {
    try {
      const res=await newPasswordApi(currentPassword, newPassword,token);
console.log('response new password',res)
      return "POSITIVE";
    } catch (e) {
      console.error("authAction::resetPasswordAction:", e);
      return "NEGATIVE";
    }
  };

  
  export const getUserParametrs=(token:string | any):AppThunk=> async (dispatch)=>{
    try {
        const res = await axios.get(`${BASE_URL}profile/parameters?group=10,14,17,99&columns=2`, {
            //@ts-ignore 
            headers: {
              //@ts-ignore
              Authorization: "Bearer " + JSON.parse(token),
              "Content-Type": "application/json",
            },
          });
          console.log(res.data)
          dispatch(setDatas(res.data.data))
      return res.data.data
      } catch (e: any) {
        if (e?.response?.data !== undefined) {
          const {message, errorCode} = e.response.data;
          console.log(message);
        }
        return false; 
      }
}
export const getOrderParametrs=(token:string | any,dcId:any):AppThunk=> async (dispatch)=>{
  try {
      const res = await axios.get(`${BASE_URL}order/parameters/${dcId}`, {
          //@ts-ignore
          headers: {
            //@ts-ignore
            Authorization: "Bearer " + JSON.parse(token),
            "Content-Type": "application/json",
          },
        });
        dispatch(setDatasOrder(res.data.data))
    return res.data.data
    } catch (e: any) {
      if (e?.response?.data !== undefined) {
        const {message, errorCode} = e.response.data;
        console.log(message);
      }
      return false; 
    }
}

export const saveParametrsInOrder=(token:string | any,data:any):AppThunk=> async (dispatch)=>{
  try {
    let obj2 = { data: {} };
   
    const newData=data.slice(-1)
    obj2.data = newData;
    let result = JSON.stringify(obj2).replace(/\[|\]/g, '');
    
    // let obj = {
    //   data: {
    //     DCP_ID: data[0].DCP_ID,
    //     DCP_VALUE: data[0].DCP_VALUE,
    //     DCP_TEXT:data[0].DCP_TEXT
    //   }
    // };

      const res = await axios.put(`${BASE_URL}order/parameter/update`,result, {
          //@ts-ignore
          headers: {
            //@ts-ignore
            Authorization: "Bearer " + JSON.parse(token),
            "Content-Type": "application/json",
          },
        });
      
        // dispatch(setDatasOrder(res.data.data))
    return res.data.data
    } catch (e: any) {
      if (e?.response?.data !== undefined) {
        const {message, errorCode} = e.response.data;
        console.log(message);
      }
      return false; 
    }
}

export const saveParametrsInProfile=(token:string | any,data:any):AppThunk=> async (dispatch)=>{
  try {
    let obj2 = { data: {} };
    console.log('obj2',data)
    const newData=data.slice(-1)
    obj2.data = newData;

    let result = JSON.stringify(obj2).replace(/\[|\]/g, '');
    console.log(result)
    // let obj = {
    //   data: {
    //     USP_ID: data[0].USP_ID,
    //     USP_VALUE: data[0].USP_VALUE,
    //     USP_TEXT:data[0].USP_TEXT
    //   }
    // };
      const res = await axios.put(`${BASE_URL}profile/parameter/update`,result, {
          //@ts-ignore
          headers: {
            //@ts-ignore
            Authorization: "Bearer " + JSON.parse(token),
            "Content-Type": "application/json",
          },
        });
    return res.status
    } catch (e: any) {
      if (e?.response?.data !== undefined) {
        const {message, errorCode} = e.response.data;
        console.log(message);
      }
      return false; 
    }
}

