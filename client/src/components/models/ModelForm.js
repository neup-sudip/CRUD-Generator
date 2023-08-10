import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import Input from "../form/Input";
import Button from "../form/Button";
import ModelFieldArray from "./FieldArray";

const ModelForm = ({ editData }) => {
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
        RefTitle: "",
        Default: "",
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
  const [modelList, setModelList] = useState([]);
  const [refOpt, setRefOpt] = useState([]);
  const [fieldOpt, setFieldOpt] = useState([]);

  const getModels = async () => {
    const res = await fetch("http://localhost:5000/api/model/list", {
      method: "GET",
    })
      .then((resdata) => resdata)
      .catch((err) => console.log(err));

    const { data, result } = await res.json();

    if (result) {
      setModelList(data);
      setRefOpt(
        data?.map((model) => ({
          Label: model?.ModelName,
          Value: model?.ModelName,
        }))
      );
    }
  };

  useEffect(() => {
    getModels();
  }, []);

  useEffect(() => {
    if (editData) {
      editData?.Fields?.forEach((item, i) => {
        item?.Reference && getRefField(i, item?.Reference);
      });
      setForm((prev) => ({ ...prev, ...editData }));
    }
    // eslint-disable-next-line
  }, [editData]);

  const getRefField = (idx, value) => {
    const model = modelList?.find((item) => item?.ModelName === value);

    const mFieldOpt = model?.Fields?.map((field) => ({
      Label: field?.FieldName,
      Value: field?.FieldName,
    }));

    setFieldOpt((prev) => [
      ...prev?.filter((item) => item?.idx !== idx),
      { idx: idx, opt: mFieldOpt },
    ]);
  };

  const handleSelectChange = (formik, e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);

    if (name?.includes("Reference")) {
      const fId = name?.indexOf(".") + 1;
      const lId = name?.lastIndexOf(".");
      const idx = Number(name?.slice(fId, lId));
      getRefField(idx, value);
    }
  };

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

            <ModelFieldArray
              formik={formik}
              refOpt={refOpt}
              fieldOpt={fieldOpt}
              handleSelectChange={handleSelectChange}
            />

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
