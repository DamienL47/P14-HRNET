import { render, screen } from "@testing-library/react";
import { FormEmployees } from "../components/FormEmployees/FormEmployees";

describe("FormEmployee", () => {
  it("renders FormEmployee component", () => {
    render(<FormEmployees />);
    const formElement = screen.getByRole("form");
    screen.debug(formElement);
    // expect(formElement).toBeInTheDocument();
  });
});
