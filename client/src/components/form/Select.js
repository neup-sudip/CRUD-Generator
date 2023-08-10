import { Field } from "formik";
import React from "react";

const Select = ({
  label,
  options,
  name,
  formik,
  handleSelectChange,
  ...props
}) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium " htmlFor={label}>
        {label}
      </label>

      <Field
        name={name}
        as="select"
        className="block w-full"
        onChange={(e) => handleSelectChange(formik, e)}
        {...props}
      >
        <option value="" disabled>
          choose ...
        </option>
        {options?.map((option, idx) => (
          <option key={idx} value={option?.Value}>
            {option?.Label}
          </option>
        ))}
      </Field>

      {formik.touched[name] && formik.errors[name] ? (
        <div>{formik.errors[name]}</div>
      ) : null}
    </div>
  );
};

export default Select;
