import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App test", () => {
  it("Text Rendering", () => {
    render(<App />);
    expect(screen.queryByText("start color")).toBeTruthy();
    expect(screen.queryByText("end color")).toBeTruthy();
  });
  it("Initial Value", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("midpoint")).toHaveTextContent("50%");
  });
});
