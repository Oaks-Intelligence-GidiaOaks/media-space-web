import { Routes, Route } from "react-router-dom";
import { LandingPage } from "../page";

import * as routes from "./CONSTANT";

const RouterConfig = () => {
  return (
    <>
      <Routes>
        <Route path={routes.INDEX} element={<LandingPage />} />
      </Routes>
    </>
  );
};

export default RouterConfig;
