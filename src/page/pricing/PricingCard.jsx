import Switch from "../../components/ui/Switch";
import React, { useState } from "react";
import { IoIosCheckmark } from "react-icons/io";
import plans from "./plans";
import PricingTable from "./PriciningTable";
import { useGetUserPlansQuery } from "../../service/admin/sub.service";
import { Link } from "react-router-dom";
import { SIGN_UP_AS, SUPPORT } from "../../routes/CONSTANT";
import { ShimmerTable } from "react-shimmer-effects";

const getFilteredFeatures = (currentPlanFeatures, lowerPlanFeatures) => {
  const lowerPlanFeatureNames = lowerPlanFeatures.map(
    (feature) => feature.module_name
  );
  return currentPlanFeatures.filter(
    (feature) => !lowerPlanFeatureNames.includes(feature.module_name)
  );
};

const PricingCard = () => {
  const [isChecked, setIsChecked] = useState(false);
  const toggleChecked = () => {
    setIsChecked((prev) => !prev);
  };

  const { data, isLoading } = useGetUserPlansQuery();
  console.log(data);

  const getFeaturesForPlan = (planName) => {
    const plan = data?.data?.find((plan) => plan.name === planName);
    if (!plan) return [];

    switch (plan.name) {
      case "Elite Plan":
        return [
          "Everything in Basic",
          ...getFilteredFeatures(
            plan.features,
            data?.data?.find((p) => p.name === "Basic Plan")?.features || []
          ),
        ];

      case "Pro Plan":
        return [
          "Everything in Elite",
          ...getFilteredFeatures(
            plan.features,
            data?.data?.find((p) => p.name === "Elite Plan")?.features || []
          ),
        ];

      case "Ultimate Plan":
        return [
          "Everything in Pro",
          ...getFilteredFeatures(
            plan.features,
            data?.data?.find((p) => p.name === "Pro Plan")?.features || []
          ),
        ];

      default:
        return plan.features;
    }
  };

  const linkTexts = {
    "Ultimate Plan": "Contact Support",
    "Pro Plan": "Get Started",
    "Elite Plan": "Start 60 days free trial",
    "Basic Plan": "Get Started for Free",
  };

  const linkDestinations = {
    "Ultimate Plan": SUPPORT,
    "Pro Plan": SIGN_UP_AS,
    "Elite Plan": SIGN_UP_AS,
    "Basic Plan": SIGN_UP_AS,
  };

  return (
    <div className="px-5 md:px-28 relative">
      <div className="flex flex-col pt-16 items-center justify-center">
        <h1 className="text-6xl pb-4 leading-[4.5rem] font-semibold font-inter">
          Pick the package{" "}
          <span className="text-[#3D7100]">that’s right for you</span>
        </h1>
        <p className="text-lg">
          Whatever your budget or community size is, we have the right fit
        </p>
      </div>
      <div className="flex justify-center py-10 text-lg items-center gap-4">
        <h3 className={`${isChecked ? "" : "font-semibold"}`}>Monthly</h3>
        <Switch isChecked={isChecked} onClick={toggleChecked} />
        <h3 className={`${isChecked ? "font-semibold" : ""}`}>Yearly</h3>
      </div>
      {/* <div className="flex justify-center md:justify-between flex-wrap xl:flex-nowrap gap-10 items-start">
        {plans.map((plan) => (
          <div
            className={`rounded-md w-[17.19rem] min-h-[25rem] flex pt-5 pb-10 flex-col text-[${plan.text}] shadow-lg bg-[${plan.background}]`}
            key={plan.id}
          >
            <div className="rounded-md flex pb-5 flex-col  border-b border-dashed">
              <p>
                <span
                  className={`ml-8 px-3 py-1 rounded-xl text-black font-semibold bg-[${plan.background2}]`}
                >
                  {plan.title}
                </span>{" "}
                <span>{plan.recommended}</span>
              </p>
              <h1 className="flex px-8 items-center font-semibold text-[1.9rem] ">
                {plan.currency}
                {plan.amount}
                <small className="text-sm text-[#829AB1] ml-2 ">
                  {plan.type}
                </small>
              </h1>
              <small className="px-8">{plan.description}</small>
              <button className="mx-8 bg-[#3D7100] rounded-md py-2 text-white my-2">
                {plan.ctaBtn}
              </button>
            </div>
            <ul className="px-8 mt-5">
              {plan.details.map((detail, index) => (
                <li className="flex gap-1" key={index}>
                  {" "}
                  <IoIosCheckmark size={30} className="text-[#0F5901] " />{" "}
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div> */}

      <div className="flex justify-center md:justify-between flex-wrap xl:flex-nowrap gap-10 items-start mt-5">
        {
          isLoading ? (
            <ShimmerTable mode="light" row={7} col={5} border={1} borderColor={"#cbd5e1"} rounded={0.25} rowGap={16} />
          ) : (
            data?.data?.map((plan) => (
              <div
                className={`rounded-md w-[17.19rem] min-h-[25rem] flex pt-5 pb-10 flex-col text-[${
                  plan?.name === "Ultimate Plan" ? "#fff" : "black"
                }] shadow-lg bg-[${
                  plan?.name.includes("Elite")
                    ? "#EDF7DC"
                    : plan?.name.includes("Ultimate")
                    ? "#141414"
                    : ""
                }]`}
                key={plan?._id}
              >
                <div className="rounded-md flex pb-5 flex-col  border-b border-dashed">
                  <p>
                    <span
                      className={`ml-8 px-3 py-1 rounded-xl text-black font-semibold bg-[${
                        plan?.name.includes("Elite") ? "#fbfbfb" : "#EDF7DC"
                      }]`}
                    >
                      {plan?.name.slice(plan?.name.lenght, -4)} 
                    </span> <span className="bg-none">
                      {plan?.name.includes("Elite") ? " Recommended" : ""}
                    </span>
                  </p>
                  <h1 className="flex px-8 items-center font-semibold text-[1.9rem] ">
                    {/* {plan?.currency} */}
                    {typeof plan?.monthly_price_dollar === "string" ? "" : "$"}
                    {typeof plan?.monthly_price_dollar === "string"
                      ? "Custom"
                      : plan?.monthly_price_dollar}
                    <small className="text-sm text-[#829AB1] ml-2 ">/monthly</small>
                  </h1>
                  <small className="px-8">{plan?.description}</small>
    
                  <Link
                    className="mx-8 bg-[#3D7100] block text-center rounded-md py-2 text-white my-2"
                    to={linkDestinations[plan?.name]}
                  >
                    {linkTexts[plan?.name]}
                  </Link>
                </div>
                <ul className="px-8 mt-5">
                  {getFeaturesForPlan(plan?.name)?.map((detail, index) => (
                    <li className="flex gap-1" key={index}>
                      <IoIosCheckmark size={30} className="text-[#0F5901]" />
                      {detail.module_name || detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )
        }
      </div>
      <PricingTable />
    </div>
  );
};

export default PricingCard;
