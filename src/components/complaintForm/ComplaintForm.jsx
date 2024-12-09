import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserCard from "./UserCard";
import BookingDetails from "./BookingDetails";
import ButtonComponent from "../reUsableComponents/ButtonComponent";
import ComplaintInput from "./ComplaintInput";
import { serviceDetails } from "../../booking/bookingsapi";
import { complaintPost } from "../../services/providerAxios";

const ComplaintForm = () => {
  const { id } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const onClose = () => {
    setIsOpen((prev) => !prev);
  };

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

  const getApiCall = async (type, data = null) => {
    switch (type) {
      case "Service Status": {
        setIsOpen(false);
        alert("status: working"); //demo
        break;
      }
      case "Payment Status": {
        setIsOpen(false);
        alert(
          "status: " + serviceData?.invoices
            ? serviceData?.invoices[0]?.payment_status || "Unavaliable"
            : "Unavaliable"
        );
        break;
      }
      case "postcomplaint": {
        console.log(data);
        setIsOpen(false);
        try {
          await complaintPost(data);
          alert("Submitted");
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
      btnWidth: "w-full",
      btnHeight: "h-[49px]",
      variant: "complaint",
    },
    {
      type: "submit",
      label: "Payment Status",
      btnWidth: "w-full",
      btnHeight: "h-[49px]",
      variant: "complaint",
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
                    btnWidth={btn.btnWidth}
                    btnHeight={btn.btnHeight}
                    variant={btn.variant}
                    onClick={() => getApiCall(btn.label)}
                  />
                ))}
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <ComplaintInput
                isOpen={isOpen}
                onClose={onClose}
                getApiCall={getApiCall}
                bookingid={id}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplaintForm;
