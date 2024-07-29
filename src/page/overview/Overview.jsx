import LineChart from "../../components/charts/LineChart";
import DonutChart from "../../components/charts/DonutChart";
import {
  btn_more_sm,
  avatar_sm,
  chart_sm_down,
  chart_sm_up,
  post,
  fav,
  repeat,
  share,
  impressions,
  icon_success,
  icon_error
} from "../../assets";
import "./style.css";
import { useSelector } from "react-redux";
import { Cards } from "../../components/layout/super-admin-layout";
import MultipleChart from "../../components/charts/MultipleChart";
import CircleCharts from "../../components/charts/CircleCharts";
import { useGetSubscriptionQuery } from "../../service/superadmin/subscription.service";
import { ShimmerThumbnail } from "react-shimmer-effects";
import {
  useGetUserStatsQuery,
  useGetUserOverallActivityQuery
} from "../../service/superadmin/statistics.service";
import { useGetTopOrganizationQuery } from "../../service/organization.service";
import {
  useGetPostStatsQuery,
  useGetAminUserActivityStatsQuery,
  useGetAminUserAnalyticsStatsQuery
} from "../../service/admin/statistics.service";
import { CountdownBanner } from "./Countdown";

const Overview = () => {
  const { data: analyticsData, isLoading: loadingAnalyticsData } =
    useGetAminUserAnalyticsStatsQuery();

  const { data: activityData, isLoading: loadingActivityData } =
    useGetAminUserActivityStatsQuery();
  const activity = activityData?.data;
  console.log(activity);

  const user = useSelector((state) => state.user.user);

  const { data: overallActivity, isLoading: loadingOverallActivity } =
    useGetUserOverallActivityQuery();

  const userActivity = [];

  if (overallActivity && overallActivity.data) {
    userActivity.push({
      month: overallActivity?.data?.month,
      count: overallActivity?.data?.count
    });
  }

  const { data: topOrganization, isLoading: loadingTopOrg } =
    useGetTopOrganizationQuery();
  const topOrg = topOrganization?.data;
  // console.log(topOrg);

  const { data: statsData, isLoading: loadingStats } = useGetUserStatsQuery();
  const userStats = [
    { label: "New", value: statsData?.data?.new_users?.total },
    { label: "Returning", value: statsData?.data?.returning_users?.total },
    { label: "Inactive", value: statsData?.data?.inactive_users?.total }
  ];

  const { data: subscriptionData, isLoading } = useGetSubscriptionQuery();
  const subscription = [
    { label: "Paid", value: subscriptionData?.data?.paid_subscription?.total },
    {
      label: "Trial",
      value: subscriptionData?.data?.trial_subscription?.total
    }
  ];

  const { data: postStats, isLoading: loadStats } = useGetPostStatsQuery();
  const trialEndDate = user?.organization_id?.trial_end_date;

  return (
    <div className="px-3 pt-5 pb-5">
      <div className="">
        {user && user.role == "SuperAdmin" ? (
          <>
            <div className="flex gap-10 pt-5 px-5 flex-col lg:flex-row lg:gap-20">
              <div className="chart-section md:flex-1">
                <div className="flex flex-col gap-3 pb-5 md:flex-row md:justify-start md:gap-3">
                  <select name="" className="filter-1">
                    <option value="">Timeframe: All-time</option>
                  </select>

                  <select name="" className="filter-1">
                    <option value="">Client: All</option>
                  </select>
                </div>

                <div className="flex justify-between pb-10 flex-col gap-3 md:flex-row">
                  {loadingStats ? (
                    <ShimmerThumbnail width={260} height={222} />
                  ) : (
                    <div className="card card-overview-1 shadow hover:shadow-lg">
                      <p className="overview-header py-3 ml-3">Users</p>
                      <p className="overview-number ml-3">
                        {statsData?.data?.total_users}
                      </p>
                      <div className="flex">
                        <DonutChart seriesData={userStats} />
                      </div>
                    </div>
                  )}

                  {isLoading ? (
                    <ShimmerThumbnail width={260} height={222} />
                  ) : (
                    <div className="card card-overview-2 shadow hover:shadow-lg">
                      <p className="overview-header py-3 ml-3">Subscriptions</p>
                      <p className="overview-number ml-3">
                        {subscriptionData?.data?.total_organization}
                      </p>
                      <div className="flex h-[120px]">
                        <DonutChart seriesData={subscription} />
                      </div>
                    </div>
                  )}
                </div>

                {loadingOverallActivity ? (
                  <ShimmerThumbnail width={"100%"} height={"100%"} />
                ) : (
                  <div className="linechart py-3 px-3 hidden sm:block  max-w-full shadow hover:shadow-lg">
                    <LineChart data={userActivity} xKey="month" yKey="count" />
                  </div>
                )}
              </div>

              <div className="company-list w-full">
                <div className="flex pb-5">
                  <select name="" className="filter-1">
                    <option value="">Top Users: Organization</option>
                  </select>
                </div>

                <div className="card-list flex flex-col gap-7">
                  {loadingTopOrg ? (
                    <ShimmerThumbnail width={"100%"} height={400} />
                  ) : (
                    topOrg?.map((org) => (
                      <div
                        className="company-card shadow-lg"
                        key={org.organization.organization_name}
                      >
                        <div className="card-content p-3">
                          <div className="flex justify-between pb-3">
                            <p className="company-name">
                              {org.organization.organization_name}
                            </p>
                            <button>
                              <img src={btn_more_sm} alt="" />
                            </button>
                          </div>
                          <p className="company-desc w-10/12 pb-5">
                            {org.organization_description}
                          </p>
                          <p className="company-user-total text-right mr-4">
                            {org.user_count}
                          </p>
                          <div className="prog-range-1">
                            <div className="range-1"></div>
                          </div>
                          <div className="flex gap-1 pt-5">
                            {org.users.slice(0, 8).map((user) => (
                              <img
                                key={user._id}
                                width="35"
                                height="34"
                                src={user?.background_photo_url ?? avatar_sm}
                                alt=""
                              />
                            ))}
                            {org.users.length > 10 && (
                              <span className="rounded-full bg-white p-1">
                                +{org.users.length - 10}
                              </span>
                            )}
                            <img src={chart_sm_down} alt="" />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {user?.organization_id?.plan_id === "669149f11eec17ef058d668c" &&
              user?.organization_id?.isSubscribed === false &&
              trialEndDate && <CountdownBanner trialEndDate={trialEndDate} />}

            <div className="w-full super-admin-card-box  items-center justify-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-10 md:grid md:grid-cols-2 md:justify-between lg:grid lg:grid-cols-4 xl:grid-cols-5 mb-20">
              {loadStats ? (
                <ShimmerThumbnail width={250} height={150} />
              ) : (
                <Cards
                  title={postStats?.data?.posts_count}
                  subtitle={"Total post"}
                  percentage={"10.2%"}
                  img={post}
                  icon={icon_success}
                  text={"+1.01% this week"}
                />
              )}

              {loadStats ? (
                <ShimmerThumbnail width={250} height={150} />
              ) : (
                <Cards
                  title={postStats?.data?.likes_count}
                  subtitle={"Total post Likes "}
                  percentage={"10.2%"}
                  img={fav}
                  icon={icon_success}
                  text={"+1.01% this week"}
                />
              )}

              {loadStats ? (
                <ShimmerThumbnail width={250} height={150} />
              ) : (
                <Cards
                  title={postStats?.data?.impressions_count}
                  subtitle={"Total impression"}
                  percentage={"2.56%"}
                  img={impressions}
                  icon={icon_error}
                  text={"-0.91% this week"}
                />
              )}

              {loadStats ? (
                <ShimmerThumbnail width={250} height={150} />
              ) : (
                <Cards
                  title={postStats?.data?.shares_count}
                  subtitle={"Total post share "}
                  percentage={"3.1%"}
                  img={share}
                  icon={icon_success}
                  text={"+0.49% this week"}
                />
              )}

              {loadStats ? (
                <ShimmerThumbnail width={250} height={150} />
              ) : (
                <Cards
                  title={postStats?.data?.reposts_count}
                  subtitle={"Total post repost"}
                  percentage={"7.2%"}
                  img={repeat}
                  icon={icon_success}
                  text={"+1.51% this week"}
                />
              )}
            </div>
            <div className="flex gap-10 flex-col lg:flex-row lg:gap-10">
              <div className="linechart py-5 px-3 hidden sm:block w-full shadow hover:shadow-lg">
                {loadingActivityData ? (
                  <ShimmerThumbnail width={800} height={"100%"} />
                ) : (
                  <MultipleChart
                    seriesData={[
                      {
                        name: "Offline users",
                        data: analyticsData?.data?.map((point) => ({
                          x: point.month,
                          y: point.offline_users
                        }))
                      },
                      {
                        name: "Online users",
                        data: analyticsData?.data?.map((point) => ({
                          x: point.month,
                          y: point.online_users
                        }))
                      }
                    ]}
                    xKey="x"
                    yKeys={["y"]}
                  />
                )}
              </div>

              <div className="rounded-donut w-full justify-center items-center">
                {loadingActivityData ? (
                  <ShimmerThumbnail width={200} height={"100%"} />
                ) : (
                  <CircleCharts data={activity} />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Overview;
