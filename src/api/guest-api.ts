import axios, { instance } from "../axios/instance";

export const sendMessageApi = async (body: any) => {
    const response = await axios.post("users/contact-form", body,{headers: {
      "Content-Type": "application/json"
    },});
    return response;
  };