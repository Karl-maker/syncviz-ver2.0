import VirtualSpace from "../../pages/virtual-space";
import CreateVirtualSpace from "../../pages/create-virtual-space";
import { Route, Routes } from "react-router-dom";
import PAGES from "../../utils/constants/page-names";
import About from "../../pages/about";
import ReactGA from "react-ga";
import { useEffect } from "react";
import PrivacyPolicy from "../../pages/privacy-policy";
import Terms from "../../pages/terms-conditions";
import Home from "../../pages/home";
import SearchVirtualPage from "../../pages/search-virtual-space";
import CookiePolicy from "../../pages/cookie-policy";
import LearnMore from "../../pages/learn-more";

export default function PageNavigation() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <Routes>
      <Route
        path={PAGES.VIRTUAL_FEED}
        caseSensitive={false}
        element={<Home />}
      />
      <Route
        path={PAGES.VIRTUAL_ROOM}
        caseSensitive={false}
        element={<VirtualSpace />}
      />

      <Route
        path={PAGES.CREATE_VIRTUAL_ROOM}
        caseSensitive={false}
        element={<CreateVirtualSpace />}
      />
      <Route
        path={PAGES.VIRTUAL_ROOM_SEARCH}
        caseSensitive={false}
        element={<SearchVirtualPage />}
      />
      <Route
        path={PAGES.PRIVACY_POLICY}
        caseSensitive={false}
        element={<PrivacyPolicy />}
      />
      <Route
        path={PAGES.COOKIE_POLICY}
        caseSensitive={false}
        element={<CookiePolicy />}
      />
      <Route
        path={PAGES.TERMS_AND_CONDITIONS}
        caseSensitive={false}
        element={<Terms />}
      />
      <Route
        path={PAGES.LEARN_MORE}
        caseSensitive={false}
        element={<LearnMore />}
      />
      <Route path={PAGES.ABOUT} caseSensitive={false} element={<About />} />
    </Routes>
  );
}
