import React from "react";
import { render, screen } from "@testing-library/react";
import Result from "@/components/mortgageCalculator/Result";
import "@testing-library/jest-dom";

describe("Result Component", () => {
  it("should display the calculated result", () => {
    render(
      <Result
        principalLoanAmount="1000"
        annualInterestRate="5"
        mortgageYears="20"
      />
    );

    expect(screen.getByText(/\$\s[\d,]+\.\d{2}/)).toBeInTheDocument();
  });

  it("should display a custom message for specific values", () => {
    render(
      <Result
        principalLoanAmount="9999999999999"
        annualInterestRate="10"
        mortgageYears="20"
      />
    );

    expect(screen.getByText("Are you Elon?")).toBeInTheDocument();
  });

  it("should display an error for invalid values", () => {
    render(
      <Result
        principalLoanAmount="-1000"
        annualInterestRate="5"
        mortgageYears="20"
      />
    );

    expect(screen.getByText("$ 0.00")).toBeInTheDocument();
  });
});
