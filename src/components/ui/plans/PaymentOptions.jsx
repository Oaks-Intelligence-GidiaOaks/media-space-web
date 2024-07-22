import PropTypes from "prop-types";
import { Spinner } from "flowbite-react";
import wave from "../../../assets/flutter.png";
import paystack from "../../../assets/paystack.png";
import stripeLogo from "../../../assets/stripe.png";
import StripeCheckout from "./StripeCheckout";
import useStripePayment from "./StripePayment";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../../../static/alert";
import { PAYMENT_SUCCESS } from "../../../routes/CONSTANT";

const PaymentOptions = ({
  userLocation,
  id,
  gateway,
  handleGatewaySelection,
  trial,
  setTrial,
  initiatePayment,
  isLoading,
  clientSecret,
  confirmPayment,
}) => {
  const { confirmPayment: stripeConfirmPayment, error } = useStripePayment();
  const navigate = useNavigate();

  const handleConfirmPayment = async () => {
    const paymentConfirmed = await stripeConfirmPayment(clientSecret);
    if (paymentConfirmed) {
      showAlert(
        "Payment Successful",
        "Your payment was successful!",
        "success"
      );
      navigate(PAYMENT_SUCCESS);
    } else if (error) {
      showAlert("Payment Failed", error, "error");
    }
  };

  return (
    <div className="w-full flex flex-col justify-center gap-10">
      <h2 className="cart-title">Payment options</h2>
      <div className="flex flex-col gap-2">
        <p className="billing-period">Pay With:</p>
        <div className="w-full items-center gap-3">
          {userLocation === "Nigeria" ? (
            <div className="flex flex-wrap gap-2">
              {id === "669149f11eec17ef058d668e" && (
                <button
                  className={`p-2 border shadow ${
                    trial === true ? "bg-green-500 text-white" : ""
                  }`}
                  onClick={() => setTrial(true)}
                >
                  Start with Trial
                </button>
              )}
              <button
                className={`p-2 border shadow flex items-center ${
                  gateway === "flutterwave" ? "border-1 border-green-500" : ""
                }`}
                onClick={() => handleGatewaySelection("flutterwave")}
              >
                <img src={wave} height={100} width={100} alt="Flutterwave" />
              </button>
              <button
                className={`p-2 border shadow ${
                  gateway === "paystack" ? "border-1 border-green-500" : ""
                }`}
                onClick={() => handleGatewaySelection("paystack")}
              >
                <img src={paystack} height={100} width={100} alt="Paystack" />
              </button>
            </div>
          ) : (
            <>
              <button
                className={`p-2 border shadow ${
                  gateway === "stripe" ? "border-1 border-green-500" : ""
                }`}
                onClick={() => handleGatewaySelection("stripe")}
              >
                <img src={stripeLogo} height={50} width={80} alt="Stripe" />
              </button>
              {gateway === "stripe" && clientSecret && (
                <StripeCheckout
                  handlePaymentSuccess={handleConfirmPayment}
                  clientSecret={clientSecret}
                />
              )}
            </>
          )}

          {!clientSecret && (
            <div className="mt-5 justify-center items-center w-full">
              <button
                className={`p-2 border shadow rounded-sm ${
                  gateway
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                onClick={initiatePayment}
                disabled={!gateway}
              >
                {isLoading ? <Spinner /> : "Proceed"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

PaymentOptions.propTypes = {
  userLocation: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  gateway: PropTypes.string.isRequired,
  handleGatewaySelection: PropTypes.func.isRequired,
  trial: PropTypes.bool.isRequired,
  setTrial: PropTypes.func.isRequired,
  initiatePayment: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  clientSecret: PropTypes.string,
  confirmPayment: PropTypes.func.isRequired,
};

export default PaymentOptions;
