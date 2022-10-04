import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "./css/global.css";
import "babel-polyfill";

import ReactDOM from "react-dom/client";
import PageNavigation from "./template/navigation";
import reportWebVitals from "./utils/tools/reportWebVitals";
import Layout from "./template/layout";
import { BrowserRouter as Router } from "react-router-dom";
import StyleProvider from "./template/theme/provider";
import { SearchContextProvider } from "./context/search";
import { UserContextProvider } from "./context/user";
import { CookieContextProvider } from "./context/cookie-permission";
import ReactGA from "react-ga";
import config from "./config";

ReactGA.initialize(config.Google.Analytics.TRACKING_ID);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookieContextProvider>
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
  </CookieContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
