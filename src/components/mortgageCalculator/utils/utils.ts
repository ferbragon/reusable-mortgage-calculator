import { IMortgageResultProps } from "../types/types";

export const mortgageYears = ["10", "15", "20", "25", "30", "40"];

export function mortgageFormula(data: IMortgageResultProps) {
  // Ensuring P is a number and using a default value of 0 if it's not
  const P =
    typeof data.principalLoanAmount === "string"
      ? Number.parseInt(data.principalLoanAmount)
      : 0;
  // Ensuring annualInterestRate and mortgageYears are also numbers
  const annualInterestRate =
    typeof data.annualInterestRate === "string"
      ? Number.parseInt(data.annualInterestRate)
      : 0;
  const mortgageYears = Number.parseInt(data.mortgageYears);
  // Converting annual interest rate to a monthly rate in fractional form
  const r = annualInterestRate / 100 / 12;
  // Total number of payments (number of months)
  const n = mortgageYears * 12;
  // Calculating the monthly payment
  const payment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  // Checking if payment is NaN and formatting the payment as a string
  if (isNaN(payment) || payment <= 0 || annualInterestRate < 0) {
    return "0.00";
    // If the payment amount equals more than Musk's wealth, return the string
  } else if (payment > 87999999999.99) {
    return "Are you Elon?";
  } else {
    return payment.toLocaleString("en-US", {
      style: "decimal",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  }
}

export function formatNumberString(inputStr: string) {
  // Remove everything that is not a number, dot, or comma
  const cleanedStr = inputStr.replace(/[^\d.,]/g, "");

  // Convert the string to a number
  const numberValue = parseFloat(cleanedStr.replace(/,/g, ""));

  // Verify if the number is valid
  if (isNaN(numberValue)) {
    return "0.00"; // or handle the error in some way
  }

  // Format and return the number
  return numberValue.toLocaleString("en-US", {
    style: "decimal",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}
