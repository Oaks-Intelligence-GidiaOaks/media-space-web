import PropTypes from "prop-types";
import "./style.css";
import tick from "../../assets/icons/tick.svg";
import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { showAlert } from "../../static/alert";

const SuperAdminPlans = ({
  id,
  title,
  description,
  amount,
  discountOff,
  background,
  currency,
  previousPlanName,
  uniqueFeatures,
  allFeatures,
  usage,
  onSave,
  monthly_price_naira,
  monthly_price_dollar,
  yearly_price_naira,
  yearly_price_dollar,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: title,
    description,
    users: usage,
    monthly_price_naira,
    monthly_price_dollar,
    yearly_price_naira,
    yearly_price_dollar,
    allFeatures: allFeatures.map((feature) => feature.module_name),
  });
  const [newFeature, setNewFeature] = useState("");

  const submitPlan = () => {
    if (validateForm()) {
      onSave(id, formData);
      setOpenModal(false);
    } else {
      showAlert("", "Please fill out all required fields.", "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.allFeatures];
    updatedFeatures[index] = value;
    setFormData((prevData) => ({ ...prevData, allFeatures: updatedFeatures }));
  };

  const addNewFeature = () => {
    if (newFeature) {
      setFormData((prevData) => ({
        ...prevData,
        allFeatures: [...prevData.allFeatures, newFeature],
      }));
      setNewFeature("");
    }
  };

  const validateForm = () => {
    return (
      formData.name &&
      formData.description &&
      formData.users &&
      formData.yearly_price_dollar &&
      formData.yearly_price_naira &&
      formData.monthly_price_dollar &&
      formData.monthly_price_naira
    );
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
              onClick={() => setOpenModal(true)}
            >
              Modify {title}
            </button>
          </div>
        </div>
      </div>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Modify {title}</Modal.Header>
        <Modal.Body>
          <div className="mb-3 flex flex-col gap-1">
            <label htmlFor="name" className="sub-label">
              Name
            </label>
            <input
              name="name"
              className="sub-inputs w-full shadow"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3 flex flex-col gap-1">
            <label htmlFor="description" className="sub-label">
              Description
            </label>
            <input
              name="description"
              className="sub-inputs w-full shadow"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3 flex flex-col gap-1">
            <label htmlFor="users" className="sub-label">
              Usage limit
            </label>
            <input
              name="users"
              className="sub-inputs w-full shadow"
              value={formData.users}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-center gap-2 items-center mb-3 w-full">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="monthly_price_naira" className="sub-label">
                Monthly Price in Naira
              </label>
              <input
                name="monthly_price_naira"
                type="text"
                className="sub-inputs w-full shadow"
                value={formData.monthly_price_naira}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="monthly_price_dollar" className="sub-label">
                Monthly Price in Dollar
              </label>
              <input
                name="monthly_price_dollar"
                type="text"
                className="sub-inputs w-full shadow"
                value={formData.monthly_price_dollar}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex justify-center gap-2 items-center mb-3 w-full">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="yearly_price_naira" className="sub-label">
                Yearly Price in Naira
              </label>
              <input
                name="yearly_price_naira"
                type="text"
                className="sub-inputs w-full shadow"
                value={formData.yearly_price_naira}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="yearly_price_dollar" className="sub-label">
                Yearly Price in Dollar
              </label>
              <input
                name="yearly_price_dollar"
                type="text"
                className="sub-inputs w-full shadow"
                value={formData.yearly_price_dollar}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <hr className="py-5" />

          <div className="mb-3 flex flex-col gap-1">
            <label className="sub-label font-bold pb-3">Feature List</label>
            {formData.allFeatures.map((feature, index) => (
              <input
                key={index}
                className="sub-inputs w-full shadow mb-2"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
              />
            ))}
            <input
              className="sub-inputs w-full shadow mb-2"
              placeholder="Add new feature"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
            />
            <button
              className="p-2 w-[150px] text-sm text-white bg-[#0F5901] rounded-[5px]"
              onClick={addNewFeature}
            >
              Add Feature
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitPlan}>Update Plan</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

SuperAdminPlans.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  usage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  description: PropTypes.string.isRequired,
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  discountOff: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  background: PropTypes.string,
  currency: PropTypes.string,
  previousPlanName: PropTypes.string,
  uniqueFeatures: PropTypes.arrayOf(PropTypes.object).isRequired,
  allFeatures: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSave: PropTypes.func.isRequired, // prop type for the onSave callback
  monthly_price_naira: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  monthly_price_dollar: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  yearly_price_naira: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  yearly_price_dollar: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
};

export default SuperAdminPlans;
