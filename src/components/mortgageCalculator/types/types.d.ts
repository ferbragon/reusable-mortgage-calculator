export interface IMortgageCalculatorProps {
  button?: string;
  linkButton?: string;
  loanAmountValue?: string;
  annualInterestValue?: string;
}

export interface IMortgageCalculatorErrors {
  principalLoanAmount?: string;
  annualInterestRate?: string;
  mortgageYears?: string;
}

export interface IMortgageCalculatorState {
  principalLoanAmount: string | undefined;
  annualInterestRate: string | undefined;
  mortgageYears: string;
  errors: IMortgageCalculatorErrors;
}

interface IMortgageResultProps {
  principalLoanAmount: string | undefined;
  annualInterestRate: string | undefined;
  mortgageYears: string;
}
