/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import { UserContextProvider } from "./context/userContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import "animate.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);
