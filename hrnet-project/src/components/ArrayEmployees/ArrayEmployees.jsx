import s from "./style.module.css";

export function ArrayEmployees() {
  const listEmployees = localStorage.getItem("employeeData");
  const employeeData = listEmployees ? JSON.parse(listEmployees) : [];

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
                  <th className={s.tableHeader}>First Name</th>
                  <th className={s.tableHeader}>Last Name</th>
                  <th className={s.tableHeader}>Birthday</th>
                  <th className={s.tableHeader}>Start Date</th>
                  <th className={s.tableHeader}>Address</th>
                  <th className={s.tableHeader}>Department</th>
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
