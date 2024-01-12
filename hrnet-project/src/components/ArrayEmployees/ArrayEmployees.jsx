import React, { useEffect, useState } from "react";
import s from "./style.module.css";

export function ArrayEmployees() {
  const [employeeData, setEmployeeData] = useState([]);
  const [sortedEmployees, setSortedEmployees] = useState([]);
  const [displayedEmployees, setDisplayedEmployees] = useState([]);
  const [sortingField, setSortingField] = useState(null);
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const listEmployees = localStorage.getItem("employeeData");
    const data = listEmployees ? JSON.parse(listEmployees) : [];
    setEmployeeData(data);
    setSortedEmployees(data);
    setDisplayedEmployees(data);
  }, []);

  useEffect(() => {
    const filteredData = selectedDepartment
      ? sortedEmployees.filter(
          (employee) => employee.department === selectedDepartment
        )
      : sortedEmployees;
    setDisplayedEmployees(filteredData);
  }, [selectedDepartment, sortedEmployees]);

  const handleSorting = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";
    setSortingField(field);
    setSortingOrder(order);

    const sortedData = [...employeeData].sort((a, b) => {
      if (field === "birthday" || field === "startDate") {
        const dateA = a[field] ? new Date(a[field].date) : new Date(0);
        const dateB = b[field] ? new Date(b[field].date) : new Date(0);
        return order === "asc" ? dateA - dateB : dateB - dateA;
      } else {
        const valueA = a[field] || "";
        const valueB = b[field] || "";
        return order === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
    });
    setSortedEmployees(sortedData);
    setDisplayedEmployees(sortedData);
  };

  const handleFilterChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const deleteEmployee = (employeeIndex) => {
    // Filtrer pour obtenir tous les employés sauf celui à l'index spécifié
    const updatedEmployees = employeeData.filter(
      (_, index) => index !== employeeIndex
    );

    // Mettre à jour les états avec la nouvelle liste d'employés
    setEmployeeData(updatedEmployees);
    setSortedEmployees(updatedEmployees);
    setDisplayedEmployees(updatedEmployees);

    // Mise à jour du localStorage avec la nouvelle liste
    localStorage.setItem("employeeData", JSON.stringify(updatedEmployees));
  };

  return (
    <>
      <a href="/" className={s.link}>
        Accueil
      </a>
      <div className={s.container}>
        <div className={s.containerForm}>
          <div className={s.containerFormTitle}>
            <h2 className={s.titleForm}>Current Employees</h2>
          </div>
          <div className={s.containerFormTable}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th className={s.tableHeader}>
                    First Name
                    <span
                      className={s.sort}
                      onClick={() => handleSorting("firstName")}
                    >
                      {sortingField === "firstName"
                        ? sortingOrder === "asc"
                          ? "v"
                          : "^"
                        : "^"}
                    </span>
                  </th>
                  <th className={s.tableHeader}>
                    Last Name
                    <span
                      className={s.sort}
                      onClick={() => handleSorting("lastName")}
                    >
                      {sortingField === "lastName"
                        ? sortingOrder === "asc"
                          ? "v"
                          : "^"
                        : "^"}
                    </span>
                  </th>
                  <th className={s.tableHeader}>
                    Birthday
                    <span
                      className={s.sort}
                      onClick={() => handleSorting("birthday")}
                    >
                      {sortingField === "birthday"
                        ? sortingOrder === "asc"
                          ? "v"
                          : "^"
                        : "^"}
                    </span>
                  </th>
                  <th className={s.tableHeader}>
                    Start Date
                    <span
                      className={s.sort}
                      onClick={() => handleSorting("startDate")}
                    >
                      {sortingField === "startDate"
                        ? sortingOrder === "asc"
                          ? "v"
                          : "^"
                        : "^"}
                    </span>
                  </th>
                  <th className={s.tableHeader}>Address</th>
                  <th className={(s.tableHeader, s.blockDepartment)}>
                    <label htmlFor="department">
                      Department{" "}
                      <span
                        id="departmentPopup"
                        className={s.sort}
                        onClick={togglePopup}
                      >
                        {showPopup ? "v" : "^"}
                      </span>
                    </label>

                    {showPopup && (
                      <select
                        name="department"
                        id="department"
                        className={s.select}
                        value={selectedDepartment}
                        onChange={handleFilterChange}
                      >
                        <option value="">Select Department</option>
                        <option value="Sales">Sales</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Legal">Legal</option>
                      </select>
                    )}
                  </th>
                  <th className={s.tableHeader}>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedEmployees.map((employee, index) => (
                  <tr key={index}>
                    <td className={s.tableData}>{employee.firstName}</td>
                    <td className={s.tableData}>{employee.lastName}</td>
                    <td className={s.tableData}>
                      {employee.birthday &&
                        employee.birthday.date.split("T")[0]}
                    </td>
                    <td className={s.tableData}>
                      {employee.startDate &&
                        employee.startDate.date.split("T")[0]}
                    </td>
                    <td className={s.tableData}>
                      {employee.address &&
                        `${employee.address.street}, ${employee.address.city}, ${employee.address.state}, ${employee.address.zip}`}
                    </td>
                    <td className={s.tableData}>{employee.department}</td>
                    <td className={s.tableData}>
                      <button onClick={() => deleteEmployee(index)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
