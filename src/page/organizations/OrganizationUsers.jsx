import MultipleLineChart from "../../components/charts/MultipleLineChart";
import {
  btn_more,
  active_users,
  inactive_users,
  total_users,
  followers,
  posts,
  impress,
} from "../../assets";
import "./style.css";
import { useParams } from "react-router-dom";
import {
  useGetIndividualSuperAdminOrgStatsQuery,
  useGetIndividualAdminOrgStatsQuery,
} from "../../service/organization.service";
import { useSelector } from "react-redux";
import { ShimmerThumbnail } from "react-shimmer-effects";

function OrganizationUsers() {
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);

  const { data: superAdminData, isLoading: loadingSdata } =
    useGetIndividualSuperAdminOrgStatsQuery(id);
  console.log(superAdminData);

  const { data: adminData, isLoading: loadingAdata } =
    useGetIndividualAdminOrgStatsQuery(id);

  return (
    <div className="py-4 px-5">
      {user && user.role == "SuperAdmin" ? (
        <>
          {loadingSdata ? (
            <ShimmerThumbnail width={"100%"} height={500} />
          ) : (
            <>
              <div className="flex justify-evenly items-center pb-20">
                <div className="flex flex-col justify-center">
                  {/* <p className="text-center">k</p> */}
                  <p className="number py-10 text-center">
                    {superAdminData?.data?.total_users}
                  </p>
                  <img src={total_users} alt="" />
                </div>

                <div className="pt-20 flex flex-col justify-center">
                  {/* <p className=" text-center">k</p> */}
                  <p className="number py-10 text-center">
                    {" "}
                    {superAdminData?.data?.active_users}
                  </p>
                  <img src={active_users} alt="" />
                </div>

                <div className="flex flex-col justify-center">
                  {/* <p className="text-center">k</p> */}
                  <p className="number py-10 text-center">
                    {" "}
                    {superAdminData?.data?.inactive_users}
                  </p>
                  <img src={inactive_users} alt="" />
                </div>

                <div>
                  <button className="btn-more">
                    <img src={btn_more} alt="" />
                  </button>
                </div>
              </div>
              <div className="multiple-chart pt-10">
                <div className="flex justify-center">
                  <button className="btn-delete text-center">
                    Deactivate User
                  </button>
                </div>
                <div className="p-10">
                  <MultipleLineChart
                    seriesData={[
                      {
                        name: "Total Users",
                        data: superAdminData?.data?.graph_data?.map(
                          (point) => ({
                            x: point.month,
                            y: point.totalUsers,
                          })
                        ),
                      },
                      {
                        name: "Active Users",
                        data: superAdminData?.data?.graph_data?.map(
                          (point) => ({
                            x: point.month,
                            y: point.activeUsers,
                          })
                        ),
                      },
                      {
                        name: "Inactive Users",
                        data: superAdminData?.data?.graph_data?.map(
                          (point) => ({
                            x: point.month,
                            y: point.inactiveUsers,
                          })
                        ),
                      },
                    ]}
                    xKey="x"
                    yKeys={["y"]}
                  />
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {loadingAdata ? (
            <ShimmerThumbnail width={"100%"} height={500} />
          ) : (
            <>
              <div className="flex justify-evenly items-center pb-20">
                <div className="flex flex-col justify-center">
                  {/* <p className="text-center">k</p> */}
                  <p className="number py-10 text-center">
                    {adminData?.data?.total_followers_count}
                  </p>
                  <img src={followers} alt="" />
                </div>

                <div className="pt-20 flex flex-col justify-center">
                  {/* <p className=" text-center">k</p> */}
                  <p className="number py-10 text-center">
                    {" "}
                    {adminData?.data?.total_posts_count}
                  </p>
                  <img src={posts} alt="" />
                </div>

                <div className="flex flex-col justify-center">
                  {/* <p className="text-center">k</p> */}
                  <p className="number py-10 text-center">
                    {" "}
                    {adminData?.data?.total_impressions_count}
                  </p>
                  <img src={impress} alt="" />
                </div>

                <div>
                  <button className="btn-more">
                    <img src={btn_more} alt="" />
                  </button>
                </div>
              </div>
              <div className="multiple-chart pt-10">
                <div className="flex justify-center">
                  <button className="btn-delete text-center">
                    Deactivate User
                  </button>
                </div>
                <div className="p-10">
                  <MultipleLineChart
                    seriesData={[
                      {
                        name: "Followers",
                        data: adminData?.data?.graph_data?.map((point) => ({
                          x: point.month,
                          y: point.totalFollowers,
                        })),
                      },
                      {
                        name: "Posts",
                        data: adminData?.data?.graph_data?.map((point) => ({
                          x: point.month,
                          y: point.totalPosts,
                        })),
                      },
                      {
                        name: "Post Impression",
                        data: adminData?.data?.graph_data?.map((point) => ({
                          x: point.month,
                          y: point.totalImpressions,
                        })),
                      },
                    ]}
                    xKey="x"
                    yKeys={["y"]}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default OrganizationUsers;
