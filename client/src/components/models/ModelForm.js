import React from "react";
import { Form, Formik } from "formik";

const ModelForm = () => {
  const initial = {
    ModelName: "",
    Fields: [
      {
        FieldName: "",
        Type: "",
        UIType: "",
        Required: "",
        Unique: "",
        Reference: "",
        Default: "",
        Enum: [{ type: "" }],
        SelectField: {
          KeyField: "",
          ValueField: "",
        },
        SelectLabelValue: [
          {
            Label: "",
            Value: "",
          },
        ],
      },
    ],
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
  };
  return (
    <div>
      <p>Add New Model</p>
      <Formik
        initialValues={initial}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => <Form></Form>}
      </Formik>
    </div>
  );
};

export default ModelForm;
