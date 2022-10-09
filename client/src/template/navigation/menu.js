import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Switch,
  Grid,
  Typography,
  useMediaQuery,
  Chip,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext } from "../theme/provider";
import PAGES from "../../utils/constants/page-names";
import URLS from "../../utils/constants/url";
import MEDIA from "../../utils/constants/media";

// Icons

import { FiHome } from "react-icons/fi";
import { BiAddToQueue } from "react-icons/bi";
import { RiSurveyLine } from "react-icons/ri";
import { AiOutlineInfoCircle, AiOutlineRead } from "react-icons/ai";

/*

    This will be reused throughout the software for sidebars and drawers

    1. Viewer page
    2. About page
    3. Help page

    </Divide>

    4. dark/light mode

*/

export default function MenuBar({ text_color }) {
  const navigate = useNavigate();

  const ITEM_LIST = [
    {
      label: "Home",
      icon: <FiHome />,
      info: "Go to the main page",
      action: () => navigate(PAGES.VIRTUAL_FEED),
    },
    {
      label: "Virtual Room ",
      icon: <BiAddToQueue />,
      info: "Create virtual space",
      action: () => {
        navigate(PAGES.CREATE_VIRTUAL_ROOM);
      },
    },
    {
      label: "Feedback",
      icon: <RiSurveyLine />,
      info: "Give us feedback",
      action: () => window.open(URLS.feedback_survey, "_blank"),
    },
    {
      label: "Learn More",
      icon: <AiOutlineRead />,
      info: "Learn more about us here",
      action: () => window.open(PAGES.LEARN_MORE),
    },
    {
      label: "About Us",
      icon: <AiOutlineInfoCircle />,
      info: "Why are we here?",
      action: () => navigate(PAGES.ABOUT),
    },
  ];

  /*
   * Styling for theme switch taken from https://mui.com/material-ui/react-switch/
   */

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            theme.palette.mode === "dark" ? "#ffff" : "#2980b9"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#ffff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#ffff",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          theme.palette.mode === "dark" ? "#ffff" : "#2980b9"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);

  const Contact = ({ action, label }) => {
    return (
      <div style={{ display: "flex" }}>
        <Chip
          onClick={action}
          label={
            <Typography
              variant="body2"
              sx={{
                color: mobile ? "#ffff" : "",
                fontSize: 10,
              }}
            >
              {label}
            </Typography>
          }
          size="small"
          sx={{ height: "100%", bgcolor: "transparent" }}
        />
      </div>
    );
  };

  return (
    <>
      <List>
        {ITEM_LIST.map((item, index) => (
          <ListItem key={item.label}>
            <ListItemButton sx={{ borderRadius: "10px" }} onClick={item.action}>
              <ListItemIcon sx={{ color: text_color || "text.default" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                sx={{ color: text_color || "text.default" }}
                primary={item.label}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignContent: "center",
          }}
        >
          <Contact
            label={"Privacy Policy"}
            action={() => {
              navigate(PAGES.PRIVACY_POLICY);
            }}
          />
          <Divider orientation="vertical" flexItem />
          <Contact
            label={"Cookie Policy"}
            action={() => {
              navigate(PAGES.COOKIE_POLICY);
            }}
          />
          <Divider orientation="vertical" flexItem />
          <Contact
            label={"Terms of Service"}
            action={() => {
              navigate(PAGES.TERMS_AND_CONDITIONS);
            }}
          />
        </div>
      </List>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        {
          // Share Area
        }
      </div>

      <List>
        {
          // Toggle button
        }
        <Grid
          container
          direction="colu"
          justifyContent="center"
          alignItems="center"
        >
          <MaterialUISwitch
            checked={theme.palette.mode === "dark"}
            onChange={colorMode.toggleColorMode}
            inputProps={{ "aria-label": "theme-switch" }}
          />
        </Grid>
      </List>
    </>
  );
}
