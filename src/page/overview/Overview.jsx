import LineChart from "../../components/charts/LineChart";
import {
  btn_more_sm,
  avatar_sm,
  chart_sm_down,
  chart_sm_up,
} from "../../assets";
import "./style.css";

const Overview = () => {
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
    <div className="px-5 pt-5">
      <div className="block pb-5">
        <p className="greetings pb-2">Welcome Back, Sandra</p>
        <p className="greetings-text">
          Here is a brief overview of your product.
        </p>
      </div>

      <div className="flex gap-10">
        <div className="chart-section px-5">
          <div className="flex gap-3 pb-5">
            <select name="" className="filter-1">
              <option value="">Timeframe: All-time</option>
            </select>

            <select name="" className="filter-1">
              <option value="">Client: All</option>
            </select>
          </div>

          <div className="flex justify-between gap-10 pb-10">
            <div className="card relative">
              <div className="anchor absolute top-0 right-10"></div>
            </div>
            <div className="card">dd</div>
          </div>

          <div className="linechart py-3 px-3">
            <LineChart data={dummyData} xKey="date" yKey="activity" />
          </div>
        </div>

        <div className="company-list w-full">
          <div className="flex pb-5">
            <select name="" className="filter-1">
              <option value="">Top Users: Organization</option>
            </select>
          </div>

          <div className="card-list flex flex-col gap-7">
            <div className="company-card">
              <div className="card-content p-5">
                <div className="flex justify-between pb-3">
                  <p className="company-name">Oaks Intelligence</p>{" "}
                  <button>
                    <img src={btn_more_sm} alt="" />
                  </button>{" "}
                </div>
                <p className="company-desc w-10/12 pb-5">
                  Lorem ipsum dolor sit amet consectetur. Senectus risus a duis
                  nisl commodo ac blandit. Elementum ipsum sapien id in mattis.
                </p>
                <p className="company-user-total text-right">123,094</p>
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

            <div className="company-card">
              <div className="card-content p-5">
                <div className="flex justify-between pb-3">
                  <p className="company-name">M&M Limited</p>{" "}
                  <button>
                    <img src={btn_more_sm} alt="" />
                  </button>{" "}
                </div>
                <p className="company-desc w-10/12 pb-5">
                  LoLorem ipsum dolor sit amet consectetur. Tellus nisl maecenas
                  tellus cursus a. Venenatis molestie a quis laoreet elementum.
                </p>
                <p className="company-user-total text-[#34B53A] text-right">
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

            <div className="company-card">
              <div className="card-content p-5">
                <div className="flex justify-between pb-3">
                  <p className="company-name">Home Made Ltd</p>{" "}
                  <button>
                    <img src={btn_more_sm} alt="" />
                  </button>{" "}
                </div>
                <p className="company-desc w-10/12 pb-5">
                  Lorem ipsum dolor sit amet consectetur. Urna arcu venenatis
                  nulla feugiat id leo nisl justo. Volutpat sagittis in eget a
                  quam.
                </p>
                <p className="company-user-total text-right">34,567</p>
                <div className="prog-range-1">
                  <div className="range-1"></div>
                </div>
                <div className="flex gap-1 pt-5">
                  <img src={avatar_sm} alt="" />
                  <img src={avatar_sm} alt="" />
                  <img src={chart_sm_up} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
