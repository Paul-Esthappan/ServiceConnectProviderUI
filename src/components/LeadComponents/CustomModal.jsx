import React from 'react';
import ReactModal from 'react-modal';
import ActionButton from './ActionButton';
import { deductLead } from '../../deductlead/deductlead';
import LeadDetails from '../LeadComponents/LeadDetails'



const CustomModal = ({ open, onRequestClose, onOk, onCancel,bookingId  }) => {
  const handleClick = () => {
    onOk();
    deductLead(bookingId).then((result) => {
      console.log("Deduct Lead Result:", result);
      console.log(`Booking ID: ${bookingId}`);
    })
    
  };
  

  
  return (
    <ReactModal
      isOpen={open}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'transparent',
          backdropFilter: 'blur(5px)',
        },
        content: {
          top: "50%",
          left: "55%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "500px",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          backgroundColor: "#D9D9DB",
        },
      }}
    >
      <h2 className='font-heading font-medium tracking-wide text-lg mb-4'>
        By attending your lead, your balance will be reduced by one.
      </h2>
      <div className="flex gap-2 justify-center">
        <ActionButton label="Okay" color="dark-gray" width="126px" onClick={handleClick} />
        <ActionButton label="Cancel" color="dark-gray" width="126px" onClick={onCancel} />
      </div>
    </ReactModal>
  );
};

export default CustomModal;
