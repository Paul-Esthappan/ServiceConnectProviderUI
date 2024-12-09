import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserCard from "../complaintForm/UserCard";
import BookingDetails from "../complaintForm/BookingDetails";
import ButtonComponent from "../reUsableComponents/ButtonComponent";
import DeclineInput from "../complaintForm/DeclineInput";
import { serviceDetails, declineSerivce } from "../../booking/bookingsapi";

const DeclineForm = () => {
  const { id } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetching service details from the API
        const response = await serviceDetails(id);
        setServiceData(response);
        
        console.log("serviceData: ", serviceData);
      } catch (err) {
        setError("An error occurred while fetching service details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchServiceDetails();
    }
  }, [id]);

  const onClose = () => {
    setIsOpen((prev) => !prev);
  };

  const getApiCall = async(type, data=null) => {
    switch (type) {
      case "Service Status": {
        setIsOpen(false);
        alert("status: working"); //demo
        break;
      }
      case "Payment Status": {
        setIsOpen(false);
        alert("status: "+ serviceData.invoices[0].payment_status);
        break;
      }
      case "decline": {
        console.log(data);
        setIsOpen(false);
        try {
          const res = await declineSerivce(id, data);
          alert("Declined");
          navigate("/bookings");
        } catch (error) {
          alert(error.response ? error.response.data.error : error.message);
        }
      }
    }
  };

  const buttonConfig = [
    {
      type: "submit",
      label: "Service Status",
      width: "100%",
      height: "49px",
      hasIcon: false,
    },
    {
      type: "submit",
      label: "Payment Status",
      width: "100%",
      height: "49px",
      hasIcon: false,
    },
  ];

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  return (
    <section>
      <div className="bg-light-gray min-h-screen w-full py-4 md:px-6 px-4">
        <div className="w-full lg:flex">
          <div className="lg:w-1/5 w-full">
            <UserCard userDetails={serviceData} />
          </div>

          <div className="md:flex lg:w-4/5 w-full md:space-x-3 m-auto">
            <div className="w-full md:w-1/2">
              <BookingDetails bookingDetails={serviceData} />

              <div className="space-y-2 mt-4">
                {buttonConfig.map((btn, index) => (
                  <ButtonComponent
                    key={index}
                    type={btn.type}
                    label={btn.label}
                    width={btn.width}
                    height={btn.height}
                    hasIcon={btn.hasIcon}
                    onClick={() => getApiCall(btn.label)}
                  />
                ))}
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <DeclineInput
                isOpen={isOpen}
                onClose={onClose}
                getApiCall={getApiCall}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeclineForm;
