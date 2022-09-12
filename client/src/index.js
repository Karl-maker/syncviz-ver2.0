import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "./css/global.css";

import ReactDOM from "react-dom/client";
import PageNavigation from "./template/navigation";
import reportWebVitals from "./utils/tools/reportWebVitals";
import Layout from "./template/layout";
import { BrowserRouter as Router } from "react-router-dom";
import StyleProvider from "./template/theme/provider";
import { SearchContextProvider } from "./context/search";
import { UserContextProvider } from "./context/user";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    {
      // Wrap Routing
    }

    <StyleProvider>
      <UserContextProvider>
        <SearchContextProvider>
          <CssBaseline />
          {
            // Provide Theme
          }
          <Layout>
            <PageNavigation />
          </Layout>
        </SearchContextProvider>
      </UserContextProvider>
    </StyleProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
