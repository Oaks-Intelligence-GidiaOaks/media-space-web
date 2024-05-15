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
  SignUp,
  OrganizationUsers,
  UserAcquisition,
  OrganizationsTable,
  OrganizationStaff,
  OrganizationsSurvey,
  SurveyResponses,
} from "../page";

import * as routes from "./CONSTANT";
// import { ProtectedRoute } from "../guards";
import { SuperAdminLayout } from "../layouts";
import ProtectedRoute from "../components/protected/ProtectedRoute";
import PublicRoute from "../components/protected/PublicRoute";

const RouterConfig = () => {
  return (
    <>
      <Routes>
        <Route path={routes.INDEX} element={<LandingPage />} />
        <Route
          path={routes.LOGIN}
          element={<PublicRoute component={Login} />}
        />
        {/* <Route path={routes.LOGIN} element={<Login />} /> */}

        <Route path={routes.REGISTER} element={<Register />} />
        <Route path={routes.SIGN_UP} element={<SignUp />} />
        <Route
          path={routes.DASHBOARD}
          element={<ProtectedRoute component={SuperAdminLayout} />}
        >
          <Route index element={<Navigate to={"/dashboard/overview"} />} />
          <Route path={routes.OVERVIEW} element={<Overview />} />
          {/* <Route
            path={routes.ORGANIZATIONS_USERS}
            element={<OrganizationUsers />}
          /> */}
          <Route
            path="/dashboard/organizations/users/:id"
            element={<OrganizationUsers />}
          />
          <Route
            path={routes.ORGANIZATIONS_TABLE}
            element={<OrganizationsTable />}
          />
          <Route path={routes.USER_ACQUISITION} element={<UserAcquisition />} />
          <Route
            path={routes.USER_ACQUISITION_STAFF}
            element={<OrganizationStaff />}
          />
          <Route path={routes.ORGANIZATIONS} element={<Organizations />} />
          <Route
            path={routes.ORGANIZATIONS_SURVEY}
            element={<OrganizationsSurvey />}
          />
          <Route path={routes.SUBSCRIPTION} element={<Subscription />} />
          <Route path={routes.NOTIFICATIONS} element={<Notifications />} />
          <Route path={routes.SETTINGS} element={<Settings />} />
          <Route path={routes.SURVEY_RESPONSES} element={<SurveyResponses />} />
          <Route path={"*"} element={<Navigate to={"/dashboard/overview"} />} />
        </Route>
      </Routes>
    </>
  );
};

export default RouterConfig;
