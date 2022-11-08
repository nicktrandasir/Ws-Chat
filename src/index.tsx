import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { rtkApi } from "./api/baseApi";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ApiProvider api={rtkApi}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);
