import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import InputFieldComponent from "./InputFieldComponent";
import ButtonComponent from "./ButtonComponent";

const FormComponent = ({
  fieldConfigs,
  buttonConfig,
  inputConfig,
  apiEndpoint,
  heading,
  profile,
  forgotPassword,
  title,
  paragraph,
  rememberMe,
}) => {
  const [profileImage, setProfileImage] = useState(null); // State to hold selected profile image
  const [previewImage, setPreviewImage] = useState(null); // State for image preview

  // Initialize form values for text fields
  const initialFormValues = fieldConfigs.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  // Yup validation schema
  const validationSchema = Yup.object(
    fieldConfigs.reduce((schema, field) => {
      if (
        field.placeholder.toLowerCase().includes("password") &&
        field.name !== "confirmPassword"
      ) {
        schema[field.name] = Yup.string()
          .required(`${field.label} is required`)
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@])(?=.*\d)[A-Za-z\d@]{8,}$/,
            "Password must contain at least 8 characters, including uppercase, lowercase, number, and @"
          );
      } else if (field.name === "confirmPassword") {
        schema[field.name] = Yup.string()
          .required("Confirm password is required")
          .oneOf([Yup.ref("password"), null], "Passwords must match");
      } else if (field.placeholder.toLowerCase().includes("email")) {
        schema[field.name] = Yup.string()
          .email("Invalid email address")
          .required(`${field.label} is required`);

        /* } else if (field.placeholder.toLowerCase().includes('phone')) {
          schema[field.name] = Yup.string()
          .required(`${field.label} is required`)
          .matches(/^\+\d{1,3}\d{7,14}$/, 'Phone must start with + and include country code.');   
     */
      } else if (field.placeholder.toLowerCase().includes("gender")) {
        schema[field.name] = Yup.string()
          .required(`${field.label} is required`)
          .oneOf(
            ["Male", "Female"],
            'Gender must be either "Male" or "Female"'
          );
      } else if (field.required) {
        schema[field.name] = Yup.string().required(
          `${field.label} is required`
        );
      }
      return schema;
    }, {})
  );

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const finalValues = {
        ...values,
        profileImage: profileImage ? profileImage : "",
      };

      await apiEndpoint(finalValues);

      resetForm();
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setSubmitting(false); // Stop submitting state
    }
  };

  // Handle profile image change
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file.name); // Update profileImage state with selected file
      setPreviewImage(URL.createObjectURL(file)); // Generate preview URL for the image
    }
  };

  return (
    <div className="bg-light-gray p-6 max-w-xl w-full md:max-w-lg lg:max-w-lg lg:p-4 xl:max-w-md xl:p-4">
      {heading && (
        <div className="bg-dark-gray p-4 rounded-t-lg w-full mx-auto">
          <h2 className="text-white font-heading text-center text-lg font-bold">
            {heading}
          </h2>
        </div>
      )}

      {profile && (
        <div className="flex justify-center mt-4">
          <div className="w-24 h-24 rounded-full bg-medium-gray flex items-center justify-center relative">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <img
                src="/profileImage.svg"
                alt="Profile"
                className="w-24 h-24"
              />
            )}
            <input
              type="file"
              className="opacity-0 absolute w-24 h-24 cursor-pointer"
              onChange={handleProfileImageChange}
              accept="image/*" // Restrict file input to image types
            />
          </div>
        </div>
      )}

      {title && <div className="font-bold text-lg mt-2">{title}</div>}
      {paragraph && <p className="text-gray-700 mt-2">{paragraph}</p>}

      <Formik
        initialValues={initialFormValues} // Set initial values
        validationSchema={validationSchema} // Apply Yup validation schema
        onSubmit={handleSubmit} // Handle form submission
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
        }) => (
          <Form className="space-y-4 mt-4">
            {fieldConfigs.map((field) => (
              <InputFieldComponent
                key={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={values[field.name]}
                error={errors[field.name]}
                touched={touched[field.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                inputWidth={inputConfig.inputWidth}
                inputHeight={inputConfig.inputHeight}
                icon={field.icon}
              />
            ))}

            {forgotPassword && (
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-dark-gray hover:underline hover:text-black"
                >
                  Forgot Password?
                </Link>
              </div>
            )}

            {rememberMe && (
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  onChange={handleChange}
                  checked={values.rememberMe}
                  className="mr-2"
                />
                <label htmlFor="rememberMe" className="text-gray-700">
                  Remember Me
                </label>
              </div>
            )}

            <div className="mt-4">
              <ButtonComponent
                label={buttonConfig.label}
                type={buttonConfig.type}
                disabled={isSubmitting}
                btnWidth={buttonConfig.btnWidth}
                btnHeight={buttonConfig.btnHeight}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormComponent;
