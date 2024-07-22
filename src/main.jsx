import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Pc6alILzds7u2UbqVFcHoUrfxVqOZk6zzadeQYov47FqjAaYyGtu7XrYuRGSEMOOmuUfsL6Dn8cM9Z5TYHKav3l00wlf3Mm47"
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Provider>
  </React.StrictMode>
);
