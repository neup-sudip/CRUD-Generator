import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ModelList = () => {
  const [models, setModels] = useState([]);

  const getModels = async () => {
    const res = await fetch("http://localhost:5000/api/model/list", {
      method: "GET",
    })
      .then((resdata) => resdata)
      .catch((err) => console.log(err));

    const { data, result } = await res.json();

    if (result) {
      setModels(data);
    }
  };

  useEffect(() => {
    getModels();
  }, []);
  return (
    <div>
      <p>Models List</p>
      <Link to="/model/add">Add New Model</Link>
      {models?.map((model, idx) => (
        <div key={idx}>
          <Link to={`/model/view/${model?._id}`}>{model?.ModelName}</Link>
          <span className="ml-5">Edit</span>
          <Link to={`/model/edit/${model?._id}`}>{model?.ModelName}</Link>
        </div>
      ))}
    </div>
  );
};

export default ModelList;
