import React from "react";

const DatePick = ({ label, name, formik, ...props }) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium " htmlFor={label}>
        {label}
      </label>

      <div>
        <input
          type="date"
          name={name}
          value={formik.values[name] || ""}
          onChange={(e) => formik.setFieldValue(name, e.target.value)}
          {...props}
        />
      </div>
    </div>
  );
};

export default DatePick;
