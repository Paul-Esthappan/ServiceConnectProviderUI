import React, { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import BookingsDetalsPart from './BookingsDetalsPart';
import AddressDetails from './AddressDetails';
import ActionButton from './ActionButton';
import CustomModal from './CustomModal';
import { useNavigate, useParams } from 'react-router-dom';
import shape from '../../assets/images/shape.png';
import { getServiceRequestsDetails } from '../../services/providerAxios';
const LeadDetails = () => {
  const [tab, setTab] = useState(false);
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const {id} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getServiceRequestsDetails(id); // Assuming it returns a promise
        setServiceData(response);
        console.log("Service Requests Details:", response);
      } catch (error) {
        setError("An error occurred while fetching service requests details.");
        console.error("Error fetching service requests details:", error);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    setError(null);
    fetchData(); // Call the async function
    setTab(true); 
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    setTab(true); 
  }, []);

  const handleDecline = () => navigate(`/decline-form/${id}`);
  const handleAddress = () => setOpen(true);
  const handleCall = () => {
    window.location.href = `tel:${serviceData?.customer_phone}`;
  };
  const handleCancel = () => {
    setTab(true);
    setOpen(false);
  };
  const handleOk = () => {
    setTab(false);
    setOpen(false);
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  return (
    <div className="bg-light-gray font-daytime min-h-screen flex flex-col py-8">
      <ProfileHeader />
      <p className="text-daytime text-sm mb-10 pl-4 pt-4">Booking id: {id}</p>
      <div className="container mx-auto flex flex-col justify-center items-center flex-grow shadow-2xl w-8/12 bg-primary rounded-2xl p-4">
        <div className="flex justify-between w-full border-b-2 px-3 mb-4">
          <div
            className={`flex justify-center w-full cursor-pointer ${
              tab ? "border-b-2" : ""
            } py-2`}
            onClick={() => setTab(true)}
          >
            <h3>Request</h3>
          </div>
          <div
            className={`flex justify-center w-full cursor-pointer ${
              !tab ? "border-b-2" : ""
            } py-2`}
            onClick={handleAddress}
          >
            <h3>Address</h3>
          </div>
        </div>
        <div className="flex-grow overflow-auto">
          {tab ? (
            <BookingsDetalsPart booking={serviceData} />
          ) : (
            <AddressDetails user={serviceData} />
          )}
        </div>
      </div>
      <ActionButton
        label={tab ? "Decline" : "Call"}
        color={tab ? "decline-btn" : "complete-btn"}
        width="300px"
        onClick={tab ? handleDecline : handleCall}
      />
      <CustomModal
        open={open}
        onRequestClose={() => setOpen(false)}
        onOk={handleOk}
        onCancel={handleCancel}
        bookingId={id}
      />
    </div>
  );
};

export default LeadDetails;
