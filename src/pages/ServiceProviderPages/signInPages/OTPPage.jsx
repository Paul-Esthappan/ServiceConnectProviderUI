import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import OTPComponent from "../../../components/serviceProvider/SignInComponents/OtpComponent";
import ModalComponent from "../../../components/reUsableComponents/ModalComponent"; // Your modal component
import AllowLocationComponent from "../../../components/serviceProvider/SignInComponents/AllowLocationComponent";
import NavbarHead from '../../../components/serviceProvider/layout/NavbarHead';


const OTPPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle OTP submission
    const handleOnSubmit = async (otpValue) => {
        try {
            console.log("Received OTP:", otpValue);
            await verifyOTP(otpValue);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error during OTP submission:", error);
            alert("Failed to verify OTP. Please try again.");
        }
    };

    // Dummy async function to simulate OTP verification instead of api call
    const verifyOTP = async (otpValue) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (otpValue === "1234") {
                    resolve("OTP verified successfully");
                } else {
                    reject("Invalid OTP");
                }
            }, 1000);
        });
    };


    const handleCloseModal = () => {
        setIsModalOpen(false);
        localStorage.setItem('token',"dfsgtrfgh");
        navigate("/fill-your-profile");
    };

    return (
        <div>
         


            <div className="min-h-screen bg-light-gray flex items-center justify-center">

                {/* OTPComponent handles the OTP submission */}
                <OTPComponent handleOnSubmit={handleOnSubmit} />

                {/* Modal that opens after OTP submission */}
                {isModalOpen && (
                    <ModalComponent
                        isOpen={isModalOpen}
                        onClose={handleCloseModal} // Update onClose to use the new function
                        width="w-fit"
                        height="h-fit"
                    >
                        {/* AllowLocationComponent is responsible for location access */}
                        <AllowLocationComponent />
                    </ModalComponent>
                )}
            </div>
        </div>
    );
};

export default OTPPage;
