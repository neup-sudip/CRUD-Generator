import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewModel = () => {
  const { id } = useParams();
  const [model, setModel] = useState("");

  const getModel = async () => {
    const res = await fetch(`http://localhost:5000/api/model/${id}`, {
      method: "GET",
    })
      .then((resdata) => resdata)
      .catch((err) => console.log(err));

    const { data, result } = await res.json();

    if (result) {
      setModel(data);
    }
  };

  useEffect(() => {
    if (id) {
      getModel();
    }
    // eslint-disable-next-line
  }, []);
  return <div>{model?.ModelName}</div>;
};

export default ViewModel;
