import { Box, Typography, useMediaQuery } from "@mui/material";
import MEDIA from "../utils/constants/media";
import { useTheme } from "@mui/material/styles";

import light_themed_mobile_example from "../images/light-themed-mobile-example.png";
import dark_themed_mobile_example from "../images/dark-themed-mobile-example.png";
import desktop_example from "../images/desktop-view.png";

export default function About() {
  const theme = useTheme();
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);

  const Examples = ({ height }) => {
    if (!mobile) {
      return (
        <img
          src={desktop_example}
          alt="desktop-example"
          height={height ? height : 300}
        />
      );
    }
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
          <Typography variant="h5">About Us</Typography>
          <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
            SyncPoly is an online platform that makes the Metaverse accessible
            to all persons. The Metaverse in our definition is a virtual world
            where people can connect to each other to share an experience in 3D.
            SyncPoly brings the Metaverse to ordinary people by giving them the
            ability to develop their own spaces with ease and the help of the
            community. Virtual Rooms allow its owners to share experiences,
            inform, sell products, entertain and advertise to all its attendees
            in a familiar hassle free manner. Services, products and a community
            are developed by SyncPoly to breathe life into the Metaverse in a
            way where all persons can gain value from it.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",

            marginTop: 0,
            padding: 3,
          }}
        >
          <div style={{ marginTop: "40px", marginRight: "10px" }}>
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              About Us
            </Typography>
            <div style={{ justifyContent: "center", display: "flex" }}>
              <Examples height={200} />
            </div>
            <Typography
              variant="subtitle1"
              sx={{
                marginTop: "40px",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              SyncPoly is an online platform that makes the Metaverse accessible
              to all persons. The Metaverse in our definition is a virtual world
              where people can connect to each other to share an experience in
              3D. SyncPoly brings the Metaverse to ordinary people by giving
              them the ability to develop their own spaces with ease and the
              help of the community. Metaverse Rooms allow its owners to share
              experiences, inform, sell products, entertain and advertise to all
              its attendees in a familiar hassle free manner. Services, products
              and a community are developed by SyncPoly to breathe life into the
              Metaverse in a way where all persons can gain value from it.
            </Typography>
          </div>
        </Box>
      )}
    </>
  );
}
