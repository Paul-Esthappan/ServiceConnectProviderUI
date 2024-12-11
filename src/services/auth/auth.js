import { axiosInstance } from "../../api/axios";
import { store } from "../../redux/store";
export const refreshAccessToken = async () => {
  try {
    const state = store.getState();
    const { refreshToken } = state.auth;

    const response = await axiosInstance.post("/api/token/refresh/", {
      refresh: refreshToken,
    });
    if(response.status === 200 && response.data?.access){
      return { access: response.data.access };
    }
    return new Error("Invalid Refresh token response");
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
};
