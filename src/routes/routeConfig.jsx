import { Routes, Route, Navigate } from "react-router-dom";
import {
  LandingPage,
  Login,
  Notifications,
  Organizations,
  Overview,
  Register,
  Settings,
  Subscription,
} from "../page";

import * as routes from "./CONSTANT";
import { ProtectedRoute } from "../guards";
import { SuperAdminLayout } from "../layouts";

const RouterConfig = () => {
  return (
    <>
      <Routes>
        <Route path={routes.INDEX} element={<LandingPage />} />
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.REGISTER} element={<Register />} />
        <Route
          path={routes.DASHBOARD}
          element={<ProtectedRoute component={SuperAdminLayout} />}
        >
          <Route index element={<Navigate to={"/dashboard/overview"} />} />
          <Route path={routes.OVERVIEW} element={<Overview />} />
          <Route path={routes.ORGANIZATIONS} element={<Organizations />} />
          <Route path={routes.SUBSCRIPTION} element={<Subscription />} />
          <Route path={routes.NOTIFICATIONS} element={<Notifications />} />
          <Route path={routes.SETTINGS} element={<Settings />} />
          <Route path={"*"} element={<Navigate to={"/dashboard/overview"} />} />
        </Route>
      </Routes>
    </>
  );
};

export default RouterConfig;
