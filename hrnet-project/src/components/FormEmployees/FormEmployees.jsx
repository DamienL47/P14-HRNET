import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAllFields } from "../../store/reducers/formReducer";
import DateTimePicker from "react-dl-datetimepicker";
import { FORMAT_DATE } from "react-dl-datetimepicker/dist/Constants";
import s from "./style.module.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const FormEmployees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState({});
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

  const validateFields = () => {
    let errors = {};
    if (!employeeData.firstName.trim())
      errors.firstName = "First name is required";
    if (!employeeData.lastName.trim())
      errors.lastName = "Last name is required";
    if (!employeeData.startDate) errors.startDate = "Start date is required";
    if (!employeeData.address.street.trim())
      errors.street = "Street is required";
    if (!employeeData.address.city.trim()) errors.city = "City is required";
    if (!employeeData.address.zip.trim()) errors.zip = "Zip code is required";
    if (!employeeData.department.trim())
      errors.department = "Department is required";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length === 0) {
      const existingEmployees =
        JSON.parse(localStorage.getItem("employeeData")) || [];

      const employeeExists = existingEmployees.some((employee) => {
        return (
          employee.firstName === employeeData.firstName &&
          employee.lastName === employeeData.lastName &&
          moment(employee.birthday).format("YYYY-MM-DD") ===
            moment(employeeData.birthday).format("YYYY-MM-DD") &&
          moment(employee.startDate).format("YYYY-MM-DD") ===
            moment(employeeData.startDate).format("YYYY-MM-DD") &&
          employee.address.street === employeeData.address.street &&
          employee.address.city === employeeData.address.city &&
          employee.address.state === employeeData.address.state &&
          employee.address.zip === employeeData.address.zip
        );
      });

      if (employeeExists) {
        alert("Employee already exists");
        return;
      }

      dispatch(updateAllFields(employeeData));
      existingEmployees.push(employeeData);
      localStorage.setItem("employeeData", JSON.stringify(existingEmployees));
      setShowConfirmation(true);
    } else {
      setErrors(newErrors);
    }
  };

  const confirmAndNavigate = () => {
    setShowConfirmation(false);
    navigate("/employees");
  };
  const confirm = () => {
    setShowConfirmation(false);
    setEmployeeData({
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
  };

  const inputField = {
    width: "97%",
    margin: "10px 0",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  return (
    <>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit} id="formEmployee">
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          id="first-name"
          value={employeeData.firstName}
          onChange={handleChange}
          name="firstName"
          required={true}
        />
        {errors.firstName && (
          <span className={s.errorMessage}>{errors.firstName}</span>
        )}

        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          id="last-name"
          value={employeeData.lastName}
          onChange={handleChange}
          name="lastName"
          required={true}
        />
        {errors.lastName && (
          <span className={s.errorMessage}>{errors.lastName}</span>
        )}

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
          required={true}
        />
        {errors.startDate && (
          <span className={s.errorMessage}>{errors.startDate}</span>
        )}

        <fieldset className={s.address}>
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            value={employeeData.address.street}
            onChange={handleChange}
            name="street"
            required={true}
          />
          {errors.street && (
            <span className={s.errorMessage}>{errors.street}</span>
          )}

          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            value={employeeData.address.city}
            onChange={handleChange}
            name="city"
            required={true}
          />
          {errors.city && <span className={s.errorMessage}>{errors.city}</span>}

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
            required={true}
          />
          {errors.zip && <span className={s.errorMessage}>{errors.zip}</span>}
        </fieldset>

        <label htmlFor="department">Department</label>
        <select
          name="department"
          id="department"
          value={employeeData.department}
          onChange={handleChange}
          required={true}
        >
          <option value="">Select Department</option>
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>
        {errors.department && (
          <span className={s.errorMessage}>{errors.department}</span>
        )}
        <button type="submit" className={s.btnSend} onClick={handleSubmit}>
          Save
        </button>
      </form>

      {showConfirmation && (
        <div className={s.popup}>
          <div className={s.popupContent}>
            <p>Employee added successfully.</p>
            <button onClick={confirm}>Add More</button>
            <button onClick={confirmAndNavigate}>
              OK Redirect to employees page ?
            </button>
          </div>
        </div>
      )}
    </>
  );
};
