import React from "react";
import { IMortgageResultProps } from "./types/types";
import { mortgageFormula } from "./utils/utils";

// Creating a functional component as it doesn't use any hooks
const Result: React.FC<IMortgageResultProps> = ({
  principalLoanAmount,
  annualInterestRate,
  mortgageYears,
}) => {
  // Using the function with the formula that gives the monthly payment amount
  const result = mortgageFormula({
    principalLoanAmount,
    annualInterestRate,
    mortgageYears,
  });
  return (
    <div className="text-white my-10 w-full flex flex-row items-center justify-between">
      {/* Displaying to the client the different results including the errors */}
      <p className="text-left text-2xl font-bold">
        {result === "Are you Elon?" ? (
          <span className="text-sm text-center">{result}</span>
        ) : result === "0.00" ? (
          <span className="text-red-700">{`$ ${result}`}</span>
        ) : (
          `$ ${result}`
        )}
      </p>
    </div>
  );
};

export default Result;
