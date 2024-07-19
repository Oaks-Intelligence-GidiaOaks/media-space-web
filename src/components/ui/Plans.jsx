import PropTypes from "prop-types";
import "./style.css";
import tick from "../../assets/icons/tick.svg";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../../static/alert";
import { LOGIN, PAYMENT_SUCCESS } from "../../routes/CONSTANT";
import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { useInitializePaymentMutation } from "../../service/admin/sub.service";
import rtkMutation from "../../utils/rtkMutation";

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
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [gateway, setGateway] = useState("");

  const handleGatewaySelection = (selectedGateway) => {
    setGateway(selectedGateway);
  };

  const [initiatePay] = useInitializePaymentMutation();

  const submitPlan = async () => {
    console.log(id, organization_id, userLocation);
    if (id === "669149f11eec17ef058d668b") {
      showAlert("Basic Plan Selected", "Verify your email to Login", "success");
      navigate(LOGIN);
    } else if (id === "669149f11eec17ef058d668e") {
      showAlert(
        "Elite Plan Selected",
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
      plan_type,
      is_trial: false,
      country: userLocation,
      redirect_url: PAYMENT_SUCCESS,
    };

    try {
      const response = await rtkMutation(initiatePay, data);
      if (
        response.success &&
        response.data &&
        response.data.authorization_url
      ) {
        window.location.href = response.data.authorization_url;
      } else {
        showAlert(
          "Payment Initialization Failed",
          response.message || "An error occurred.",
          "error"
        );
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
      <div
        className={`rounded-[10px] plan-box shadow hover:border hover:border-[#0f5901] ${
          background ? `bg-[${background}]` : "bg-[#fbfbfb]"
        }`}
      >
        <div className="p-3 h-full">
          <div className="relative h-full">
            <p className="plan-title pb-1">{title}</p>
            <p className="plan-description flex-wrap mb-3">{description}</p>
            <div className="flex gap-1 items-center justify-start pb-2">
              <p className="plan-amount">
                {amount !== "free" && amount !== "negotiable" ? (
                  <>
                    {currency}
                    {amount}
                  </>
                ) : (
                  <>{amount}</>
                )}
              </p>
              {discountOff && (
                <p className="plan-discount line-through">
                  {currency}
                  {discountOff}
                </p>
              )}
            </div>

            <div className="plan-separator w-full mb-4"></div>

            <div className="flex flex-col gap-3">
              {previousPlanName && (
                <div className="flex justify-start items-start gap-2">
                  <img src={tick} alt="" />
                  <p className="plan-details-text flex-wrap">
                    Everything in the {previousPlanName}
                  </p>
                </div>
              )}
              {uniqueFeatures.map((detail, index) => (
                <div
                  key={index}
                  className="flex justify-start items-start gap-2"
                >
                  <img src={tick} alt="" />
                  <p className="plan-details-text flex-wrap">
                    {detail.module_name}
                  </p>
                </div>
              ))}
            </div>

            <button
              className="plan-btn h-[28.77px] w-[198.36px] bg-[#0F5901] rounded-[5px] absolute bottom-0"
              onClick={submitPlan}
            >
              {title === "Basic Plan"
                ? "FREE"
                : title === "Ultimate Plan"
                ? "CONTACT SUPPORT"
                : "BUY NOW"}
            </button>
          </div>
        </div>
      </div>

      {openModal && (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>
            <div className="flex justify-center items-center gap-1">
              Buy <p className="text-[#0F5901] w-auto"> {title}</p>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="w-full items-center gap-3">
              {userLocation === "Nigeria" ? (
                <>
                  <button
                    className={`p-2 border shadow mr-4 ${
                      gateway === "flutterwave" ? "bg-blue-500 text-white" : ""
                    }`}
                    onClick={() => handleGatewaySelection("flutterwave")}
                  >
                    Pay with Flutterwave
                  </button>
                  <button
                    className={`p-2 border shadow ${
                      gateway === "paystack" ? "bg-blue-500 text-white" : ""
                    }`}
                    onClick={() => handleGatewaySelection("paystack")}
                  >
                    Pay with Paystack
                  </button>
                </>
              ) : (
                <button
                  className={`p-2 border shadow ${
                    gateway === "stripe" ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() => handleGatewaySelection("stripe")}
                >
                  Pay with Stripe
                </button>
              )}
              <div className="mt-4">
                <button
                  className={`p-2 border shadow ${
                    gateway
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  onClick={initiatePayment}
                  disabled={!gateway}
                >
                  Proceed
                </button>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
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
