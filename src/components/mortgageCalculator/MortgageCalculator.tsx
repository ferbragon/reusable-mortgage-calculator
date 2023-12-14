"use client";
import React, { Component } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import Result from "./Result";
import { mortgageYears } from "./utils/utils";
import {
  IMortgageCalculatorProps,
  IMortgageCalculatorState,
} from "./types/types";
import Link from "next/link";
import { validateInputs } from "./validations/validations";

/* I create a class component to centralize state management, ensure compatibility
 with other tools and libraries, and avoid interfering with custom hooks from other 
 applications. */
class MortgageCalculator extends Component<
  IMortgageCalculatorProps,
  IMortgageCalculatorState
> {
  constructor(props: IMortgageCalculatorProps) {
    super(props);
    // Assigning initial values in case no props are passed to the component.
    this.state = {
      principalLoanAmount:
        typeof props.loanAmountValue === "string" ? props.loanAmountValue : "0",
      annualInterestRate:
        typeof props.annualInterestValue === "string"
          ? props.annualInterestValue
          : "0",
      mortgageYears: "10",
      // The 'errors' state will allow me to display validation errors to the client.
      errors: {},
    };

    // Binding the methods to the class context.
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    // Updating the state with the new value.
    this.setState(
      {
        ...this.state,
        [name]: value,
      },
      () => {
        // After updating the state, I validate the inputs.
        const errors = validateInputs(this.state);
        this.setState({ errors });
      }
    );
  }

  handleSelectChange(value: string) {
    //  Updating the state with the new value for mortgageYears.
    this.setState(
      {
        mortgageYears: value,
      },
      () => {
        // After updating the state, I validate the inputs.
        const errors = validateInputs(this.state);
        this.setState({ errors });
      }
    );
  }

  render() {
    return (
      <div className="min-w-[18rem] absolute top-[1/2] right-[1/2] h-[31rem] flex flex-col items-center justify-between">
        <Card className="w-full bg-[#0a0a0a] border border-[rgba(255,255,255,0.09)] rounded-[13px] overflow-y-auto">
          <CardHeader>
            <CardTitle className="text-white mb-4">
              Calculate your mortgage
            </CardTitle>
            {/* Sending the state values to the Result component, which handles the calculation 
            and displays the monthly mortgage payment result. */}
            <Result
              annualInterestRate={this.state.annualInterestRate}
              principalLoanAmount={this.state.principalLoanAmount}
              mortgageYears={this.state.mortgageYears}
            />
            <CardDescription className="text-sm text-white mt-2">
              USD/monthly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  {/* Using conditional styles to display the error for each input */}
                  <Input
                    className={`bg-[#0a0a0a] border ${
                      this.state.errors.principalLoanAmount
                        ? "border-red-700 text-red-700"
                        : "border-[rgba(255,255,255,0.09)] text-white"
                    }`}
                    name="principalLoanAmount"
                    placeholder="Principal loan amount"
                    type="number"
                    value={this.state.principalLoanAmount}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input
                    className={`bg-[#0a0a0a] border ${
                      this.state.errors.annualInterestRate
                        ? "border-red-700 text-red-700"
                        : "border-[rgba(255,255,255,0.09)] text-white"
                    }`}
                    name="annualInterestRate"
                    placeholder="Annual interest rate"
                    type="number"
                    value={this.state.annualInterestRate}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Select onValueChange={this.handleSelectChange}>
                    <SelectTrigger className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.09)] text-white">
                      <SelectValue
                        id="mortgageYears"
                        className={`bg-[#0a0a0a] border ${
                          this.state.errors.mortgageYears
                            ? "border-red-700 text-red-700"
                            : "border-[rgba(255,255,255,0.09)] text-white"
                        }`}
                        placeholder={"Select mortgage years"}
                      />
                    </SelectTrigger>
                    <SelectContent
                      className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.09)] text-white"
                      position="popper"
                    >
                      {mortgageYears && mortgageYears.length > 0 ? (
                        mortgageYears.map((year, index) => (
                          //Rendering a SelectItem component for each value from the imported mortgageYears array in ./utils/utils
                          <SelectItem
                            className="bg-[#0a0a0a] text-white"
                            key={index}
                            value={year}
                          >
                            {year}
                          </SelectItem>
                        ))
                      ) : (
                        // Sending an error if the mortgageYears array is empty.
                        <span>There was an error</span>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {/* // If the 'button' prop is not passed, the button is not rendered */}
            {this.props.button !== undefined && (
              <Button
                className="bg-[#fafafa] text-black hover:bg-gray-300"
                asChild
              >
                <Link
                  href={
                    this.props.linkButton !== undefined
                      ? this.props.linkButton
                      : ""
                  }
                >
                  {this.props.button}
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
        {/* If there are any errors in the validations, they are displayed to the client. */}
        {Object.keys(this.state.errors).length > 0 && (
          <Alert className="mt-4 w-full" variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {this.state.errors.annualInterestRate
                ? this.state.errors.annualInterestRate
                : this.state.errors.principalLoanAmount
                ? this.state.errors.principalLoanAmount
                : this.state.errors.mortgageYears
                ? this.state.errors.mortgageYears
                : null}
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  }
}

export default MortgageCalculator;
