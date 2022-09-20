import VirtualSpace from "../../pages/virtual-space";
import CreateVirtualSpace from "../../pages/create-virtual-space";
import { Route, Routes } from "react-router-dom";
import PAGES from "../../utils/constants/page-names";
import { Button, Typography, Box, useMediaQuery } from "@mui/material";
import light_themed_mobile_example from "../../images/light-themed-mobile-example.png";
import dark_themed_mobile_example from "../../images/dark-themed-mobile-example.png";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import MEDIA from "../../utils/constants/media";
import { HiOutlineCubeTransparent } from "react-icons/hi";
import SearchVirtualPage from "../../pages/search-virtual-space";
import About from "../../pages/about";
import ReactGA from "react-ga";
import { useEffect } from "react";
import PrivacyPolicy from "../../pages/privacy-policy";

export default function PageNavigation() {
  const theme = useTheme();
  const navigation = useNavigate();
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);

  const Examples = ({ height }) => {
    return (
      <>
        {theme.palette.mode === "light" ? (
          <img
            src={light_themed_mobile_example}
            alt="light-themed-mobile-example"
            height={height ? height : 300}
          />
        ) : (
          <img
            src={dark_themed_mobile_example}
            alt="dark-themed-mobile-example"
            height={height ? height : 300}
          />
        )}
      </>
    );
  };

  const DemoMessage = () => {
    return (
      <>
        {mobile ? (
          <Box
            sx={{
              width: "100%",
              justifyContent: "center",
              textAlign: "center",
              marginTop: 15,
              padding: 3,
            }}
          >
            <Examples />
            <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
              Share 3D files with clients and friends, have a trail with our
              demo
            </Typography>
            <Button
              onClick={() => {
                navigation(PAGES.CREATE_METAVERSE);
              }}
              variant="contained"
              sx={{ marginTop: 5 }}
              startIcon={<HiOutlineCubeTransparent />}
            >
              Start Demo
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              justifyContent: "space-between",
              marginTop: 0,
              padding: 3,
              display: "flex",
            }}
          >
            <div style={{ marginTop: "40px" }}>
              <Typography variant="h3">Project Syncviz</Typography>
              <Typography
                variant="subtitle1"
                sx={{ marginTop: "40px", marginBottom: "20px" }}
              >
                Syncviz is an online platform that makes the Metaverse
                accessible to all persons. <br />
                Share 3D files with clients and friends, have a trail with our
                demo
              </Typography>
              <Button
                onClick={() => {
                  navigation(PAGES.CREATE_METAVERSE);
                }}
                variant="contained"
                sx={{ marginTop: "10px" }}
                startIcon={<HiOutlineCubeTransparent />}
              >
                Start Demo
              </Button>
            </div>
            <Examples height={400} />
          </Box>
        )}
      </>
    );
  };

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Routes>
      <Route
        path={PAGES.METAVERSE_FEED}
        caseSensitive={false}
        element={<DemoMessage />}
      />
      <Route
        path={PAGES.METAVERSE_ROOM}
        caseSensitive={false}
        element={<VirtualSpace />}
      />
      <Route
        path={PAGES.CREATE_METAVERSE}
        caseSensitive={false}
        element={<CreateVirtualSpace />}
      />
      <Route
        path={PAGES.METAVERSE_SEARCH}
        caseSensitive={false}
        element={<SearchVirtualPage />}
      />
      <Route
        path={PAGES.PRIVACY_POLICY}
        caseSensitive={false}
        element={<PrivacyPolicy />}
      />
      <Route path={PAGES.ABOUT} caseSensitive={false} element={<About />} />
    </Routes>
  );
}
