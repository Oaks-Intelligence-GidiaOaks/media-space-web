import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";

const useStripePayment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const confirmPayment = async (clientSecret) => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: "Cardholder Name", // Adjust as needed
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
      return false;
    } else {
      if (result.paymentIntent.status === "succeeded") {
        return true;
      }
    }
    return false;
  };

  return { confirmPayment, error };
};

export default useStripePayment;
