import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInitializePaymentMutation } from "../../../service/admin/sub.service";
import { showAlert } from "../../../static/alert";
import { Modal, Button } from "flowbite-react";
import { LOGIN, PAYMENT_SUCCESS } from "../../../routes/CONSTANT";
import PaymentOptions from "./PaymentOptions";
import rtkMutation from "../../../utils/rtkMutation";
import PlanDetails from "./PlanDetails";
import useStripePayment from "./StripePayment";
import "./style.css";
import { ToWords } from "to-words";
import { formatAmount } from "../../../static/priceFormat";

const Plans = ({
  id,
  title,
  description,
  amount,
  discountOff,
  background,
  currency,
  previousPlanName,
  uniqueFeatures,
  organization_id,
  userLocation,
  plan_type
}) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [gateway, setGateway] = useState("");
  const [trial, setTrial] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);

  const handleGatewaySelection = (selectedGateway) => {
    setGateway(selectedGateway);
  };

  const [initiatePay, { isLoading }] = useInitializePaymentMutation();
  const { confirmPayment } = useStripePayment();

  const submitPlan = async () => {
    if (id === "669149f11eec17ef058d668b") {
      showAlert("Basic Plan Selected", "Verify your email to Login", "success");
      navigate(LOGIN);
    } else if (id === "669149f11eec17ef058d668e") {
      showAlert(
        "Ultimate Plan Selected",
        "An email has been sent to you",
        "success"
      );
      navigate(LOGIN);
    } else {
      setOpenModal(true);
    }
  };

  const isLocal = window.location.hostname === "localhost";
  // Construct the URL based on environment
  const redirectUrl = isLocal
    ? `http://localhost:5173${PAYMENT_SUCCESS}?gateway=${gateway}`
    : `${window.location.protocol}//${window.location.hostname}${PAYMENT_SUCCESS}?gateway=${gateway}`;

  console.log(redirectUrl);

  const initiatePayment = async () => {
    const data = {
      gateway,
      plan_id: id,
      organization_id,
      plan_type: plan_type === "yearly" ? "annually" : "monthly",
      is_trial: trial,
      country: userLocation,
      redirect_url: redirectUrl
    };

    try {
      const response = await rtkMutation(initiatePay, data);
      // console.log(response?.data?.data?.link);

      if (gateway === "flutterwave") {
        const url = response?.data?.data?.link;
        window.location.href = url;
      } else if (gateway === "paystack") {
        const url = response?.data?.authorization_url;
        window.location.href = url;
      } else {
        const secret = response?.data?.client_secret;
        setClientSecret(secret);
      }
    } catch (error) {
      showAlert(
        "Payment Initialization Failed",
        error.message || "An error occurred.",
        "error"
      );
    }
  };

  const formattedAmount = plan_type === "monthly" ? amount : amount * 12;

  const getLocaleCode = (userLocation) => {
    if (userLocation === "Nigeria") {
      return "en-NG";
    } else {
      return "en-US";
    }
  };

  // Function to convert amount to words
  const convertAmountToWords = (amount, userLocation) => {
    const localeCode = getLocaleCode(userLocation);

    const toWords = new ToWords({
      localeCode,
      converterOptions: {
        currency: true
      }
    });

    const adjustedAmount = plan_type === "monthly" ? amount : amount * 12;

    // Handle "free" and "negotiable" cases
    if (
      amount === "free" ||
      (amount === "negotiable" && plan_type === "monthly")
    ) {
      return amount;
    }

    // Convert adjusted amount to words
    return toWords.convert(adjustedAmount);
  };

  return (
    <>
      <PlanDetails
        title={title}
        description={description}
        amount={amount}
        currency={currency}
        discountOff={discountOff}
        previousPlanName={previousPlanName}
        uniqueFeatures={uniqueFeatures}
        submitPlan={submitPlan}
        background={background}
      />
      {openModal && (
        <Modal
          show={openModal}
          onClose={() => setOpenModal(false)}
          size={"6xl"}
        >
          <Modal.Body>
            <div className="flex w-full gap-5 justify-center">
              <div className="w-full flex flex-col gap-10">
                <h2 className="cart-title">Shopping cart</h2>
                <p className="plan-title">{title}</p>
                <div className="flex flex-col">
                  <label htmlFor="billing" className="billing-period pb-1">
                    Billing Period - {plan_type}
                  </label>
                </div>
                <p className="billing-text text-justify">
                  This is a subscription product. After the initial period, a
                  fee of <br />
                  <span className="font-bold text-black">
                    {currency}
                    {formatAmount(formattedAmount)} (
                    {convertAmountToWords(amount, userLocation)})
                  </span>{" "}
                  is due at the next billing cycle. You may cancel at any time.
                </p>
              </div>
              <PaymentOptions
                userLocation={userLocation}
                id={id}
                gateway={gateway}
                handleGatewaySelection={handleGatewaySelection}
                trial={trial}
                setTrial={setTrial}
                initiatePayment={initiatePayment}
                isLoading={isLoading}
                clientSecret={clientSecret}
                confirmPayment={confirmPayment} // This is passed but not used here
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="border-t-0">
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Decline
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

Plans.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  discountOff: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  background: PropTypes.string,
  currency: PropTypes.string,
  previousPlanName: PropTypes.string,
  uniqueFeatures: PropTypes.arrayOf(PropTypes.object).isRequired,
  organization_id: PropTypes.string,
  userLocation: PropTypes.string,
  plan_type: PropTypes.string
};

export default Plans;
