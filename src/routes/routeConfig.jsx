import { Routes, Route } from "react-router-dom";
import { LandingPage, Login, Register, SignUp } from "../page";

import * as routes from "./CONSTANT";

const RouterConfig = () => {
  return (
    <>
      <Routes>
        <Route path={routes.INDEX} element={<LandingPage />} />
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.REGISTER} element={<Register />} />
        <Route path={routes.SIGN_UP} element={<SignUp />} />
      </Routes>
    </>
  );
};

export default RouterConfig;
