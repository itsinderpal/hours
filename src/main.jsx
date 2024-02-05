import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import hourReducer from "./reducers/hourReducer.jsx";
import userReducer from "./reducers/userReducer.jsx";

const store = configureStore({
  reducer: {
    hours: hourReducer,
    user: userReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
