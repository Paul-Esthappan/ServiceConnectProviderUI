
//  Fetch Booking details

import {axiosInstance} from "../api/axios";

export const fetchBookings = async () => {
    try {
      const response = await axiosInstance.get("bookings/");  
      console.log(response);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching data:", error.response ? error.response.data : error.message);
      throw error;
    }
 };


 export const serviceDetails = async (id) => {
  try {
    const response = await axiosInstance.post(`service_details/`, {
      booking_id: id
    });  
    console.log(response);
    return response.data
  } catch (error) {
    console.error("Error fetching data:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const declineSerivce = async (id, data) => {
  try {
    const response = await axiosInstance.post(
      `declinerequest/`,
      {
        booking_id: id,
        decline_reason: data.description,
        images: data.file,
      },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );  
  } catch (error) {
    console.error(
      "Error declineSerivce:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
