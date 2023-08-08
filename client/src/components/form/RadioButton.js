import { Field } from "formik";
import React from "react";

const RadioButton = ({ label, name, options, formik, ...props }) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium " htmlFor={label}>
        {label}
      </label>
      <div {...props}>
        {options?.map((option, idx) => (
          <label key={idx} className="mr-2">
            <Field type="radio" name={name} value={option.Value} />
            <span className="ml-2 ">{option.Label}</span>
          </label>
        ))}
      </div>
      {formik.touched[name] && formik.errors[name] ? (
        <div>{formik.errors[name]}</div>
      ) : null}
    </div>
  );
};

export default RadioButton;
