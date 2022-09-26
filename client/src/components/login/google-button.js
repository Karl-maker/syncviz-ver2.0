import { GoogleLogin } from "@react-oauth/google";
import config from "../../config";
import { LegalContext } from "../../context/legal";
import { useContext } from "react";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton({ user, setLogin }) {
  const { cookie } = useContext(LegalContext);

  const handleLogin = async (googleData) => {
    if (googleData.credential) {
      user.credential = googleData.credential;
    }

    const res = await fetch(`${config.API.LIVE_SERVER}/api/auth/google`, {
      method: "POST",
      body: JSON.stringify({
        access_token: googleData.credential,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (data.user) {
      user.guest = false;
      user.email = data.user.email;
      user.username = data.user.username;
      user.img = data.user.picture;
      user.access_token = data.access_token;
    }
    // store returned user somehow
    setLogin(true);
  };

  const handleFailure = (err) => {};

  // const login = useGoogleLogin({
  //   onSuccess: (tokenResponse) => handleLogin(tokenResponse),
  //   //flow: "auth-code",
  // });

  return (
    <>
      {cookie ? (
        <GoogleLogin
          size="large"
          theme="filled_blue"
          clientId={config.Google.OAuth.CLIENT_ID}
          buttonText="Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy="single_host_origin"
        ></GoogleLogin>
      ) : (
        <Button
          variant="outlined"
          startIcon={<FcGoogle />}
          sx={{ textTransform: "none" }}
          disabled={true}
        >
          Sign In With Google
        </Button>
      )}
    </>
  );
}
