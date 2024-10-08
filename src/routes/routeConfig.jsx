import { Routes, Route, Navigate } from "react-router-dom";
import {
  LandingPage,
  Login,
  Plans,
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
  Category,
  SentimentAnalysis,
  Profile,
  PaymentSuccess,
  LoginAs,
  SignUpAs,
  PricingPage,
  SupportPage,
  SupportGetStartedPage,
  ResourcePage,
  TutorialPage,
  ForgotPassword,
  ResetPassword,
  PlanPage
} from "../page";

import * as routes from "./CONSTANT";
// import { ProtectedRoute } from "../guards";
import { SuperAdminLayout, SupportLayout } from "../layouts";
import ProtectedRoute from "../components/protected/ProtectedRoute";
import PublicRoute from "../components/protected/PublicRoute";

const RouterConfig = () => {
  return (
    <>
      <Routes>
        <Route path={routes.INDEX} element={<LandingPage />} />
        <Route path={routes.SIGN_UP_AS} element={<SignUpAs />} />
        <Route path={routes.LOGIN_AS} element={<LoginAs />} />
        <Route path={routes.PRICING} element={<PricingPage />} />
        <Route path={routes.SUPPORT} element={<SupportPage />} />
        <Route path={routes.SUPPORT} element={<SupportLayout />}>
          <Route
            index
            path={routes.SUPPORT_GetStarted}
            element={<SupportGetStartedPage />}
          />
          <Route index path={routes.TUTORIAL} element={<TutorialPage />} />
          <Route
            index
            path={routes.SUPPORT_GetStarted + "/:id"}
            element={<ResourcePage />}
          />
        </Route>

        <Route
          path={routes.LOGIN}
          element={<PublicRoute component={Login} />}
        />
        {/* <Route path={routes.LOGIN} element={<Login />} /> */}

        <Route path={routes.SUBSCRIPTION_PLANS} element={<Plans />} />
        <Route path={routes.REGISTER} element={<Register />} />
        <Route path={routes.SIGN_UP} element={<SignUp />} />
        <Route path={routes.PAYMENT_SUCCESS} element={<PaymentSuccess />} />
        <Route path={routes.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={routes.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={routes.PLANS_PAGE} element={<PlanPage />} />

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
          <Route path={routes.CATEGORY} element={<Category />} />
          <Route path={routes.NOTIFICATIONS} element={<Notifications />} />
          <Route path={routes.SETTINGS} element={<Settings />} />
          <Route path={routes.COMPANY_PROFILE} element={<Profile />} />
          <Route path={routes.SURVEY_RESPONSES} element={<SurveyResponses />} />
          <Route
            path={routes.SENTIMENT_ANALYSIS}
            element={<SentimentAnalysis />}
          />
          <Route path={"*"} element={<Navigate to={"/dashboard/overview"} />} />
        </Route>
      </Routes>
    </>
  );
};

export default RouterConfig;
