import { createContext } from "react";
import CookiePermission from "../utils/tools/cookie-consent";
import ReactGA from "react-ga";
import config from "../config";
import { useState } from "react";

export const CookieContext = createContext({});

export function CookieContextProvider({ children }) {
  const [cookiePermission, setCookiePermission] = useState(true);

  const handleAcceptCookie = () => {
    setCookiePermission(true);
    if (config.Google.Analytics.TRACKING_ID) {
      ReactGA.initialize(config.Google.Analytics.TRACKING_ID);
    }
  };

  return (
    <CookieContext.Provider value={{ cookiePermission }}>
      {children}
      <CookiePermission accept={handleAcceptCookie} />
    </CookieContext.Provider>
  );
}
