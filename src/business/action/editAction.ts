import axios from "axios";
import { BASE_URL } from "../../axios/instance";
import { AppThunk } from "../reducer/store";


export const editOrder=(data:any,dcId:any,token:string | any):AppThunk=> async (dispatch)=>{
    try {
        const id = dcId === undefined ? 0 : dcId;
        const res = await axios.put(`${BASE_URL}order/save?DC_ID=${id}`, data, {
        headers: {
          //@ts-ignore
          Authorization: "Bearer " + JSON.parse(token),
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST,GET,OPTIONS,PUT,DELETE",
          "Content-Type": "application/json",
        },
      })
    //   .then((res) => {
    //     console.log("response new ", res.data.data);
    //     // setDcId(res.data.data[0].DC_ID);
    //     // setShowToast(true);

    //   });
    // console.log('RES',res)
      return res
      } catch (e: any) {
        if (e?.response?.data !== undefined) {
          const {message, errorCode} = e.response.data;
          console.log(message);
        }
        return false; 
      }
}

export const editPosition=(data:any,tpId:any,token:string | any):AppThunk=> async (dispatch)=>{
    try {
      console.log(data)
        const res = await axios.put(`${BASE_URL}order/position/save/${tpId}`,data, {
            // method: "PUT",
            // body: data,
            //@ts-ignore
            headers: {
              //@ts-ignore
              Authorization: "Bearer " + JSON.parse(token),
              "Access-Control-Allow-Headers":
                "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          });
      return res
      } catch (e: any) {
        if (e?.response?.data !== undefined) {
          const {message, errorCode} = e.response.data;
          console.log(message);
        }
        return false; 
      }
}

