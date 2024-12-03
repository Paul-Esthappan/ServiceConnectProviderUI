// components/FormikForm.js
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema, initialValues, categories } from "./formConfig";
import InputField from "./InputField";
import SelectField from "./SelectField";
import FileUploadField from "./FileUploadField";
import MediaUpload from "./MediaUpload";

const AddServiceForm = ({ onSubmit }) => {
  const [certificateFile, setCertificateFile] = useState(null);
  const [licenseFile, setLicenseFile] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const handleCertificateChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("certificate", file.name);
      setCertificateFile(file);
    }
  };

  const handleLicenseChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("license", file.name);
      setLicenseFile(file);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const formData = {
          ...values,
          image: mediaFiles[0] ? mediaFiles[0] : null,
          certificate: certificateFile,
          license: licenseFile,
        };
        onSubmit(formData);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className="flex flex-col items-center bg-[#D9D9DB] md:p-10 md:rounded-md md:shadow-xl">
          <InputField name="serviceTitle" placeholder="Service Title" />
          <InputField name="description" placeholder="Description" />
          <InputField name="gstcode" placeholder="GST Code" />
          <SelectField
            name="category"
            options={Object.keys(categories).map((category, index) => ({
              label: category,
              value: index,
            }))}
            onChange={(e) => {
              setFieldValue("category", e.target.value);
              setFieldValue("subcategory", "");
              setSubCategory(
                categories[Object.keys(categories)[Number(e.target.value)]]
              );
            }}
          />

          <SelectField
            name="subcategory"
            options={
              subCategory?.length
                ? subCategory?.map((sub, index) => ({
                    label: sub,
                    value: index,
                  }))
                : []
            }
            onChange={(e) => {
              setFieldValue("subcategory", e.target.value);
            }}
            disabled={!values.category}
          />
          <FileUploadField
            name="certificate"
            placeholder="Certificate"
            value={values.certificate}
            onChange={(e) => handleCertificateChange(e, setFieldValue)}
            previewSrc={
              certificateFile ? URL.createObjectURL(certificateFile) : ""
            }
          />
          <FileUploadField
            name="license"
            placeholder="License"
            value={values.license}
            onChange={(e) => handleLicenseChange(e, setFieldValue)}
            previewSrc={licenseFile ? URL.createObjectURL(licenseFile) : ""}
          />
          <MediaUpload
            mediaFiles={mediaFiles}
            setMediaFiles={setMediaFiles}
            setFieldValue={setFieldValue}
          />
          {/* Terms & Conditions */}
          <div className="flex justify-between items-center w-full mb-2">
            <label className="text-[#222222] mr-2 text-[12px] font-default">
              Terms & Conditions
            </label>
            <div>
              <Field
                type="checkbox"
                name="accepted_terms"
                className="h-4 w-4"
              />
              <span className="ml-2 text-[14px] font-default text-[#222222]">
                Accept
              </span>
            </div>
          </div>
          <ErrorMessage
            name="accepted_terms"
            component="p"
            className="text-red-500 text-sm"
          />
          {/* Submit Button */}
          <button
            type="submit"
            className="rounded-full bg-[#1D1F2A] mt-2 py-4 text-white font-default hover:bg-gray-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-between px-4 w-[350px] h-[60px]"
          >
            <span className="flex-grow text-center">Continue</span>
            <img
              src="./buttonArrow.svg"
              className="w-10 h-10"
              alt="arrow pointing right"
            />
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddServiceForm;
