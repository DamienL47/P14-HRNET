import { FormEmployees } from "../components/FormEmployees/FormEmployees";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <div className="containerForm">
        <h1 className="title">HRNet</h1>
        <Link to="/employees" className="link">
          View Current Employees
        </Link>
        <FormEmployees />
      </div>
    </>
  );
}
