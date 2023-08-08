import { Field } from "formik";
import React from "react";

const CheckBox = ({ name, options, label }) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium " htmlFor={label}>
        {label}
      </label>
      <div className="flex items-center">
        {options?.map((option, idx) => (
          <div key={idx} className="flex mr-5 items-center">
            <Field
              type="checkbox"
              name={name}
              value={option?.Value}
              className="cursor-pointer"
            />
            <label className="ml-2 text-sm">{option?.Label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckBox;
