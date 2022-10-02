import VirtualSpace from "../../pages/virtual-space";
import CreateVirtualSpace from "../../pages/create-virtual-space";
import { Route, Routes, useLocation } from "react-router-dom";
import PAGES, { NESTED } from "../../utils/constants/page-names";
import About from "../../pages/about";
import ReactGA from "react-ga";
import { useEffect } from "react";
import PrivacyPolicy from "../../pages/privacy-policy";
import Terms from "../../pages/terms-conditions";
import Home from "../../pages/home";
import SearchVirtualPage from "../../pages/search-virtual-space";
import CookiePolicy from "../../pages/cookie-policy";
import LearnMore from "../../pages/learn-more";
import NotFound from "../../pages/not-found";
import LearnMoreVirtualRoom from "../../pages/learn-more/virtual-room";
import LearnMore3DTag from "../../pages/learn-more/3d-tag";

export default function PageNavigation() {
  const location = useLocation();
  useEffect(() => {
    if (location) ReactGA.pageview(location.pathname.split(/[?#]/)[0]);
  }, [location]);

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
      {
        // Learn More
      }
      <Route
        path={`${PAGES.LEARN_MORE}${NESTED.LEARN_MORE.VIRTUAL_ROOM}`}
        element={<LearnMoreVirtualRoom />}
      />
      <Route
        path={`${PAGES.LEARN_MORE}${NESTED.LEARN_MORE.TAG}`}
        element={<LearnMore3DTag />}
      />
      <Route path={PAGES.ABOUT} caseSensitive={false} element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
