import { Spinner } from "flowbite-react";
import { useGetPlansQuery } from "../../service/superadmin/plan.service";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SuperAdminPlans } from "../../components/ui";
import { useUpdatePlanMutation } from "../../service/superadmin/plan.service";
import rtkMutation from "../../utils/rtkMutation";
import { showAlert } from "../../static/alert";

const SuperAdminSubscription = () => {
  const { data: availablePlans, isLoading } = useGetPlansQuery();
  const subscription_plans = availablePlans?.data;

  console.log(subscription_plans);
  const [activeTab, setActiveTab] = useState("monthly");
  const [country, setCountry] = useState("NG"); // Default to Nigeria (NG) or US for United States

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const filteredPlans =
    subscription_plans?.map((plan, index) => {
      const priceField = `${activeTab}_price_${
        country === "NG" ? "naira" : "dollar"
      }`;
      const uniqueFeatures = plan.features.filter(
        (feature) =>
          !(
            index > 0 &&
            subscription_plans[index - 1].features.some(
              (prevFeature) => prevFeature.module_name === feature.module_name
            )
          )
      );

      return {
        ...plan,
        price: plan[priceField],
        uniqueFeatures,
        previousPlanName: index > 0 ? subscription_plans[index - 1].name : null,
      };
    }) || [];

  const [updatePlan, { isSuccess, error }] = useUpdatePlanMutation();

  const handleSave = async (id, updatedData) => {
    const values = { id, ...updatedData };
    // console.log(values);
    await rtkMutation(updatePlan, values);
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert("", "Plan updated Successfully!", "success");
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [isSuccess, error]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center pt-5">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center py-5 gap-4">
            <label htmlFor="filter">Select Country:</label>
            <select
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              className="focus:outline-none focus;ring-0"
            >
              <option value="NG">Nigeria</option>
              <option value="US">Elsewhere</option>
            </select>
          </div>
          <div className="flex justify-center items-center flex-col pt-12 pb-10">
            <div className="flex gap-2 items-center py-5">
              <motion.button
                className={`plan-tab-btn border w-[120px] h-[48px] ${
                  activeTab === "monthly"
                    ? "bg-[#0F5901] text-white"
                    : "bg-transparent text-[#0F5901]"
                }`}
                onClick={() => handleTabClick("monthly")}
                whileHover={{ scale: 1.1 }}
              >
                Monthly
              </motion.button>
              <motion.button
                className={`plan-tab-btn border w-[120px] h-[48px] ${
                  activeTab === "yearly"
                    ? "bg-[#0F5901] text-white"
                    : "bg-transparent text-[#0F5901]"
                }`}
                onClick={() => handleTabClick("yearly")}
                whileHover={{ scale: 1.1 }}
              >
                Yearly
              </motion.button>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center flex-wrap lg:flex-row items-center gap-3"
            >
              {filteredPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SuperAdminPlans
                    id={plan._id}
                    title={plan.name}
                    description={plan.description}
                    amount={plan.price}
                    discountOff={plan.discountOff}
                    details={plan.features}
                    background={plan.background}
                    currency={country === "NG" ? "₦" : "$"}
                    previousPlanName={plan.previousPlanName}
                    uniqueFeatures={plan.uniqueFeatures}
                    allFeatures={plan.features}
                    usage={plan.number_of_users}
                    onSave={handleSave}
                    monthly_price_naira={plan.monthly_price_naira}
                    monthly_price_dollar={plan.monthly_price_dollar}
                    yearly_price_naira={plan.yearly_price_naira}
                    yearly_price_dollar={plan.yearly_price_dollar}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </>
      )}
    </>
  );
};

export default SuperAdminSubscription;
