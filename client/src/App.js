import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ModelList from "./components/models/ModelList";
import AddModel from "./components/models/AddModel";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/model">
        <Route index element={<ModelList />} />
        <Route path="add" element={<AddModel />} />
        <Route path="view/:id" element={<Home />} />
        {/* <Route path="view/:id" element={<Home/>}/> */}
      </Route>
    </Routes>
  );
}

export default App;
