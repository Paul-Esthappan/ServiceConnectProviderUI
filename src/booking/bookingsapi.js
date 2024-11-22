
//  Fetch Booking details

import {axiosInstance} from "../api/axios";

export const fetchBookings = async () => {
    try {
      const response = await axiosInstance.get("service-provider/bookings/");  
      console.log(response);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching data:", error.response ? error.response.data : error.message);
      return [];
    }
 };


