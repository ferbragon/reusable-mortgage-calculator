import { mortgageYears } from "../utils/utils";
import {
  IMortgageCalculatorState,
  IMortgageCalculatorErrors,
} from "../types/types";

/* A validation function is created to modify it or to have the freedom to install 
or not install libraries like Formik. */
export function validateInputs(state: IMortgageCalculatorState) {
  let errors: IMortgageCalculatorErrors = {};

  // principalLoanAmount validation
  if (state.principalLoanAmount === undefined) {
    return errors;
  } else {
    const principalLoanAmount = parseFloat(state.principalLoanAmount);
    if (isNaN(principalLoanAmount) || principalLoanAmount <= 0) {
      errors.principalLoanAmount = "Enter only numbers greater than zero.";
    }
  }

  // annualInterestRate validation
  if (state.annualInterestRate === undefined) {
    return errors;
  } else {
    const annualInterestRate = parseFloat(state.annualInterestRate);
    if (isNaN(annualInterestRate) || annualInterestRate <= 0) {
      errors.annualInterestRate = "Enter only numbers greater than zero.";
    }
    if (annualInterestRate >= 150) {
      errors.annualInterestRate = "Be careful with high interest rates.";
    }
  }

  // mortgageYears validation
  if (!mortgageYears.includes(state.mortgageYears)) {
    errors.mortgageYears = "Mortgage years not found.";
  }

  // More validations...
  return errors;
}
