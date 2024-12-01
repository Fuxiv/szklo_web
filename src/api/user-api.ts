import axios, { instance } from "../axios/instance";

export const editUserApi = async (body: any,token:any) => {
    const response = await instance.put("users/update", body,{headers: {
        'Authorization': `Bearer ${token}`,
    },});
    console.log(response)
    return response;
  };

  export const currentUserApi = async (token:any) => {
    // const response = await instance.get("users/current",{headers: {
    //     'Authorization': `Bearer ${token}`,
    //     "Content-Type": "application/json"
    // },});
    // return response;
  };

  export const deleteAccountApi = async (token:any) => {
    const response = await instance.delete("users",{headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json"
    },});
    return response;
  };

  export const newPasswordApi = async (currentPassword: string, newPassword: string,token:any) => {
    await instance.put("users/change-password", {
        currentPassword: currentPassword,
      newPassword: newPassword,
    },{headers: {
        'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json"
    },});
  };