import PAGES from "../utils/constants/page-names";
import { Button, Typography, Box, useMediaQuery, Divider } from "@mui/material";
import MEDIA from "../utils/constants/media";
import { HiOutlineCubeTransparent } from "react-icons/hi";
import { useEffect, useState } from "react";
import synclogo from "../images/logo192.png";
import VirtualSpaceClass from "../classes/virtual-space";
import Preview from "../components/preview";
import GridLayout from "../template/layout/grid-layout";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import desktop_img from "../images/desktop-view.png";

export default function Home() {
  const [virtualRooms, setVirtualRooms] = useState([]);
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  const navigation = useNavigate();

  useEffect(() => {
    VirtualSpaceClass.searchVirtualRooms("", { page: 1 }).then((results) => {
      if (results) setVirtualRooms(results.virtual_rooms);
      else setVirtualRooms([]);
    });
  }, []);

  const Examples = ({ height }) => {
    return (
      <>
        <img
          src={desktop_img}
          alt="desktop_img"
          height={height ? height : 300}
        />
      </>
    );
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
          <img src={synclogo} alt="SyncPoly-logo" height={120} />
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
                navigation(PAGES.CREATE_VIRTUAL_ROOM);
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
          {!virtualRooms.length && <Examples height={400} />}
          <div style={{ marginRight: "10px" }}>
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
                SyncPoly is an online platform that makes the Metaverse
                accessible to all persons. Share 3D files with clients and
                friends.
              </Typography>
              {virtualRooms.length && (
                <>
                  <Divider
                    orientation={mobile ? "" : "vertical"}
                    flexItem={mobile ? false : true}
                    sx={
                      mobile ? {} : { marginLeft: "30px", marginRight: "30px" }
                    }
                  ></Divider>
                  <img src={synclogo} alt="SyncPoly-logo" height={80} />
                </>
              )}
            </div>

            {
              // Rooms
            }

            {virtualRooms.length ? (
              <>
                <Typography variant="caption" sx={{ marginLeft: "10px" }}>
                  Join A Virtual Room
                </Typography>
                <GridLayout>
                  {virtualRooms.map((room, i) => {
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
                  navigation(PAGES.CREATE_VIRTUAL_ROOM);
                }}
                variant="contained"
                startIcon={<HiOutlineCubeTransparent />}
              >
                Creat Room
              </Button>
            </div>
          </div>
        </Box>
      )}
    </>
  );
}
