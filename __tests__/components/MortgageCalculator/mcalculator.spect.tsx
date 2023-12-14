import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import MortgageCalculator from "@/components/mortgageCalculator/MortgageCalculator";
import "@testing-library/jest-dom";

describe("MortgageCalculator Component", () => {
  it("renders correctly", () => {
    render(<MortgageCalculator />);
    expect(screen.getByText("Calculate your mortgage")).toBeInTheDocument();
  });

  it("updates input values correctly", () => {
    render(<MortgageCalculator />);
    const loanInput = screen.getByPlaceholderText(
      "Principal loan amount"
    ) as HTMLInputElement;
    fireEvent.change(loanInput, { target: { value: "2000" } });
    expect(loanInput.value).toBe("2000");
  });

  it("shows error messages when inputs are invalid", () => {
    render(<MortgageCalculator />);
    const loanInput = screen.getByPlaceholderText("Principal loan amount");
    fireEvent.change(loanInput, { target: { value: "-1000" } });
    expect(screen.getByText(/Error/)).toBeInTheDocument();
  });
});
