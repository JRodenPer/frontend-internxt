import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loading from "./Loading";

describe("Loading Component", () => {
  it("should render the loading spinner", () => {
    render(<Loading />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
