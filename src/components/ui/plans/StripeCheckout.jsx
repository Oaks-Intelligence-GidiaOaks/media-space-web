import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { useState } from "react";

const StripeCheckout = ({ handlePaymentSuccess, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  console.log(clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: "Cardholder Name", // Replace with actual cardholder's name
      },
    });

    if (error) {
      setError(error.message);
      setIsProcessing(false);
    } else {
      handlePaymentSuccess(clientSecret);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div>{error}</div>}
      <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? "Processing…" : "Pay"}
      </button>
    </form>
  );
};

StripeCheckout.propTypes = {
  handlePaymentSuccess: PropTypes.func.isRequired,
  clientSecret: PropTypes.string.isRequired,
};

export default StripeCheckout;
