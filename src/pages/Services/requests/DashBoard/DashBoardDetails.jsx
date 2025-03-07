
export const SearchIcon = ({ width = 20, height = 20, fill = "white", ...props }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.7549 18.6058L16.3169 15.2468L16.239 15.1258C16.087 14.9728 15.884 14.8908 15.669 14.8908C15.4579 14.8908 15.2509 14.9728 15.103 15.1258C12.181 17.8048 7.68095 17.9498 4.58295 15.4648C1.48495 12.9768 0.75495 8.63277 2.87595 5.30977C4.99695 1.98777 9.30995 0.71977 12.9539 2.34477C16.5989 3.96977 18.446 7.98377 17.267 11.7268C17.1849 12.0008 17.2509 12.2938 17.4499 12.5008C17.6459 12.7078 17.9429 12.7938 18.2239 12.7308C18.5049 12.6688 18.7319 12.4608 18.8179 12.1918C20.2239 7.75077 18.0989 2.96977 13.818 0.940771C9.53595 -1.08523 4.37995 0.250771 1.68895 4.08577C-1.00305 7.92177 -0.42505 13.1018 3.05195 16.2818C6.52395 19.4578 11.853 19.6758 15.587 16.7938L18.6299 19.7698C18.9429 20.0788 19.45 20.0788 19.767 19.7698C20.079 19.4608 20.079 18.9608 19.767 18.6488L19.7549 18.6058Z"
        fill={fill}
      />
    </svg>
  );
  

  export const IconComponent = () => (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="38" rx="10" fill="white" />
      <path fillRule="evenodd" clipRule="evenodd" d="M18.6429 26.7143C17.9325 26.7143 17.3571 26.1389 17.3571 25.4286C17.3571 24.7182 17.9325 24.1429 18.6429 24.1429C19.3532 24.1429 19.9286 24.7182 19.9286 25.4286C19.9286 26.1389 19.3532 26.7143 18.6429 26.7143ZM27.6429 24.7857H21.1236C20.835 23.6504 19.8129 22.8571 18.6429 22.8571C17.4729 22.8571 16.4507 23.6504 16.1621 24.7857H9.64286C9.28864 24.7857 9 25.0744 9 25.4286C9 25.7828 9.28864 26.0714 9.64286 26.0714H16.1621C16.4507 27.2067 17.4729 28 18.6429 28C19.8129 28 20.835 27.2067 21.1236 26.0714H27.6429C27.9971 26.0714 28.2857 25.7828 28.2857 25.4286C28.2857 25.0744 27.9971 24.7857 27.6429 24.7857ZM25.0714 20.2857C24.3611 20.2857 23.7857 19.7104 23.7857 19C23.7857 18.2896 24.3611 17.7143 25.0714 17.7143C25.7818 17.7143 26.3571 18.2896 26.3571 19C26.3571 19.7104 25.7818 20.2857 25.0714 20.2857ZM27.6429 18.3571H27.5522C27.2636 17.2219 26.2414 16.4286 25.0714 16.4286C23.9014 16.4286 22.8793 17.2219 22.5906 18.3571H9.64286C9.28864 18.3571 9 18.6458 9 19C9 19.3542 9.28864 19.6429 9.64286 19.6429H22.5906C22.8793 20.7781 23.9014 21.5714 25.0714 21.5714C26.2414 21.5714 27.2636 20.7781 27.5522 19.6429H27.6429C27.9971 19.6429 28.2857 19.3542 28.2857 19C28.2857 18.6458 27.9971 18.3571 27.6429 18.3571ZM12.2143 11.2857C12.9246 11.2857 13.5 11.8611 13.5 12.5714C13.5 13.2818 12.9246 13.8571 12.2143 13.8571C11.5039 13.8571 10.9286 13.2818 10.9286 12.5714C10.9286 11.8611 11.5039 11.2857 12.2143 11.2857ZM9.64286 13.2143H9.7335C10.0221 14.3496 11.0443 15.1429 12.2143 15.1429C13.3843 15.1429 14.4064 14.3496 14.6951 13.2143H27.6429C27.9971 13.2143 28.2857 12.9256 28.2857 12.5714C28.2857 12.2172 27.9971 11.9286 27.6429 11.9286H14.6951C14.4064 10.7933 13.3843 10 12.2143 10C11.0443 10 10.0221 10.7933 9.7335 11.9286H9.64286C9.28864 11.9286 9 12.2172 9 12.5714C9 12.9256 9.28864 13.2143 9.64286 13.2143Z" fill="#303039" />
    </svg>
  );

 export const recentActivity = [
    { user: 'Papaya', status: 'Booking status changed', time: '12 mins ago' },
    { user: 'Papaya', status: 'Booking status changed', time: '12 mins ago' },
    { user: 'Papaya', status: 'Booking status changed', time: '12 mins ago' },
    { user: 'Papaya', status: 'Booking status changed', time: '12 mins ago' },
  ];

export  const services = [
    { name: 'Bulb change', customer: 'John Abraham', location: 'Chaliaman', time: '12 mins ago' },
    { name: 'Bulb change', customer: 'John Abraham', location: 'Chaliaman', time: '12 mins ago' },
    { name: 'Bulb change', customer: 'John Abraham', location: 'Chaliaman', time: '12 mins ago' },
    { name: 'Bulb change', customer: 'John Abraham', location: 'Chaliaman', time: '12 mins ago' },
  ];
  
 export const doughnutData = {
    labels: ['S1', 'S2', 'S3'],
    datasets: [
      {
        label: 'Revenue by Service',
        data: [32, 22, 46],
        backgroundColor: ['#FF7C5B', '#6619F0', '#34D1B2'],
        hoverBackgroundColor: ['#FF8A80', '#58D68D', '#AF7AC5'],
      },
    ],
  };

 export const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Service Reach',
        data: [0, 100, 80, 150, 130, 200],
        fill: true,
        backgroundColor: '#f0edfe',
        borderColor: '#9073ff',
      },
    ],
  };
  