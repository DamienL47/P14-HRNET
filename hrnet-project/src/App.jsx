import React from "react";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { ListEmployees } from "./pages/ListEmployees";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employees" element={<ListEmployees />} />
    </Routes>
  );
}

export default App;
