import React from 'react';

const BookingsDetalsPart = ({ booking }) => {

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
  };

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
  };

  return (
    <div className="p-4 font-daytime">
      <div>
        <h3 className="font-medium text-lg">Title</h3>
        <p className="text-cardfont text-sm">{booking?.title || "---"}</p>
      </div>
      <div>
        <h3 className="font-medium">Description</h3>
        <p className="text-sm text-cardfont">{booking.description || "---"}</p>
      </div>
      <div className="py-2">
        <h3 className="font-medium">Images & Video</h3>
        {booking?.image?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            className="w-20 h-20 rounded-full aspect-square object-cover"
          />
        ))}
      </div>
      <div>
        <h3 className="font-medium">Availability</h3>
        <div>
          <div>
            <h1 className="text-cardfont">From</h1>
            <div className="flex gap-2">
              <div className="bg-light-gray p-2 rounded-lg shadow-lg font-medium">
                {formatDate(booking.availability_from)}
              </div>
              <div className="bg-light-gray p-2 rounded-lg shadow-lg font-medium">
                {formatTime(booking.availability_from)}
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-cardfont">To</h1>
            <div className="flex gap-2">
              <div className="bg-light-gray p-2 rounded-lg shadow-lg font-medium">
                {formatDate(booking.availability_to)}
              </div>
              <div className="bg-light-gray p-2 rounded-lg shadow-lg font-medium">
                {formatTime(booking.availability_to)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsDetalsPart;
