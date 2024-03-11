import { OrganizationMetricCard, ViewAllCard } from "../../components";
import {
  useGetSuperadminOrgUserStatsQuery,
  useGetAadminUserStatsQuery,
} from "../../service/organization.service";
import { useSelector } from "react-redux";
import { ShimmerThumbnail } from "react-shimmer-effects";

const Organizations = () => {
  const {
    data: superAdminOrgUserStats,
    isLoading: loadingSuperAdminOrgUserStats,
  } = useGetSuperadminOrgUserStatsQuery();

  const { data: adminUserStats, isLoading: loadingAdminUserStats } =
    useGetAadminUserStatsQuery();

  console.log(adminUserStats, superAdminOrgUserStats);

  const user = useSelector((state) => state.user.user);

  return (
    <div className="py-4 px-8">
      <h1 className=" font-inter text-xl font-medium pb-8 leading-[24.2px]">
        Registered Users
      </h1>
      <div className="grid grid-cols-6 gap-2">
        {loadingSuperAdminOrgUserStats || loadingAdminUserStats ? (
          <ShimmerThumbnail width={400} height={"100%"} />
        ) : (
          <>
            {user && user.role === "SuperAdmin" ? (
              superAdminOrgUserStats?.data.length > 0 ? (
                superAdminOrgUserStats?.data
                  .slice(0, 5)
                  .map((user, index) => (
                    <OrganizationMetricCard
                      key={index}
                      orgName={user.organization_name}
                      users={user.users?.count}
                      image={user.background_photo_url}
                    />
                  ))
              ) : (
                <div>No data available to show yet</div>
              )
            ) : adminUserStats.data.length > 0 ? (
              adminUserStats.data
                .slice(0, 5)
                .map((user, index) => (
                  <OrganizationMetricCard
                    key={index}
                    orgName={user.display_name}
                    users={user.followers_count}
                    image={user.photo_url ?? ""}
                  />
                ))
            ) : (
              <div>No data availableto show yet </div>
            )}
          </>
        )}
        {((user &&
          user.role === "SuperAdmin" &&
          superAdminOrgUserStats?.data.length > 0) ||
          (user &&
            user.role !== "SuperAdmin" &&
            adminUserStats.data.length > 0)) && <ViewAllCard />}
      </div>

      <div className="flex flex-col justify-center mx-auto mt-10 max-w-[636px] pb-10">
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
      </div>
    </div>
  );
};

export default Organizations;
