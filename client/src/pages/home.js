import PAGES from "../utils/constants/page-names";
import { Button, Typography, Box, useMediaQuery, Divider } from "@mui/material";
import MEDIA from "../utils/constants/media";
import { HiOutlineCubeTransparent } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { FaInfo } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { useTheme } from "@mui/material/styles";
import Heading from "../components/content/heading";

export default function Home() {
  const synclogo = window.location.origin + "/logo192.png";
  const theme = useTheme();
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  const navigation = useNavigate();

  const spanStyle = {
    color: theme.palette.mode === "dark" ? "#74b9ff" : "#0984e3",
  };

  return (
    <>
      <Helmet>
        <title>SyncPoly | Create Virtual Experiences</title>
        <meta
          name="description"
          content="Host 3D Models, Products or Environments live on a Virtual Room. Quickly you can allow others to interact and explore 3D while communicating with eachother."
        />
        <link rel="canonical" href={`${PAGES.VIRTUAL_FEED}`} />
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
                  "Welcome to Syncpoly, an online platform where persons can develop Virtual Rooms that allows persons to create amazing experiences and worlds. Syncpoly allows anyone to join a virtual environment easily from their phone or laptop",
              }}
              header={
                <>
                  <img
                    src={synclogo}
                    alt="SyncPoly-logo"
                    height={120}
                    loading="lazy"
                  />
                </>
              }
            />
          </div>
          <p>
            Create Virtual Rooms to give many persons a 3D experience. You can
            allow persons to interact with designs, concepts, products or models
            using our 3D hosting technology.
          </p>
          <Divider sx={{ marginTop: "20px", marginBottom: "20px" }}>
            Get Started
          </Divider>
          <Typography variant="subtitle1" sx={{ marginTop: 2 }}></Typography>
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
                        Create <span style={spanStyle}>Virtual Rooms</span> to
                        allow persons to interact and experience products,
                        designs or concepts.
                      </>
                    }
                  />
                </div>
              </div>
              <Typography
                variant="body1"
                sx={{ marginBottom: "20px" }}
                component="P"
              >
                SyncPoly offers a way to bring virtual experiences to persons
                online. Create Virtual Rooms to give many persons a 3D
                experience. You can allow persons to interact with designs,
                concepts, products or models using our 3D hosting technology.
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
