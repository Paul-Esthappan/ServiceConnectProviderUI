
import React from "react";

const UserCard = ({ userDetails }) => {
  const {
    serviceprovider: name,
    service_description: subject,
    profile_image,
  } = userDetails;

  return (
    <div className="flex items-center">
      <img
        src={
          profile_image
            ? `${import.meta.env.VITE_BASE_URL}${profile_image}`
            : "/complaintformPropic.png"
        }
        alt="complaint form profile"
        className="w-20 h-20"
      />
      <div className="ml-2">
        <h2 className="font-bold">{name || ""}</h2>
        <p className="text-id-gray font-semibold mt-1">{subject || ""} </p>
      </div>
    </div>
  );
};

export default UserCard;
