import React from "react";
import MultipleLineChart from "../../components/charts/MultipleLineChart";
import { generateDummyData } from "../../utils/data";
import {
  btn_more,
  active_users,
  inactive_users,
  total_users,
} from "../../assets";
import "./style.css";

function OrganizationUsers() {
  const dummyData = generateDummyData();

  return (
    <div className="py-4 px-5">
      <div className="flex justify-evenly items-center pb-20">
        <div className="flex flex-col justify-center">
          <p className="text-center">k</p>
          <p className="number py-10">356</p>
          <img src={total_users} alt="" />
        </div>

        <div className="pt-20 flex flex-col justify-center">
          <p className=" text-center">k</p>
          <p className="number py-10">208</p>
          <img src={active_users} alt="" />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-center">k</p>
          <p className="number py-10">148</p>
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
          <button className="btn-delete text-center">Deactivate User</button>
        </div>
        <div className="p-10">
          <MultipleLineChart
            seriesData={[
              {
                name: "Total Users",
                data: dummyData.map((point) => ({
                  x: point.date,
                  y: point.totalUsers,
                })),
              },
              {
                name: "Active Users",
                data: dummyData.map((point) => ({
                  x: point.date,
                  y: point.activeUsers,
                })),
              },
              {
                name: "Inactive Users",
                data: dummyData.map((point) => ({
                  x: point.date,
                  y: point.inactiveUsers,
                })),
              },
            ]}
            xKey="x"
            yKeys={["y"]}
          />
        </div>
      </div>
    </div>
  );
}

export default OrganizationUsers;
