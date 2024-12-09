import React from 'react';

const AddressDetails = ({ user }) => {
  return (
    <div className="py-16 flex flex-col justify-center items-start">
      <h3>Name: {user.customer_name}</h3>
      <h3>Address: {user.customer_address}</h3>
      <h3>Pincode: {user.customer_pincode}</h3>
      <h3>Land Mark: {user.customer_landmark}</h3>
      <h3>Ph: {user.customer_phone}</h3>
      <h3>Email: {user.customer_email}</h3>
    </div>
  );
};

export default AddressDetails;
