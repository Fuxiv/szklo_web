import {
  setLogout,
  setLoggedIn,
  setLoginFail,
  setLoginPending,
  setRegister,
  setRegisterFail,
  setRemind,
  setRemindFail,
  setResetErrors,
} from '../reducer/authSlice';
import {Dispatch} from '@reduxjs/toolkit';
import { AppThunk } from '../reducer/store';
import { loginApi, registerApi, remindPasswordApi, resetPasswordApi, sendConfirmApi, verifyProfileApi } from '../../api/auth-api';
//   import { executeInitialAction } from "./initialActions";

export const loginAction =
  (
    user_name: string,
    password: string
  ): AppThunk <any>=>
  async (dispatch) => {
    try {
      const body = JSON.stringify({
        user_name,
        password,
      });
      const res = await loginApi(body);
  
      // console.log('respons data',res.data)


      localStorage.setItem('token', JSON.stringify(res.data.data.token));
      localStorage.setItem('user_id', JSON.stringify(res.data.data.user_id));
      localStorage.setItem('name', JSON.stringify(res.data.data.user_symbol));

      dispatch(setLoggedIn({token: res.data.data.token}));
     dispatch(setLoggedIn({user_id:res.data.data.user_id}))

      return 'SUCCESS';
    } catch (e) {
      // @ts-ignore
      // console.log('mes',e?.response?.data.state)
      // @ts-ignore
      if (e?.response?.data !== undefined) {
        // @ts-ignore
        // const {message} = e.response.data;
        const status=e.response.status
        //@ts-ignore
        const state=e.response.data.State
        // console.log(state)
        // console.log('status',status)
        if(status===403){
          dispatch(setLoginFail({error:'Nie znamy cię'}));
        } else if(status===405){
          dispatch(setLoginFail({error:'Znamy cię ale musisz konto zarejestrować'}));

        }else if(status ===406){
          dispatch(setLoginFail({error:'Konto zarejestrowane ale nie potwierdzone mailem'}));
        } else if( status === 401 && state===10){
          dispatch(setLoginFail({error:'Konto nie jest zarejestrowane'}));
        }
        else if( status === 401 && state===20){
          dispatch(setLoginFail({error:'Rejestracja nie została potwierdzona (należy sprawdzić pocztę)'}));
        }else if( status === 401 && state===40){
          dispatch(setLoginFail({error:'Błędne dane logowania'}));
        }else if( status === 401 && state===50){
          dispatch(setLoginFail({error:'Nieznany użytkownik'}));
        }else if( status === 407){
          dispatch(setLoginFail({error:'Niepoprawny mail/login lub hasło'}));
        }else if( status === 400){
          dispatch(setLoginFail({error:'Błędne żądanie/niepoprawny JSON'}));
        }
      
      }
      return 'FAIL';
    }
  };

export const resetError = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setResetErrors);
  } catch (e) {
    console.log(e);
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  try {
    localStorage.removeItem('token');
  let value = localStorage.getItem("token");
console.log('value in logout',value)
    dispatch(setLogout());
  } catch (e) {
    console.log(e);
  }
};

  export const registerAction =
    (email: string, password: string): AppThunk<Promise<boolean>> =>
    async (dispatch) => {
      try {
        const body = JSON.stringify({
          email,
          password,
        });
        console.log(body);
        const res =await registerApi(body);
        console.log('res register',res.data.data)
        // dispatch(setRegister());
        return true;
      } catch (e: any) {
        console.error("authActions::registerAction:", e);
        if (e?.response?.data !== undefined) {
          const { message, error } = e.response.data;
          console.log(message);
          console.log(error);

          dispatch(setRegisterFail({errorRegister:message}));
        }
        return false;
      }
    };
    export const sendConfirm =
    (email: string): AppThunk<Promise<boolean>> =>
    async (dispatch) => {
      try {

        const res =await sendConfirmApi(email);
        console.log('res confirm send mail',res)
        return true;
      } catch (e: any) {
        if (e?.response?.data !== undefined) {
          const { message, error } = e.response.data;
          console.log(message);
          console.log(error);

          // dispatch(setRegisterFail(error));
        }
        return false;
      }
    };



  export const remindPasswordAction =
    (email: string): AppThunk<Promise<void>> =>
    async (dispatch) => {
      try {
        console.log(email);
        await remindPasswordApi({ email: email });
        dispatch(setRemind());
        // dispatch(
        //   addAlertAction(getString("remindPasswordScreen", "mailWasSent"))
        // );
      } catch (e: any) {
        const { message, errorCode } = e.response.data;
        console.log(message);
        dispatch(setRemindFail(errorCode));
      }
    };

    export const resetPasswordAction =
    (
      password: string,
      remindPasswordToken: string,
    ): AppThunk<Promise<"NEGATIVE" | "POSITIVE">> =>
    async (dispatch) => {
      try {
        await resetPasswordApi(remindPasswordToken, password);
        return "POSITIVE";
      } catch (e) {
        console.error("authAction::resetPasswordAction:", e);
        return "NEGATIVE";
      }
    };


  export const verifyProfileAction =
    (code: string): AppThunk<Promise<"NEGATIVE" | "POSITIVE">> =>
    async (dispatch) => {
      try {
       const res= await verifyProfileApi(code);
       console.log('res verifyProfile',res)
        return "POSITIVE";
      } catch (e) {
        console.error(e);
        return "NEGATIVE";
      }
    };

  
