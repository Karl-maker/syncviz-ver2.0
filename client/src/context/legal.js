import { createContext } from "react";
import LegalNote from "../components/legal/legalDrawer";
import ReactGA from "react-ga";
import { GoogleOAuthProvider } from "@react-oauth/google";
import config from "../config";
import { useState } from "react";

export const LegalContext = createContext({});

export function LegalContextProvider({ children }) {
  const [cookie, setCookies] = useState(true);

  const handleAcceptCookie = () => {
    setCookies(true);
    if (config.Google.Analytics.TRACKING_ID) {
      ReactGA.initialize(config.Google.Analytics.TRACKING_ID);
    }
  };

  return (
    <GoogleOAuthProvider clientId={config.Google.OAuth.CLIENT_ID}>
      <LegalContext.Provider value={{ cookie }}>
        {children}
        <LegalNote accept={handleAcceptCookie} />
      </LegalContext.Provider>
    </GoogleOAuthProvider>
  );
}
