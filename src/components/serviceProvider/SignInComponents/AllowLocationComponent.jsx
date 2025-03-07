import React, { useState } from "react";
import { getCurrentLocation, fetchLocationData, fetchCoordinatesFromPlace } from "../../../services/locationService";
import ButtonComponent from "../../../components/reUsableComponents/ButtonComponent";
import { Navigate } from "react-router-dom";

const AllowLocationComponent = () => {
    const [location, setLocation] = useState("");
    const [manualLocation, setManualLocation] = useState("");

    // Handle fetching current location
    const handleAllowLocation = async () => {
        try {
            const locationData = await getCurrentLocation();
            setLocation(`Latitude: ${locationData.latitude}, Longitude: ${locationData.longitude}, City: ${locationData.city}, State: ${locationData.state}, Country: ${locationData.country}`);
            console.log(locationData);
            
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    // Handle manual location input
    const handleManualLocation = (e) => {
        setManualLocation(e.target.value);
    };

    // Fetch location data based on manually entered location
    const fetchManualLocationData = async () => {
        try {
            const coordinates = await fetchCoordinatesFromPlace(manualLocation);
            const locationData = await fetchLocationData(coordinates.latitude, coordinates.longitude);
            setLocation(`Latitude: ${locationData.latitude}, Longitude: ${locationData.longitude}, City: ${locationData.city}, State: ${locationData.state}, Country: ${locationData.country}`);
        } catch (error) {
            console.error("Error fetching location data:", error);
            alert(error.message);
        }
    };

   

    return (
        <div className="flex flex-col justify-center items-center h-full">
            <h2 className="font-heading text-[20px] font-normal leading-[30px] text-center mb-3 mt-6">
                Allow Location
            </h2>

            {/* Button to allow location using ButtonComponent */}
            <ButtonComponent
                label="Allow"
                onClick={handleAllowLocation}
                btnWidth="w-[208px]"
                btnHeight="h-[53px]"
            />

            <div className="flex justify-start p-4">
                <label className="block text-gray-700 mt-4">Manually Enter Location</label>
            </div>

            <div className="w-full flex flex-col items-center">
                <input
                    className="w-[208px] h-[53px] px-4 py-2 mb-6 rounded-md border border-light-gray bg-medium-gray font-input text-dark-gray focus:outline-none focus:ring-2 focus:ring-secondary"
                    type="text"
                    value={manualLocation}
                    onChange={handleManualLocation}
                    placeholder="Enter a place (e.g., Thrissur, India)"
                />
                
                {/* Button to fetch manual location data */}
                <ButtonComponent
                    label="Get Location Data"
                    onClick={fetchManualLocationData}
                    btnWidth="w-[200px]"
                    btnHeight="h-[49.22px]"
                />
            </div>

            {location && (
                <div className="mt-4 text-green-600">
                    <strong>Current Location: </strong>
                    <span>{location}</span>
                </div>
            )}
        </div>
    );
};

export default AllowLocationComponent;
