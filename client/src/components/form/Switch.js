import { Field } from "formik";
import React from "react";

const Switch = ({ label, name }) => {
  return (
    <div className="">
      <label className="block items-center cursor-pointer">
        <div className="block mb-2 text-sm font-medium ">{label}</div>
        <div className="relative flex">
          <Field type="checkbox" id={label} name={name} className="sr-only" />
          <div className="block w-14 h-8 bg-gray-200 rounded-full"></div>
          <div className="absolute w-6 h-6 transition bg-gray-700 rounded-full dot left-1 top-1"></div>
        </div>
      </label>
    </div>
  );
};

export default Switch;
