import PAGES from "../utils/constants/page-names";
import { Button, Typography, Box, useMediaQuery, Divider } from "@mui/material";
import MEDIA from "../utils/constants/media";
import { HiOutlineCubeTransparent } from "react-icons/hi";
import synclogo from "../images/logo192.png";
import { useNavigate } from "react-router-dom";
import { FaInfo } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { useTheme } from "@mui/material/styles";
import Heading from "../components/content/heading";

export default function Home() {
  const theme = useTheme();
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  const navigation = useNavigate();

  const spanStyle = {
    color: theme.palette.mode === "dark" ? "#74b9ff" : "#0984e3",
  };

  return (
    <>
      <Helmet>
        <title>SyncPoly | Share 3D Models, Products and Environments</title>
        <meta
          name="description"
          content="Share 3D Models, Products or Environments live with anyone. Quickly you can allow others to interact and explore 3D while communicating with eachother. SyncPoly helps to bring 3D sharing to everyone."
        />
      </Helmet>
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
          <div style={{ marginBottom: "30px" }}>
            <Heading
              share={{
                message:
                  "Welcome to Syncpoly, an online 3D sharing platform that allows persons to create amazing experiences and worlds. Syncpoly allows anyone to join a virtual environment easily from their phone or laptop",
              }}
              header={
                <>
                  <img src={synclogo} alt="SyncPoly-logo" height={120} />
                </>
              }
            />
          </div>

          <Divider sx={{ marginTop: "20px", marginBottom: "20px" }}>
            Get Started
          </Divider>
          <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
            Share 3D Models, Products, Environments and more in SyncPoly's
            Virtual Room
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
                navigation(PAGES.CREATE_VIRTUAL_ROOM);
              }}
              disableElevation
              variant="contained"
              startIcon={<HiOutlineCubeTransparent />}
            >
              Creat Virtual Room
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
          <div style={{ marginRight: "10px" }}>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ marginBottom: "10px" }}>
                  <Heading
                    header={
                      <>
                        Share <span style={spanStyle}>3D</span> Models,
                        Products, Environments and more in{" "}
                        <span style={spanStyle}>SyncPoly</span>'s Virtual Room
                      </>
                    }
                  />
                </div>
              </div>
              <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                SyncPoly offers a way to bring 3D to clients and friends in a
                interactive helpful way. This allow persons to develop creative
                ways share experiences and information.
              </Typography>
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
              }}
            >
              <Button
                onClick={() => {
                  navigation(PAGES.CREATE_VIRTUAL_ROOM);
                }}
                variant="contained"
                disableElevation
                startIcon={<HiOutlineCubeTransparent />}
              >
                Create Virtual Room
              </Button>
              <Divider
                orientation={mobile ? "" : "vertical"}
                flexItem={mobile ? false : true}
                sx={
                  mobile
                    ? { marginLeft: "10px", marginRight: "10px" }
                    : { marginLeft: "30px", marginRight: "30px" }
                }
              ></Divider>
              <Button
                onClick={() => navigation(PAGES.LEARN_MORE)}
                variant="contained"
                disableElevation
                startIcon={<FaInfo />}
              >
                Learn More
              </Button>
            </div>
          </div>
        </Box>
      )}
    </>
  );
}
