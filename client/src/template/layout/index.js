import Header from "./header";
import { Grid, Box, Paper, useMediaQuery } from "@mui/material";
import MenuBar from "../navigation/menu";
import BottomNavigationBar from "../navigation/bottom-navigation";
import MEDIA from "../../utils/constants/media";

export default function Layout({ children }) {
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      {mobile ? (
        <>
          <Grid
            item
            xs={4}
            sm={8}
            md={12}
            lg={12}
            height="9vh"
            sx={{
              bgcolor: "background.default",
              width: "100vw",
              position: "fixed",
              top: "0",
              margin: "0",
              padding: "0",
              zIndex: 10000,
            }}
          >
            <Header />
          </Grid>
          <Grid item xs={4} sm={8} md={12} lg={12} sx={{ marginTop: "9vh" }}>
            {children}
          </Grid>
          <Paper
            elevation={3}
            sx={{
              position: "fixed",
              bottom: "0",
              width: "100vw",
              margin: "0",
              padding: "0",
              borderTop: 0,
              borderColor: "background.screen",
            }}
          >
            <BottomNavigationBar />
          </Paper>
        </>
      ) : (
        <Grid container columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
          <Grid
            item
            xs={4}
            sm={8}
            md={12}
            lg={12}
            sx={{
              position: "relative",
              height: "10vh",
              top: 0,
              width: "100%",
              zIndex: 100,
              bgcolor: "background.default",
            }}
            display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
          >
            {
              // DESKTOP
            }
            <Header />
          </Grid>

          <Grid
            container
            sx={{ bgcolor: "background.default", height: "100vh" }}
          >
            <Grid
              item
              xs={0}
              sm={0}
              md={1}
              lg={1}
              display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
              sx={{ bgcolor: "background.default", height: "100%" }}
            >
              {
                // White space
              }
            </Grid>
            <Grid
              item
              xs={0}
              sm={0}
              md={3}
              lg={3}
              display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
              sx={{
                bgcolor: "background.default",
                height: "100%",
                paddingLeft: "0px",
                paddingRight: "40px",
              }}
            >
              {
                // Side menu bar
              }
              <MenuBar />
            </Grid>
            <Grid item className="page" xs={12} sm={12} md={7} lg={7} sx={{}}>
              {
                // main body with page
              }
              {children}
            </Grid>
            <Grid
              item
              xs={0}
              sm={0}
              md={1}
              lg={1}
              display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
              sx={{ bgcolor: "background.default", height: "100%" }}
            >
              {
                // White space
              }
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
