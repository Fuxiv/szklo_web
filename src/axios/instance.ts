import axios, { AxiosError } from "axios";
import { store } from "../business/reducer/store";


// export const BASE_URL = "http://46.41.136.25:3000/api/" 
export const BASE_URL = "http://188.123.215.22:8082/" 

// main instace - use request, error interceptor
export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 9000, 
});

// instance.interceptors.request.use(requestInterceptor, (error) => error);

export const errorInterceptor = (
  error: AxiosError & { config: { __isRetryRequest: boolean } }
) => {
  //console.log(error)
  // processAxiosError(error);

  // retry once for timeout error
  if (
    
    error.config &&
    !error.config.__isRetryRequest
  ) {
    error.config.__isRetryRequest = true;
    return instance(error.config);
  }

  if (
    error.config.url !== "/signIn" &&
    error?.response?.status !== undefined &&
    error.response.status === 401
  ) {
    localStorage.removeItem("user");
    // store.dispatch(setLogout());
    // window.location.href = "/signIn";
  }

  return Promise.reject(error);
};

instance.interceptors.response.use((r) => r, errorInterceptor);

export default instance;
