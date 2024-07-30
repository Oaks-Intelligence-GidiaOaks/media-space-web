import { useGetUserPlansQuery } from "../service/admin/sub.service";

function Plans() {
  const { data, isLoading, error } = useGetUserPlansQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading plans.</div>;
  }

  const plans = data?.data;

  return (
    <div className="p-4 flex justify-center pt-10 gap-3">
      {plans?.map((plan) => (
        <div
          key={plan._id}
          className="mb-6 p-4 bg-white border rounded shadow-md"
        >
          <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
          <ul className="list-disc list-inside">
            {plan.features.map((feature) => (
              <li key={feature._id} className="text-gray-700">
                {feature.module_name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Plans;
