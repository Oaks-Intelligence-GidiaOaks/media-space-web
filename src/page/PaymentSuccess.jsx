import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { showAlert } from "../static/alert";
import "./style.css";
import { useVerifyPaymentMutation } from "../service/admin/sub.service";
import { Spinner } from "flowbite-react";
import { useDispatch } from "react-redux";
import { clearFormData } from "../redux/slices/register.slice";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const gateway = params.get("gateway");

  const [verifyPayment, { isLoading, isSuccess, error }] =
    useVerifyPaymentMutation();

  const handleGateway = async (gateway) => {
    let values = {};
    switch (gateway) {
      case "paystack":
        values = {
          gateway,
          trxref: params.get("trxref"),
          reference: params.get("reference")
        };
        break;
      case "flutterwave":
        values = {
          gateway,
          tx_ref: params.get("tx_ref"),
          transaction_id: params.get("transaction_id")
        };
        break;
      case "stripe":
        showAlert("Success", "Payment processed successfully", "success");
        navigate("/signin");
        return;
      default:
        showAlert("Error", "Payment method not recognized", "error");
        return;
    }
    await verifyPayment(values);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearFormData());
      showAlert("Success", "Payment processed successfully", "success");
      navigate("/signin");
    } else if (error) {
      showAlert(
        "Error",
        error?.data?.message || "An error occurred verifying your payment",
        "error"
      );
      navigate("/signin");
    }
  }, [isSuccess, error, navigate, dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center">
        <p className="success-msg pb-24">Thank You For Subscribing</p>
        <p className="confirmed-msg pb-10">Your payment has been confirmed</p>
        <button
          className="success-btn text-center items-center justify-center p-5"
          onClick={() => handleGateway(gateway)}
          disabled={!gateway}
        >
          {isLoading ? (
            <>
              <span className="loading-dots">
                <span className="loading-dots-dot"></span>
                <span className="loading-dots-dot"></span>
                <span className="loading-dots-dot"></span>
              </span>
            </>
          ) : (
            "Proceed to Login"
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
