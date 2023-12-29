import React from "react";
// import { Routes, Route } from "react-router-dom";
import { MyDateTimePicker } from "oraclion-date-picker";

function App() {
  return (
    <div>
      <h1>HRNet Project</h1>
      <MyDateTimePicker labelText={"Selectionner une date: "} />
    </div>
    // <Routes>
    //   <Route
    //     path="/"
    //     element={<DatePicker labelText={"Selectionner une date: "} />}
    //   />
    // </Routes>
  );
}

export default App;
