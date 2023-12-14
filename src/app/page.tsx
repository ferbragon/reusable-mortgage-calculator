// Importing the MortgageCalculator component to display it on the Home page
import MortgageCalculator from "@/components/mortgageCalculator/MortgageCalculator";

export default function Home() {
  return (
    // For the purpose of displaying the component, I center it on the screen
    <main className="flex min-h-screen flex-col items-center justify-center">
      <MortgageCalculator
        // Sending initial values as props. All of them are optional

        // Sending the button prop activates the button and the text will be displayed inside the button
        button="Contact Us"
        // The linkButton is optional and will be the redirection URL when clicking the activated button.
        //  If no linkButton is provided, the button will appear but it won't redirect anywhere
        linkButton="https://www.heyhom.mx/?gclid=Cj0KCQiAyeWrBhDDARIsAGP1mWTufoyV8kQMoGmbk6SSD3P0zoiw0AvTawqSw49r5SBYeSMUwp8sdYUaAjmlEALw_wcB"
        // loanAmountValue is the credit value, it accepts strings but will not display any data that is
        // not numeric except the letter "e" which sends an error.
        // If a negative number like '-1000' is sent, the calculator will display 0.00, indicating an error.
        loanAmountValue="1000"
        // annualInterestValue is the interest rate value, it accepts strings but will not display any
        // data that is not numeric except the letter "e" which sends an error.
        // If a negative number like '-1000' is sent, the calculator will display 0.00, indicating an error.
        annualInterestValue="12"
      />
    </main>
  );
}
