import { Routes, Route } from "react-router-dom";
import { LandingPage, Login } from "../page";

import * as routes from "./CONSTANT";

const RouterConfig = () => {
  return (
    <>
      <Routes>
        <Route path={routes.INDEX} element={<LandingPage />} />
        <Route path={routes.LOGIN} element={<Login />} />
      </Routes>
    </>
  );
};

export default RouterConfig;
