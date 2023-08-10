import React from "react";
import Input from "../form/Input";
import Select from "../form/Select";
import Switch from "../form/Switch";
import Button from "../form/Button";
import { FieldArray } from "formik";
import { uiOptions, typeOptions } from "../../utils/model";

const ModelFieldArray = ({ formik, refOpt, fieldOpt, handleSelectChange }) => {
  const pushObj = {
    FieldName: "",
    Type: "",
    UIType: "",
    Required: false,
    Unique: false,
    Reference: "",
    RefTitle: "",
    Default: "",
    LabelValue: [
      {
        Label: "",
        Value: "",
      },
    ],
  };
  return (
    <FieldArray name="Fields">
      {({ remove, push }) => (
        <div>
          {formik.values.Fields?.length > 0 &&
            formik.values.Fields.map((_, i) => (
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
                      handleSelectChange={handleSelectChange}
                      formik={formik}
                    />
                    <Select
                      label="UI Type"
                      name={`Fields.${i}.UIType`}
                      options={uiOptions}
                      handleSelectChange={handleSelectChange}
                      formik={formik}
                    />
                    <Switch
                      label="Is Required ?"
                      name={`Fields.${i}.Required`}
                    />
                    <Switch label="Is Unique ?" name={`Fields.${i}.Unique`} />

                    <Select
                      label="Reference"
                      name={`Fields.${i}.Reference`}
                      options={refOpt}
                      handleSelectChange={handleSelectChange}
                      formik={formik}
                    />
                    <Select
                      label="RefTitle"
                      name={`Fields.${i}.RefTitle`}
                      options={fieldOpt?.find((item) => item.idx === i)?.opt}
                      handleSelectChange={handleSelectChange}
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
          <div onClick={() => push(pushObj)}>
            <Button
              type="button"
              label="Add"
              color="bg-green-500"
              hoverColor="bg-green-600"
            />
          </div>
        </div>
      )}
    </FieldArray>
  );
};

export default ModelFieldArray;
