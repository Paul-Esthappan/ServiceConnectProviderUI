import React from "react";

const BookingDetails = ({ bookingDetails }) => {
  const {
    booking_id: id,
    service_description: description,
    invoices,
  } = bookingDetails;
  const appoinment =
    bookingDetails?.invoices[0].appointment_date ||
    bookingDetails.availability_from; //Just form backup

    const getGrantTotal = () => {
        let sum = 0;
        if(Array.isArray(invoices)) {
            invoices.forEach(invoice => {
                sum += Number(invoice?.total_amount || 0);
            })
        }
        return sum;
    }

    const getAdditionalRequirements = () => {
        let reqs = [];
        if (Array.isArray(invoices)) {
          invoices.forEach((invoice) => {
            reqs.push(invoice.additional_requirements || "");
          });
        }
        return reqs;
    };

    const formatTime = (date) => {
      let hours = new Date(date).getHours();
      let minutes = new Date(date).getMinutes();
      let ampm = hours >= 12 ? "PM" : "AM";

      // Convert to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'

      // Pad minutes with a zero if needed
      minutes = minutes < 10 ? "0" + minutes : minutes;

      return hours + ":" + minutes + " " + ampm;
    }

    const formatDate = (requestDate) => {
      const date = new Date(requestDate);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      const options = { weekday: "long" }; // For day of the week (e.g., "Monday")

      // Check if the date is Today
      if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        return "Today";
      }

      // Check if the date is Yesterday
      if (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
      ) {
        return "Yesterday";
      }

      // Check if within the last week
      const daysDifference = (today - date) / (1000 * 60 * 60 * 24);
      if (daysDifference <= 6) {
        return date.toLocaleDateString("en-IN", options); // Day of the week (e.g., "Monday")
      }

      // Otherwise, display the full date in dd-mm-yyyy format
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }

  return (
    <div className="bg-primary p-5 rounded-3xl mt-1 shadow-boxshadow-1">
      <p className="text-id-gray text-lg font-semibold">
        Booking Id : {id || "Not found"}
      </p>

      <div className="pt-2">
        {/* Title unavaliable from backend */}
        {/* <h3 className='font-semibold'>Title</h3>
         <h4 className='ml-5  font-semibold'>{title}</h4> */}

        <h3 className="font-semibold">Description</h3>
        <h4 className="font-semibold ml-5">{description || "---"}</h4>

        <h3 className="font-semibold">Appointment</h3>
        <div className="flex flex-wrap gap-2 ml-[50px] sm:ml-[90px]">
          <span className="text-lg font-semibold rounded-lg px-4 py-2 bg-light-gray shadow-boxshadow-1">
            {formatDate(appoinment)}
          </span>
          <span className="text-lg font-semibold rounded-lg px-4 py-2 bg-light-gray shadow-boxshadow-1">
            {formatTime(appoinment)}
          </span>
        </div>

        <div className="overflow-x-auto text-cardfont pt-2">
          <table className="w-full">
            <caption className="text-left font-bold">Invoice</caption>
            <thead>
              <tr>
                <th className="text-left">Sl.No</th>
                <th className="text-left">Description</th>
                <th className="text-left">Quantity</th>
                <th className="text-left">Price</th>
                <th className="text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoices && invoices.length > 0 ? (
                invoices.map((invoice, index) => (
                  <tr key={index} className="mt-2 text-sm font-bold">
                    <td className="p-2">{invoice.invoice_number}</td>
                    <td className="p-2">{invoice.description || "---"}</td>
                    <td className="p-2">{invoice.quantity}</td>
                    <td className="p-2">{invoice.price}</td>
                    <td className="p-2">{invoice.total_amount}</td>
                  </tr>
                ))
              ) : (
                <tr className="mt-2 text-sm text-gray-600 text-center">
                  <td colSpan={5}>No invoices available.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="text-right mt-12">
            <span className="mr-10 font-bold">
              Grand Total ${getGrantTotal()}.00
            </span>
          </div>
        </div>
        <div className="text-cardfont lg:flex lg:mt-2">
          <div>
            <p>Terms and conditions</p>
            <p className="ml-6">Valid up to 1 month</p>

            <div className="flex py-1">
              <span className="text-sm font-semibold text-dark-red mr-2">
                Additional requirements
              </span>
              <img src="/complaintformAlert-icon.svg" alt="" />
            </div>
          </div>
          <div>
            {getAdditionalRequirements().map((req, index) => (
              <p key={index} className="ml-5">
                {req}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
