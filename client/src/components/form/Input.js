import { Field } from "formik";
import React from "react";

const Input = ({ label, name, type = "text", formik, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium " htmlFor={label}>
        {label}
      </label>

      <div className="relative">
        <Field
          name={name}
          type={type}
          className={`block w-full px-4 py-2 text-sm placeholder-gray-500 bg-white border rounded ${
            formik?.touched?.[name] && formik?.errors?.[name]
              ? "border-red-600"
              : null
          }`}
          {...props}
        />
      </div>

      {formik.touched[name] && formik.errors[name] ? (
        <div>{formik.errors[name]}</div>
      ) : null}
    </div>
  );
};

export default Input;
