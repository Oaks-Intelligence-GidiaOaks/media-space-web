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
  icon_error,
} from "../../assets";
import "./style.css";
import { generateDonutData } from "../../utils/donut";
import { generateSubscriptionData } from "../../utils/subscription";
import { useSelector } from "react-redux";
import { Cards } from "../../components/layout/super-admin-layout";
import { generateDummyData } from "../../utils/data";
import MultipleChart from "../../components/charts/MultipleChart";
import CircleCharts from "../../components/charts/CircleCharts";

const Overview = () => {
  const usersData = generateDummyData();

  const organization_name = useSelector(
    (state) => state.user.user.organization_id.organization_name
  );

  const user = useSelector((state) => state.user.user);

  const donutData = generateDonutData();
  const subscriptionData = generateSubscriptionData();
  const dummyData = [
    { date: "JAN", activity: 10 },
    { date: "FEB", activity: 20 },
    { date: "MAR", activity: 15 },
    { date: "APRIL", activity: 25 },
    { date: "MAY", activity: 18 },
    { date: "JUNE", activity: 3 },
    { date: "JULY", activity: 50 },
    { date: "AUG", activity: 45 },
    { date: "SEP", activity: 39 },
    { date: "OCT", activity: 30 },
    { date: "NOV", activity: 11 },
    { date: "DEC", activity: 40 },
  ];

  return (
    <div className="px-3 pt-5 pb-5">
      <div className="block pb-5">
        <p className="greetings pb-2">Welcome Back, {organization_name}</p>
        <p className="greetings-text">
          Here is a brief overview of your product.
        </p>
      </div>

      <div className="">
        {/* {user && user.role == "OrgAdmin" ? ( */}

        {user && user.role == "SuperAdmin" ? (
          <>
            <div className="flex gap-10 px-3 pt-5 flex-col lg:flex-row lg:gap-10">
              <div className="chart-section px-5 md:flex-1">
                <div className="flex flex-col gap-3 pb-5 md:flex-row md:justify-start md:gap-3">
                  <select name="" className="filter-1">
                    <option value="">Timeframe: All-time</option>
                  </select>

                  <select name="" className="filter-1">
                    <option value="">Client: All</option>
                  </select>
                </div>

                <div className="flex justify-between pb-10 flex-col gap-3 md:flex-row">
                  <div className="card card-overview-1 shadow hover:shadow-lg">
                    <p className="overview-header py-3 ml-3">Users</p>
                    <p className="overview-number ml-3">3,279</p>
                    <div className="flex">
                      <DonutChart seriesData={donutData} />
                    </div>
                  </div>

                  <div className="card card-overview-2 shadow hover:shadow-lg">
                    <p className="overview-header py-3 ml-3">Subscriptions</p>
                    <p className="overview-number ml-3">1,214</p>
                    <div className="flex h-[120px]">
                      <DonutChart seriesData={subscriptionData} />
                    </div>
                  </div>
                </div>

                <div className="linechart py-3 px-3 hidden sm:block  max-w-full shadow hover:shadow-lg">
                  <LineChart data={dummyData} xKey="date" yKey="activity" />
                </div>
              </div>

              <div className="company-list w-full md:w-auto">
                <div className="flex pb-5">
                  <select name="" className="filter-1">
                    <option value="">Top Users: Organization</option>
                  </select>
                </div>

                <div className="card-list flex flex-col gap-7">
                  <div className="company-card shadow-lg">
                    <div className="card-content p-3">
                      <div className="flex justify-between pb-3">
                        <p className="company-name">Oaks Intelligence</p>{" "}
                        <button>
                          <img src={btn_more_sm} alt="" />
                        </button>{" "}
                      </div>
                      <p className="company-desc w-10/12 pb-5">
                        Lorem ipsum dolor sit amet consectetur. Senectus risus a
                        duis nisl commodo ac blandit. Elementum ipsum sapien id
                        in mattis.
                      </p>
                      <p className="company-user-total text-right mr-4">
                        123,094
                      </p>
                      <div className="prog-range-1">
                        <div className="range-1"></div>
                      </div>
                      <div className="flex gap-1 pt-5">
                        <img src={avatar_sm} alt="" />
                        <img src={avatar_sm} alt="" />
                        <img src={avatar_sm} alt="" />
                        <img src={chart_sm_down} alt="" />
                      </div>
                    </div>
                  </div>

                  <div className="company-card shadow-lg">
                    <div className="card-content p-3">
                      <div className="flex justify-between pb-3">
                        <p className="company-name">M&M Limited</p>{" "}
                        <button>
                          <img src={btn_more_sm} alt="" />
                        </button>{" "}
                      </div>
                      <p className="company-desc w-10/12 pb-5">
                        LoLorem ipsum dolor sit amet consectetur. Tellus nisl
                        maecenas tellus cursus a. Venenatis molestie a quis
                        laoreet elementum.
                      </p>
                      <p className="company-user-total text-[#34B53A] text-right mr-4">
                        43,361
                      </p>
                      <div className="prog-range-2">
                        <div className="range-2"></div>
                      </div>
                      <div className="flex gap-1 pt-5">
                        <img src={avatar_sm} alt="" />
                        <img src={chart_sm_up} alt="" />
                      </div>
                    </div>
                  </div>

                  <div className="company-card shadow-lg">
                    <div className="card-content p-3">
                      <div className="flex justify-between pb-3">
                        <p className="company-name">Home Made Ltd</p>{" "}
                        <button>
                          <img src={btn_more_sm} alt="" />
                        </button>{" "}
                      </div>
                      <p className="company-desc w-10/12 pb-5">
                        Lorem ipsum dolor sit amet consectetur. Urna arcu
                        venenatis nulla feugiat id leo nisl justo. Volutpat
                        sagittis in eget a quam.
                      </p>
                      <p className="company-user-total text-right mr-4">
                        34,567
                      </p>
                      <div className="prog-range-1">
                        <div className="range-1"></div>
                      </div>
                      <div className="flex gap-1 pt-5 mb-5">
                        <img src={avatar_sm} alt="" />
                        <img src={avatar_sm} alt="" />
                        <img src={chart_sm_up} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full super-admin-card-box flex flex-col items-center justify-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-10 md:grid md:grid-cols-2 md:justify-between lg:grid lg:grid-cols-4 xl:grid-cols-5 mb-10">
              <Cards
                title={"67m"}
                subtitle={"Total post"}
                percentage={"10.2%"}
                img={post}
                icon={icon_success}
                text={"+1.01% this week"}
              />

              <Cards
                title={"231m"}
                subtitle={"Total post Likes "}
                percentage={"10.2%"}
                img={fav}
                icon={icon_success}
                text={"+1.01% this week"}
              />

              <Cards
                title={"122m"}
                subtitle={"Total impression"}
                percentage={"2.56%"}
                img={impressions}
                icon={icon_error}
                text={"-0.91% this week"}
              />

              <Cards
                title={"20m"}
                subtitle={"Total post share "}
                percentage={"3.1%"}
                img={share}
                icon={icon_success}
                text={"+0.49% this week"}
              />

              <Cards
                title={"11m"}
                subtitle={"Total post repost"}
                percentage={"7.2%"}
                img={repeat}
                icon={icon_success}
                text={"+1.51% this week"}
              />
            </div>
            <div className="flex gap-10 flex-col lg:flex-row lg:gap-10">
              <div className="linechart py-5 px-3 hidden sm:block w-full shadow hover:shadow-lg">
                <MultipleChart
                  seriesData={[
                    {
                      name: "Offline users",
                      data: usersData.map((point) => ({
                        x: point.date,
                        y: point.totalUsers,
                      })),
                    },
                    {
                      name: "Online users",
                      data: usersData.map((point) => ({
                        x: point.date,
                        y: point.activeUsers,
                      })),
                    },
                  ]}
                  xKey="x"
                  yKeys={["y"]}
                />
              </div>

              <div className="rounded-donut w-full justify-center items-center">
                <CircleCharts />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Overview;
