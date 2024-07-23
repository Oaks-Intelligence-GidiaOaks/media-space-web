import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInitializePaymentMutation } from "../../../service/admin/sub.service";
import { showAlert } from "../../../static/alert";
import { Modal, Button } from "flowbite-react";
import { LOGIN, PAYMENT_SUCCESS } from "../../../routes/CONSTANT";
import PaymentOptions from "./PaymentOptions";
import { clearFormData } from "../../../redux/slices/register.slice";
import rtkMutation from "../../../utils/rtkMutation";
import PlanDetails from "./PlanDetails";
import useStripePayment from "./StripePayment";
import "./style.css";

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
  plan_type,
}) => {
  const dispatch = useDispatch();
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

  const initiatePayment = async () => {
    const data = {
      gateway,
      plan_id: id,
      organization_id,
      plan_type: plan_type === "yearly" ? "annually" : "monthly",
      is_trial: trial,
      country: userLocation,
      redirect_url: `http://localhost:5173${PAYMENT_SUCCESS}`,
    };

    try {
      const response = await rtkMutation(initiatePay, data);
      // console.log(response?.data?.data?.link);

      if (gateway === "flutterwave") {
        const url = response?.data?.data?.link;
        dispatch(clearFormData());
        window.location.href = url;
      } else if (gateway === "paystack") {
        const url = response?.data?.authorization_url;
        dispatch(clearFormData());
        window.location.href = url;
      } else {
        const secret = response?.data?.client_secret;
        setClientSecret(secret);
        dispatch(clearFormData());
      }
    } catch (error) {
      showAlert(
        "Payment Initialization Failed",
        error.message || "An error occurred.",
        "error"
      );
    }
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
                <p className="plan-title">Ultimate Plan</p>
                <div className="flex flex-col">
                  <label htmlFor="billing" className="billing-period pb-1">
                    Billing Period - {plan_type}
                  </label>
                </div>
                <p className="billing-text text-justify">
                  This is a subscription product. After the initial period, a
                  fee of{" "}
                  <span>
                    {currency}
                    {amount}
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
  plan_type: PropTypes.string,
};

export default Plans;
