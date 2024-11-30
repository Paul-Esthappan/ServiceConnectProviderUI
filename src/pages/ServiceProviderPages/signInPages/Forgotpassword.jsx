import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgotPassword } from "../../../services/auth/password";

const ForgotPassword = () => {
  const [option, setOption] = useState(""); // Selected option: email or phone
  const navigate = useNavigate();

  // Define form validation schema dynamically based on option
  const validationSchema = Yup.object({
    email: option === "email"
      ? Yup.string().email("Invalid email address").required("Email is required")
      : Yup.string(),
    phone: option === "sms"
      ? Yup.string()
          .matches(/^\d{10}$/, "Phone number must be 10 digits")
          .required("Phone number is required")
      : Yup.string(),
  });

  const formik = useFormik({
    initialValues: { email: "", phone: "" },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      const payload =
        option === "email"
          ? { email_or_phone: values.email }
          : { email_or_phone: values.phone };

          try {
            const response = await forgotPassword(payload);
            console.log("OTP sent successfully:", response);
            navigate("/otp-forgot-password");
          } catch (error) {
            console.error("Failed to send OTP:", error.response?.data?.email_or_phone);
          
            if (error.response?.data?.email_or_phone) {
              // Extract the error message from the array
              const errorMessage = error.response.data.email_or_phone[0] || "Failed to send OTP.";
              
              setErrors({
                [option === "email" ? "email" : "phone"]: errorMessage,
              });
            } else {
              // Handle other unexpected errors
              setErrors({
                general: "An unexpected error occurred. Please try again.",
              });
            }
          }
          
    },
  });

  return (
    <div className="bg-light-gray min-h-screen flex flex-col items-center justify-center flex-grow font-input text-[14px]">
      <div className="w-full max-w-md bg-light-gray rounded-lg md:shadow-lg mt-20 md:p-8">
        <div className="flex flex-col text-center font-bold leading-4 mb-6">
          <p style={{ color: "#545454" }}>
            Enter your registered email or phone number to
          </p>
          <p style={{ color: "#545454" }}>
            receive an OTP to reset your password
          </p>
        </div>

        {/* Option Select */}
        <div
          className={`bg-medium-gray text-white flex items-center justify-between p-4 mb-4 rounded-lg cursor-pointer ${
            option === "email" && "border-2 border-dark-gray"
          }`}
          onClick={() => {
            setOption("email");
            formik.resetForm(); // Reset form when switching options
          }}
        >
          <div className="flex items-center gap-2">
            <p>Email</p>
          </div>
        </div>

        <div
          className={`bg-medium-gray text-white flex items-center justify-between p-4 mb-4 rounded-lg cursor-pointer ${
            option === "sms" && "border-2 border-dark-gray"
          }`}
          onClick={() => {
            setOption("sms");
            formik.resetForm(); // Reset form when switching options
          }}
        >
          <div className="flex items-center gap-2">
            <p>Phone Number</p>
          </div>
        </div>

        {/* Conditional Form Render */}
        {option && (
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            {option === "email" && (
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your Email"
                  className="border rounded p-2"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm">{formik.errors.email}</p>
                )}
              </div>
            )}
            {option === "sms" && (
              <div className="flex flex-col gap-1">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your Phone Number"
                  className="border rounded p-2"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500 text-sm">{formik.errors.phone}</p>
                )}
              </div>
            )}
            <button
              type="submit"
              className="w-full h-10 bg-blue-500 text-white rounded"
            >
              Continue
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
