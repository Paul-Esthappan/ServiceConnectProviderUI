import React from "react";

const ButtonComponent = ({
  label,
  type = "button",
  disabled = false,
  btnWidth = "w-full",
  btnHeight="h-auto",
  btnColor = "bg-dark-gray",
  variant = "default",
  onClick,
  hasIcon = false, // Added to conditionally render the icon
}) => {
  const variantClasses = {
    default: `${btnColor} rounded-full shadow-boxshadow-1 mt-2 p-4 text-primary font-default hover:bg-secondary transition-all duration-300 disabled:opacity-50 flex items-center justify-between`,
    complaint: `${btnColor} ${btnWidth} text-primary hover:bg-opacity-90 font-default py-2 rounded-full transition-colors`,
    franchise: `${btnColor} text-primary hover:bg-dark-red py-2 lg:px-32 sm:px-20 px-10 rounded-full transition-colors`,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variantClasses[variant]} ${btnWidth} ${btnHeight} flex items-center justify-center relative font-semibold text-primary shadow-[0px_4px_4px_0px_#00000040] px-4 rounded-full`}
    >
      <span className="flex-grow text-center">{label}</span>
      {hasIcon && (
        <img
          src="./buttonArrow.svg"
          className="ml-2 w-8 h-8"
          alt="arrow pointing right"
        />
      )}
    </button>
  );
};

export default ButtonComponent;
