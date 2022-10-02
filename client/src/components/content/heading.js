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

export default function Heading({ header, action, action_label, share }) {
  const theme = useTheme();
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  const color = theme.palette.mode === "dark" ? "#74b9ff" : "#0984e3";

  const ShareElements = () => {
    return (
      <>
        <Button
          sx={{ borderColor: color }}
          size="large"
          href={`mailto:?subject=Share 3D in SyncPoly's Virtual Room&body=${
            share ? share.message : ""
          } Check us out here ${window.location.href}`}
        >
          <IoMail color={color} />
        </Button>
        <Button
          sx={{ borderColor: color }}
          size="large"
          href={`http://twitter.com/share?text=${
            share ? share.message : ""
          } &url=${window.location.href}&hashtags=3dshare,3dsharing,virtual`}
          target="_blank"
        >
          <BsTwitter color={color} />
        </Button>
        <Button
          sx={{ borderColor: color }}
          size="large"
          href={`https://www.facebook.com/share.php?u=${window.location.href}`}
          target="_blank"
        >
          <BsFacebook color={color} />
        </Button>
        {mobile && (
          <Button
            sx={{ borderColor: color }}
            size="large"
            href={`whatsapp://send?text=${window.location.href} ${
              share ? share.message : ""
            }`}
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
