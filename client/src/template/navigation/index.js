import VirtualSpace from "../../pages/virtual-space";
import CreateVirtualSpace from "../../pages/create-virtual-space";
import { Route, Routes } from "react-router-dom";
import PAGES from "../../utils/constants/page-names";
import { Button, Typography, Box, useMediaQuery, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MEDIA from "../../utils/constants/media";
import { HiOutlineCubeTransparent } from "react-icons/hi";
import SearchVirtualPage from "../../pages/search-virtual-space";
import About from "../../pages/about";
import ReactGA from "react-ga";
import { useEffect, useState } from "react";
import PrivacyPolicy from "../../pages/privacy-policy";
import Terms from "../../pages/terms-conditions";
import synclogo from "../../images/logo192.png";
import VirtualSpaceClass from "../../classes/virtual-space";
import Preview from "../../components/preview";
import GridLayout from "../layout/grid-layout";

export default function PageNavigation() {
  const navigation = useNavigate();
  const [metaverseRooms, setMetaverseRooms] = useState([]);
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);

  useEffect(() => {
    VirtualSpaceClass.searchMetaverseRooms("", { page: 1 }).then((results) => {
      if (results) setMetaverseRooms(results.virtual_rooms);
      else setMetaverseRooms([]);
    });
  }, []);

  const Examples = ({ height }) => {
    return (
      <>
        {/* {theme.palette.mode === "light" ? (
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
        )} */}
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
            <img src={synclogo} alt="syncviz-logo" height={120} />
            <Divider sx={{ marginTop: "20px", marginBottom: "20px" }}>
              Get Started
            </Divider>
            <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
              Create virtual rooms to share 3D worlds with clients and friends
            </Typography>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                onClick={() => {
                  navigation(PAGES.CREATE_METAVERSE);
                }}
                variant="contained"
                startIcon={<HiOutlineCubeTransparent />}
              >
                Creat Room
              </Button>
            </div>
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
            <div style={{ marginRight: "20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ marginTop: "40px", marginBottom: "20px" }}
                >
                  Syncviz is an online platform that makes the Metaverse
                  accessible to all persons. Share 3D files with clients and
                  friends.
                </Typography>

                <Divider
                  orientation={mobile ? "" : "vertical"}
                  flexItem={mobile ? false : true}
                  sx={mobile ? {} : { marginLeft: "30px", marginRight: "30px" }}
                ></Divider>
                <img src={synclogo} alt="syncviz-logo" height={80} />
              </div>

              {
                // Rooms
              }

              {metaverseRooms.length ? (
                <>
                  <Typography variant="caption" sx={{ marginLeft: "10px" }}>
                    Join A Virtual Room
                  </Typography>
                  <GridLayout>
                    {metaverseRooms.map((room, i) => {
                      return <Preview data={room} key={i} />;
                    })}
                  </GridLayout>
                </>
              ) : (
                <></>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  marginTop: "0px",
                }}
              >
                <Button
                  onClick={() => {
                    navigation(PAGES.CREATE_METAVERSE);
                  }}
                  variant="contained"
                  startIcon={<HiOutlineCubeTransparent />}
                >
                  Creat Room
                </Button>
              </div>
            </div>
            <Examples height={400} />
          </Box>
        )}
      </>
    );
  };

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
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
      <Route
        path={PAGES.TERMS_AND_CONDITIONS}
        caseSensitive={false}
        element={<Terms />}
      />

      <Route path={PAGES.ABOUT} caseSensitive={false} element={<About />} />
    </Routes>
  );
}
