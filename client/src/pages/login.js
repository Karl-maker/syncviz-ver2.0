import { Box, Divider, Typography } from "@mui/material";
import GoogleLoginButton from "../components/login/google-button";
import synclogo from "../images/logo192.png";
import { useContext } from "react";
import { UserAccountContext } from "../context/user";
import { useNavigate } from "react-router-dom";
import PAGE from "../utils/constants/page-names";

export default function Login() {
  // Once Login Page hide everything else

  const { user, setLoggedIn, loggedIn } = useContext(UserAccountContext);
  const mobile = true;
  const navigation = useNavigate();
  const text_style = {};

  if (loggedIn) {
    navigation(PAGE.METAVERSE_FEED);
  }

  return (
    <div style={{ margin: "10px" }}>
      {
        // Login Page Design Inspiration: https://dribbble.com/shots/18063206-Login-UI
      }

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            borderRadius: "20px",
            textAlign: "center",
            padding: "50px",
            display: mobile ? "" : "flex",
            ...text_style,
          }}
        >
          <div>
            <div>
              <img src={synclogo} alt="syncviz-logo" height={180} />
            </div>
            <Typography variant="h4" sx={{ marginTop: "10px", ...text_style }}>
              Syncviz Login
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ marginBottom: "20px", marginTop: "10px", ...text_style }}
            >
              Hey, Enter your details to get sign in to your account
            </Typography>
          </div>

          <Divider
            orientation={mobile ? "" : "vertical"}
            flexItem={mobile ? false : true}
            sx={
              mobile
                ? { marginBottom: "20px" }
                : { marginLeft: "80px", marginRight: "80px" }
            }
          >
            Sign In With
          </Divider>

          <div>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <div>
                <GoogleLoginButton setLogin={setLoggedIn} user={user} />
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
