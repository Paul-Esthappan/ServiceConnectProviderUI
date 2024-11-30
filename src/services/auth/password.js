import { axiosInstance } from "../../api/axios";

export const forgotPassword = async (body) => {
    try {
      console.log("Request Body Sent:", body); // Debugging log
      const response = await axiosInstance.post("/password-forgot/", body); // Pass body directly
      console.log("API Response:", response); // Log the response
      return response;
    } catch (error) {
      console.error("Error while sending forgot password request:", error);
      if (error.response) {
        console.error("Error Response Data:", error.response.data); // Log server error
      }
      throw error; // Re-throw error for further handling
    }
  };
  
  