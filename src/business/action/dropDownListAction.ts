
  import { AppThunk } from '../reducer/store';
import axios from 'axios';
import { BASE_URL } from '../../axios/instance';
import { setDataList } from '../reducer/listSlice';
  
  export const dropDownList =(token:string | any):AppThunk=> async (dispatch)=> {
      try {
        const res = await axios.get(`${BASE_URL}config?data=lists`,{
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
          })
    
        console.log('respons data',res)
        localStorage.setItem('listDropDown', JSON.stringify(res.data));
        dispatch(setDataList(res.data));
  
        return 'SUCCESS';
      } catch (e) {
        // @ts-ignore
        console.log('mes',e?.response?.data.state)
        // @ts-ignore
        return 'FAIL';
      }
    };
  

  
    
  