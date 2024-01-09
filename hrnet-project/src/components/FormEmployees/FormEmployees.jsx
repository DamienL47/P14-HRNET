import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAllFields } from "../../store/reducers/formReducer";
import moment from "moment";
import DateTimePicker from "react-dl-datetimepicker";
import { FORMAT_DATE } from "react-dl-datetimepicker/dist/Constants";
import s from "./style.module.css";
import { useNavigate } from "react-router-dom";

export const FormEmployees = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    startDate: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    department: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "zip") {
      if (/^\d*$/.test(e.target.value)) {
        setEmployeeData({
          ...employeeData,
          address: {
            ...employeeData.address,
            [e.target.name]: e.target.value,
          },
        });
      }
    } else if (e.target.id in employeeData.address) {
      setEmployeeData({
        ...employeeData,
        address: {
          ...employeeData.address,
          [e.target.id]: e.target.value,
        },
      });
    } else {
      setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
    }
  };

  const handleBirthdayChange = (newDateTime) => {
    setEmployeeData({
      ...employeeData,
      birthday: newDateTime,
    });
  };

  const handleDateTimeChange = (newDateTime) => {
    setEmployeeData({
      ...employeeData,
      startDate: newDateTime,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAllFields(employeeData));

    const existingEmployees =
      JSON.parse(localStorage.getItem("employeeData")) || [];

    existingEmployees.push(employeeData);

    localStorage.setItem("employeeData", JSON.stringify(existingEmployees));

    Navigate("/employees");
  };

  const inputField = {
    width: "97%",
    margin: "10px 0",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  // composant de formulaire
  return (
    <>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          id="first-name"
          value={employeeData.firstName}
          onChange={handleChange}
          name="firstName"
        />

        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          id="last-name"
          value={employeeData.lastName}
          onChange={handleChange}
          name="lastName"
        />

        <label htmlFor="date-of-birth">Date of Birth</label>
        <DateTimePicker
          value={employeeData.birthday}
          onChange={handleBirthdayChange}
          formatDate={FORMAT_DATE[0]}
          LANGUAGE={"en"}
          showTime={false}
          name="birthday"
          style={inputField}
        />
        <label htmlFor="start-date">Start Date</label>
        <DateTimePicker
          value={employeeData.startDate}
          onChange={handleDateTimeChange}
          formatDate={FORMAT_DATE[0]}
          LANGUAGE={"en"}
          showTime={false}
          name="startDate"
          style={inputField}
        />

        <fieldset className={s.address}>
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            value={employeeData.address.street}
            onChange={handleChange}
            name="street"
          />

          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            value={employeeData.address.city}
            onChange={handleChange}
            name="city"
          />

          <label htmlFor="state">State</label>
          <input
            name="state"
            id="state"
            value={employeeData.address.state}
            onChange={handleChange}
          />

          <label htmlFor="zip-code">Zip Code</label>
          <input
            id="zip-code"
            type="text"
            value={employeeData.address.zip}
            onChange={handleChange}
            name="zip"
          />
        </fieldset>

        <label htmlFor="department">Department</label>
        <select
          name="department"
          id="department"
          value={employeeData.department}
          onChange={handleChange}
        >
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>
        <button type="submit" className={s.btnSend}>
          Save
        </button>
      </form>
    </>
  );
};
