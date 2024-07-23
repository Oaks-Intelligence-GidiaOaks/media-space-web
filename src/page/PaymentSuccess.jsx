import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      Thank you for subscribing, click{" "}
      <Link className="text-blue-700 px-1" to="/signin">
        here
      </Link>{" "}
      to login
    </div>
  );
};

export default PaymentSuccess;
