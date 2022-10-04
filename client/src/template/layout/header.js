import { Grid, useMediaQuery } from "@mui/material";
import { CgMenuRight } from "react-icons/cg";
import DrawerButton from "../buttons/drawer";
import MenuBar from "../navigation/menu";
import MEDIA from "../../utils/constants/media";
import SearchBar from "../../components/search-bar/dummy";
import PAGE from "../../utils/constants/page-names";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserAccountContext } from "../../context/user";
import EditUsername from "../../components/user-account/edit-username";

export default function Header() {
  const synclogo = window.location.origin + "/syncpoly.svg";
  const [userDialog, setUserDialog] = useState(false);
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  const navigation = useNavigate();
  const { user } = useContext(UserAccountContext);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
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
        xs={3}
        sm={3}
        md={8}
        lg={8}
        sx={{
          paddingLeft: "10px",
        }}
      >
        <img
          id="none-touch-image"
          src={synclogo}
          alt="SyncPoly-logo"
          height={mobile ? 70 : 80}
          onClick={() => navigation(PAGE.VIRTUAL_FEED)}
          style={{
            webKitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
          }}
        />
      </Grid>
      <Grid
        item
        xs={7}
        sm={7}
        md={2}
        lg={2}
        display={{ xs: "block", sm: "block", md: "block", lg: "block" }}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {
          // Search Bar
        }
        {<SearchBar />}
        {user.avatar({
          size: 30,
          sx: { marginLeft: "10px" },
          action: () => setUserDialog(true),
        })}
      </Grid>
      <Grid
        item
        xs={2}
        sm={2}
        display={{ sm: "block", md: "none", lg: "none" }}
      >
        {
          // Doesn't show on larger screens
        }
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "10px",
          }}
        >
          <DrawerButton
            element={
              <>
                <MenuBar text_color="text.tertiary" />
              </>
            }
            anchor="bottom"
            height="auto"
          >
            <CgMenuRight
              style={{ fontSize: mobile ? "30px" : "40px", marginRight: "5px" }}
            />
          </DrawerButton>
        </div>
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
      {
        // Other Stuff
      }
      <EditUsername open={userDialog} setOpen={setUserDialog} />
    </Grid>
  );
}
