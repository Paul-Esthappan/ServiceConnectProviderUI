import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ButtonComponent from "../reUsableComponents/ButtonComponent";
import ModalComponent from "../../components/reUsableComponents/ModalComponent";

const DeclineInput = ({ isOpen, onClose, getApiCall }) => {
  // Formik with Yup validation
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      file: null,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .min(3, "Title must be at least 3 characters"),
      description: Yup.string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters"),
      file: Yup.mixed()
        .test("fileSize", "File is too large (max: 5MB)", (value) => {
          return !value || (value && value.size <= 5 * 1024 * 1024);
        })
        .nullable(), // File is optional
    }),
    onSubmit: (values) => {
      onClose();
    },
  });

  return (
    <div>
      <div className="flex flex-col space-y-2 mt-4">
        {/* Formik Form */}
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className={`h-14 my-1 px-4 py-2 w-full shadow-[0px_4px_4px_0px_#00000040] rounded-xl border outline-none`}
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
          )}

          <textarea
            name="description"
            placeholder="Description"
            className={`min-h-40 px-4 py-2 w-full shadow-[0px_4px_4px_0px_#00000040] rounded-xl border outline-none`}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </p>
          )}

          <div className="relative bg-primary h-14 px-4 py-2 shadow-[0px_4px_4px_0px_#00000040] rounded-xl">
            <input
              type="file"
              name="file"
              className="opacity-0 absolute right-4 w-6 h-6 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
              onChange={(event) => {
                const file = event.currentTarget.files[0];
                formik.setFieldValue("file", file);
              }}
            />
            <img
              src="/uploadimg-icon.svg"
              alt="upload data"
              className="absolute right-4 w-6 h-6 top-1/2 transform -translate-y-1/2 z-0"
            />
          </div>
          {formik.errors.file && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.file}</p>
          )}

          <div className="mt-4">
            <ButtonComponent
              type="submit"
              label="Submit"
              bgColor="#670200"
              width="100%"
              height="52px"
            />
          </div>
        </form>

        {/* Modal */}
        <ModalComponent
          isOpen={isOpen}
          onClose={onClose}
          width="300px"
          height="170px"
          children={
            <div className="flex items-center justify-center h-full">
              <div>
                <p className="text-center mb-4">
                  Are you sure you want to decline?
                </p>
                <ButtonComponent
                  type="button"
                  label="Decline"
                  bgColor="#1D1F2A"
                  width="100%"
                  height="46px"
                  onClick={() =>
                    getApiCall("decline", formik.values)
                  }
                />
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default DeclineInput;
