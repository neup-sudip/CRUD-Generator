import React, { useState } from "react";
import { FieldArray, Form, Formik } from "formik";
import Input from "../form/Input";
import Select from "../form/Select";
import Switch from "../form/Switch";
import Button from "../form/Button";

const ModelForm = () => {
  const initial = {
    ModelName: "",
    Fields: [
      {
        FieldName: "",
        Type: "",
        UIType: "",
        Required: false,
        Unique: false,
        Reference: "",
        Default: "",
        UseLabelValue: false,
        LabelValue: [
          {
            Label: "",
            Value: "",
          },
        ],
      },
    ],
  };

  const [form, setForm] = useState(initial);

  const typeOptions = [
    { Label: "String", Value: "String" },
    { Label: "Number", Value: "Number" },
    { Label: "Boolean", Value: "Boolean" },
  ];
  const uiOptions = [
    { Label: "CheckBox", Value: "CheckBox" },
    { Label: "DatePick", Value: "DatePick" },
    { Label: "Input", Value: "Input" },
    { Label: "RadioButton", Value: "RadioButton" },
    { Label: "Select", Value: "Select" },
    { Label: "Switch", Value: "Switch" },
  ];

  const refOptions = [{ Label: "Test", Value: "Test" }];

  const handleSubmit = async (values, actions) => {
    const res = await fetch("http://localhost:5000/api/model/", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((resdata) => resdata)
      .catch((err) => console.log(err));

    const { data, result } = await res.json();
    if (result) {
      console.log(data);
    }
  };

  return (
    <div>
      <p>Add New Model</p>
      <Formik initialValues={form} onSubmit={handleSubmit} enableReinitialize>
        {(formik) => (
          <Form>
            <Input
              name="ModelName"
              label="Model Name"
              placeholder="Model Name"
              formik={formik}
            />

            <FieldArray name="Fields">
              {({ remove, push }) => (
                <>
                  <div>
                    {formik.values.Fields?.length > 0 &&
                      formik.values.Fields.map((index, i) => (
                        <div key={`field-${i}`}>
                          <div key={i}>
                            <div className="flex gap-1">
                              <Input
                                label="Field Name"
                                name={`Fields.${i}.FieldName`}
                                placeholder="Field Name"
                                formik={formik}
                              />
                              <Select
                                label="Type"
                                name={`Fields.${i}.Type`}
                                options={typeOptions}
                                formik={formik}
                              />
                              <Select
                                label="UI Type"
                                name={`Fields.${i}.UIType`}
                                options={uiOptions}
                                formik={formik}
                              />
                              <Switch
                                label="Is Required ?"
                                name={`Fields.${i}.Required`}
                              />
                              <Switch
                                label="Is Unique ?"
                                name={`Fields.${i}.Unique`}
                              />

                              <Select
                                label="Field Reference"
                                name={`Fields.${i}.Reference`}
                                options={refOptions}
                                formik={formik}
                              />
                              <Input
                                label="Default Value"
                                name={`Fields.${i}.Default`}
                                placeholder="Default Value"
                                formik={formik}
                              />

                              <div onClick={() => remove(i)}>
                                <Button
                                  type="button"
                                  label="Remove"
                                  color="bg-red-500"
                                  hoverColor="bg-red-600"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    <div
                      onClick={() =>
                        push({
                          FieldName: "",
                          Type: "",
                          UIType: "",
                          Required: false,
                          Unique: false,
                          Reference: "",
                          Default: "",
                          LabelValue: [
                            {
                              Label: "",
                              Value: "",
                            },
                          ],
                        })
                      }
                    >
                      <Button
                        type="button"
                        label="Add"
                        color="bg-green-500"
                        hoverColor="bg-green-600"
                      />
                    </div>
                  </div>
                </>
              )}
            </FieldArray>

            <Button
              type="submit"
              label="Save"
              color="bg-blue-500"
              hoverColor="bg-blue-600"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ModelForm;
