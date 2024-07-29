import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { showAlert } from "../static/alert";
import "./style.css";
import { useVerifyPaymentMutation } from "../service/admin/sub.service";
import rtkMutation from "../utils/rtkMutation";
import { Spinner } from "flowbite-react";
import { useDispatch } from "react-redux";
import { clearFormData } from "../redux/slices/register.slice";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = new URLSearchParams(location.search);
  const [verifyPayment, { isLoading, isSuccess, error }] =
    useVerifyPaymentMutation();

  const gateway = params.get("gateway");

  const handleGateway = async (gateway) => {
    switch (gateway) {
      case "paystack": {
        const trxref = params.get("trxref");
        const reference = params.get("reference");
        const values = { gateway, trxref, reference };
        await rtkMutation(verifyPayment, values);
        break;
      }
      case "flutterwave": {
        const tx_ref = params.get("tx_ref");
        const transaction_id = params.get("transaction_id");
        const values = { gateway, tx_ref, transaction_id };
        await rtkMutation(verifyPayment, values);
        break;
      }
      default:
        showAlert("", "Payment method not recognized", "error");
    }
  };

  useEffect(() => {
    if (gateway) {
      handleGateway(gateway);
    }
  }, [gateway]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearFormData());
      showAlert("Success", "Payment processed successfully", "success");
      navigate("/signin");
    }
    if (error) {
      showAlert(
        "Error",
        error?.data?.message || "An error occured verifying your payment",
        "error"
      );
      navigate("/signin");
    }
  }, [isSuccess, error, navigate, dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {isLoading ? (
        <div className="flex flex-col items-center">
          <Spinner size={40} color={"#34b53a"} />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="success-msg pb-24">Thank You For Subscribing</p>
          <p className="confirmed-msg pb-10">Your payment has been confirmed</p>
          <Link
            className="success-btn text-center items-center justify-center p-5"
            to="/signin"
          >
            Proceed to login
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
