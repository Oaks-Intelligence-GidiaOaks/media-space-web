import { OrganizationMetricCard, ViewAllCard } from "../../components";
import OrgGridSort from "../../components/grid/OrgGridSort";
import OrgGrid from "./../../components/grid/OrgGrid";

const Organizations = () => {
  return (
    <div className="py-4 px-8">
      {/* <h1 className=" font-inter text-xl font-medium pb-8 leading-[24.2px]">
        Registered Users
      </h1>
      <div className=" grid grid-cols-6 gap-2">
        <OrganizationMetricCard />
        <OrganizationMetricCard />
        <OrganizationMetricCard />
        <OrganizationMetricCard />
        <OrganizationMetricCard />
        <ViewAllCard />
      </div> */}
      {/* <div className="flex flex-col justify-center mx-auto mt-10 max-w-[636px] pb-10">
        <div>
          <h1 className="font-inter text-center mb-6 text-3xl font-semibold leading-[39.94px]">
            Lorem ipsum dolor sit amet consectetur. Porttitor egestas vitae at
          </h1>

          <h2 className="text-center text-sm">
            Lorem ipsum dolor sit amet consectetur. Porttitor egestas vitae at
          </h2>
        </div>
        <div className="w-full max-w-lg flex justify-center mx-auto pt-10">
          <form className="w-full ">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative ">
              <input
                type="search"
                id="default-search"
                className="block w-full  py-4 ps-10 ps text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#3D7100] focus:border-[#3D7100]"
                placeholder="Enter company name"
                required
              />
              <button
                type="submit"
                className="text-white absolute right-1 font-inter top-1 bottom-1 bg-primary-dark-green hover:opacity-85 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-8 py-3"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div> */}
      <OrgGridSort />
      {/* <OrgGrid /> */}
    </div>
  );
};

export default Organizations;
