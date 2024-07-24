import { Link } from "react-router-dom";
import "./style.css";

const PaymentSuccess = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center">
        <p className="success-msg pb-24">Thank You For Subscribing</p>
        <p className="confirmed-msg pb-10">Your payment has been confirmed</p>
        <Link className="success-btn" to="/signin">
          Track Order
        </Link>{" "}
      </div>
    </div>
  );
};

export default PaymentSuccess;
