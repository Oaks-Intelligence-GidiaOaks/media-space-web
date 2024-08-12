import { IoIosCheckmark } from "react-icons/io";

const plans = [
  {
    name: "Basic",
    price: "$0",
    users: 99,
    features: [
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  },
  {
    name: "Elite",
    price: "$14",
    users: 699,
    features: [true, true, true, true, true, true, false, false, false, false],
  },
  {
    name: "Pro Plan",
    price: "$35",
    users: 4999,
    features: [true, true, true, true, true, true, true, true, true, false],
  },
  {
    name: "Ultimate",
    price: "Custom",
    users: "Custom",
    features: [true, true, true, true, true, true, true, true, true, true],
  },
];

const features = [
  "Lifetime Access",
  "Polls",
  "Surveys",
  "Role Allocation",
  "Targeted Advertising",
  "Sentiment Analysis",
  "Audio and Video Room",
  "Event Management",
  "API Integration",
  "Beta Feature",
];

const PricingTable = () => {



  return (
    <div className="overflow-x-auto mt-24 custom-scrollbar">
      <div className="h-[500px] overflow-y-auto custom-scrollbar">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="sticky top-0 bg-white z-10">
            <tr>
              <th className="px-6 py-3 text-left text-lg font-semibold tracking-wider">
                Compare Our Plans
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.name}
                  className="px-6 py-3 text-center text-xs font-medium tracking-wider"
                >
                  <span className="bg-[#EDF7DC] px-3 py-1 rounded-xl">
                    {plan.name}
                  </span>
                  <div className="text-3xl font-semibold">
                    {plan.price}{" "}
                    <small className="text-sm text-[#829AB1] ">/month</small>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 text-sm">Users</td>
              {plans.map((plan) => (
                <td
                  key={plan.name}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  {plan.users}
                </td>
              ))}
            </tr>
            {features.map((feature, index) => (
              <tr key={feature}>
                <td className="px-6 py-4 text-sm">{feature}</td>
                {plans.map((plan) => (
                  <td key={plan.name} className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      {plan.features[index] ? (
                        <IoIosCheckmark size={30} className="text-[#3D7100]" />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingTable;
