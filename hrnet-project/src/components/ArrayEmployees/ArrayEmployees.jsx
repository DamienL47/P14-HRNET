import React, { useState } from "react";
import s from "./style.module.css";

export function ArrayEmployees() {
  const listEmployees = localStorage.getItem("employeeData");
  const [employeeData, setEmployeeData] = useState(
    listEmployees ? JSON.parse(listEmployees) : []
  );

  const [sortingField, setSortingField] = useState(null);
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const handleSorting = (field) => {
    if (field === sortingField) {
      setSortingOrder(sortingOrder === "asc" ? "desc" : "asc");
    } else {
      setSortingField(field);
      setSortingOrder("asc");
    }

    const sortedEmployees = [...employeeData].sort((a, b) => {
      if (field === "birthday" || field === "startDate") {
        const dateA = a[field] ? new Date(a[field].date) : new Date(0);
        const dateB = b[field] ? new Date(b[field].date) : new Date(0);
        return sortingOrder === "asc" ? dateA - dateB : dateB - dateA;
      }
      // Pour les champs de type string
      else {
        const valueA = a[field] || "";
        const valueB = b[field] || "";
        return sortingOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
    });
    setEmployeeData(sortedEmployees);
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
                  <th className={s.tableHeader}>
                    Department
                    <span
                      className={s.sort}
                      onClick={() => handleSorting("department")}
                    >
                      {sortingField === "department"
                        ? sortingOrder === "asc"
                          ? "v"
                          : "^"
                        : "^"}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {employeeData.map((employee, index) => (
                  <tr key={index}>
                    <td className={s.tableData}>{employee.firstName}</td>
                    <td className={s.tableData}>{employee.lastName}</td>
                    <td className={s.tableData}>{employee.birthday.date}</td>
                    <td className={s.tableData}>{employee.startDate.date}</td>
                    <td className={s.tableData}>
                      {`${employee.address.street}, ${employee.address.city}, ${employee.address.state}, ${employee.address.zip}`}
                    </td>
                    <td className={s.tableData}>{employee.department}</td>
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
