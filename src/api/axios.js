
// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'https://learnbudsgvr.pythonanywhere.com/',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default axiosInstance;


import axios from "axios";
import { store } from '../redux/store';
import { clearAccessToken, setAccessToken } from "../redux/features/authSlice";
import { refreshAccessToken } from "../services/auth/auth";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

/*
 * 1. REQUEST INTERCEPTOR
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const { accessToken } = state.auth;
    const { refreshToken } = state.auth;


    console.log(refreshToken, 'accessToken');
    

    // Set Authorization header if accessToken is available
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    // logError(error, store);
    // return Promise.reject(error);
    console.log(error)
  }
);

/*
 * 2. RESPONSE INTERCEPTOR
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("originalRequest: ", originalRequest);

    if (error.response?.status === 401 && !originalRequest._retry) {
      const isAccessTokenError = error.response?.data?.messages?.some(
        (msg) => msg.token_class === "AccessToken"
      );
      console.log("AccessTokenError");
      if (isAccessTokenError) {
        originalRequest._retry = true;
        store.dispatch(clearAccessToken());
        try {
          const response = await refreshAccessToken();
          if (response.access) {
            store.dispatch(setAccessToken(response.access));
            originalRequest.headers.Authorization = `Bearer ${response.access}`; 
            return axiosInstance(originalRequest);
          }
        } catch (err) {
          return Promise.reject(err);
        }
      }
    }

    return Promise.reject(error);
  }
);
