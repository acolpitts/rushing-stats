import { render, screen } from "@testing-library/react";
import App from "./App";

/**
 * TODO: Add more FE tests
 */
test("renders learn react link", () => {
  render(<App />);
  expect(screen.getByRole("search")).toBeInTheDocument(); // has a search bar;
  expect(screen.getByText(/file_download/i)).toBeInTheDocument(); // has a download button
  expect(screen.getByRole("table")).toBeInTheDocument(); // has a list of stats
});
