// @ts-nocheck
import { AxiosRequestConfig } from "axios";
import { store } from "../../business/reducer/store";
import { applicationCurrentVersion } from "../../config";
//import { SET_TOKEN_SUCCESS } from "../../business/action/types";
//import { genericAsyncStorageOperator } from "../common/GenericAsyncStorageOperator.service";

export const requestInterceptor = async (config: AxiosRequestConfig) => {
  const state = store.getState();
  //const profileData = useSelector(state => state.profile.profileData.);
  let token = state.auth.token;
  let platform = "web";
  let userId: string | null = null;

  if (state?.start?.userResponse?.id) {
    userId = state.start.userResponse.id;
  }

//   if (!token) {
//     token = await genericAsyncStorageOperator.getItem("token");
//     store.dispatch({
//       type: SET_TOKEN_SUCCESS,
//       payload: token,
//     });
//   }

  config.headers.Authorization = "Bearer " + token;

  config.headers["Content-Type"] = "application/json";
  config.headers["app-version"] = applicationCurrentVersion;
//  if (userId) {
   // config.headers.User = userId;
  //}
  config.headers.OS = platform;
  return config;
};

