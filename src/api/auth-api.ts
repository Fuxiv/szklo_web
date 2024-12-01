import axios, { BASE_URL, instance } from "../axios/instance";
// import axios, { AxiosError } from "axios";

export type LoginApiDto = {
    id: string;
    email: string;
    accessToken: string;

}

export const loginApi = async (body: any) => {
    // console.log('body in loginApi',body)
  const response = await instance.post("auth/login", body);
  return response;
};
export const registerApi = async (body: any) => {
  // console.log('body',body)
  const response = await instance.post("users/register", body,{headers: {
    // "Content-Type": "application/json",
  },});
  
  return response;
};
export const sendConfirmApi = async (mail: any) => {
  const response = await instance.post(`users/register/send-confirm-registration-email/${mail}`,{headers: {
    "Content-Type": "application/json"
  },});
  return response;
};

export const remindPasswordApi = async (body: { email: string }) => {
  await instance.post("users/remind-password", body,{headers: {
    "Content-Type": "application/json"
  },});
};

export const verifyProfileApi = async (code: string) => {
  const response =await instance.post(`users/register/confirm-registration/${code}`,{headers: {
    "Content-Type": "application/json"
  },});
  return response;
};

export const resetPasswordApi = async (code: string, password: string) => {
  await instance.post("users/remind-password/new-password", {
    remindPasswordToken: code,
    newPassword: password,
  },{headers: {
    "Content-Type": "application/json"
  },});
};
