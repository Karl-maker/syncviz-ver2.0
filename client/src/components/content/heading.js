import {
  Button,
  Divider,
  Typography,
  useMediaQuery,
  ButtonGroup,
} from "@mui/material";
import { IoMail } from "react-icons/io5";
import { BsTwitter, BsFacebook, BsWhatsapp } from "react-icons/bs";
import MEDIA from "../../utils/constants/media";
import { useTheme } from "@mui/material/styles";

export default function Heading({ header, action, action_label }) {
  const theme = useTheme();
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  const color = theme.palette.mode === "dark" ? "#74b9ff" : "#0984e3";

  const ShareElements = () => {
    return (
      <>
        <Button
          size="large"
          href={`mailto:?subject=Share 3D in SyncPoly's Virtual Room&body=SyncPoly offers a way to bring 3D to clients and friends in a interactive helpful way. This allow persons to develop creative ways share experiences and information. Check us out ${window.location.href} `}
        >
          <IoMail color={color} />
        </Button>
        <Button
          size="large"
          href={`http://twitter.com/share?text=Share 3D Models, Products, Environments and more in SyncPoly's Virtual Room &url=${window.location.href}&hashtags=3dshare,3dsharing,virtual`}
          target="_blank"
        >
          <BsTwitter color={color} />
        </Button>
        <Button
          size="large"
          href={`https://www.facebook.com/share.php?u=${window.location.href}`}
          target="_blank"
        >
          <BsFacebook color={color} />
        </Button>
        {mobile && (
          <Button
            size="large"
            href={`whatsapp://send?text=${window.location.href}`}
            data-action="share/whatsapp/share"
          >
            <BsWhatsapp color={color} />
          </Button>
        )}
      </>
    );
  };

  return (
    <div
      style={{
        display: mobile ? "" : "flex",
        alignItems: "center",
        textAlign: mobile ? "center" : "",
      }}
    >
      <div>
        <Typography
          variant="h3"
          sx={{ marginBottom: "30px", fontWeight: "bold" }}
        >
          {header}
        </Typography>
        {action && (
          <Button
            sx={{ marginBottom: "30px", fontWeight: "bold" }}
            onClick={action}
            variant="contained"
            disableElevation
          >
            {action_label}
          </Button>
        )}
      </div>
      {action || !mobile ? (
        <Divider
          orientation={mobile ? "" : "vertical"}
          flexItem={mobile ? false : true}
          sx={mobile ? {} : { marginLeft: "30px", marginRight: "30px" }}
        ></Divider>
      ) : (
        <></>
      )}
      <div>
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <Typography variant="caption">Share</Typography>
        </div>
        <ButtonGroup
          orientation={mobile ? "horizontal" : "vertical"}
          variant="outlined"
          aria-label="outlined primary button group"
        >
          {
            // Share
          }

          <ShareElements />
        </ButtonGroup>
      </div>
    </div>
  );
}
