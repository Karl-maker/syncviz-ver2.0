import PAGE from "../../utils/constants/page-names";
import synclogo from "../../images/logo192.png";
import { useTheme } from "@mui/material/styles";
import { VscEye } from "react-icons/vsc";
import { ImEnter } from "react-icons/im";
import BabylonViewer from "../../components/virtual-space/babylon-viewer";
import {
  useMediaQuery,
  Grid,
  Chip,
  Typography,
  CircularProgress,
} from "@mui/material";
import MEDIA from "../../utils/constants/media";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Preview({ data }) {
  const room = data;
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <Grid xs={2} sm={4} md={4} sx={{ height: 300 }}>
      <div
        style={{
          position: "relative",
          padding: "0px",
          width: "auto",
          height: "100%",
          webKitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none",
        }}
      >
        {room.model.url ? (
          <BabylonViewer
            modelUrl={room.model.url}
            setLoading={setLoading}
            setProgress={setProgress}
            borderRadiusNull={1}
          />
        ) : (
          <div
            style={{
              zIndex: 10000,
              borderRadius: "0em",
              backgroundColor:
                theme.palette.mode === "dark" ? "#34495e" : "#ecf0f1",
              height: "100%",
              width: mobile ? "100%" : "100%",
              overflow: "hidden",
              margin: mobile ? "0px" : "0px",
              padding: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={synclogo} alt="syncviz-logo" height={80} />
          </div>
        )}
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            top: "0%",
            left: "0%",
            marginLeft: "5px",
            marginTop: "5px",
          }}
        >
          {loading ? (
            <CircularProgress
              size={15}
              variant="determinate"
              value={progress}
            />
          ) : (
            <Chip
              size={"small"}
              icon={
                <Chip
                  label={
                    <Typography
                      variant="overline"
                      sx={{
                        borderColor: "text.primary",
                        color: "#ffff",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      <>LIVE</>
                    </Typography>
                  }
                  size={"small"}
                  sx={{ fontSize: "12px", bgcolor: "#d63031" }}
                />
              }
              label={<></>}
              sx={{
                width: "auto",
                justifyContent: "end",
                alignContent: "center",
                bgcolor: "transparent",
              }}
            />
          )}
        </div>
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            top: "0%",
            right: "0%",
            marginRight: "10px",
            marginTop: "5px",
          }}
        >
          <Chip
            onClick={() => {
              navigate(`${PAGE.METAVERSE_ROOM}?id=${room._id}`);
            }}
            icon={<ImEnter size={12} />}
            label={
              <Typography
                variant="caption"
                display="block"
                sx={{
                  color: "text.secondary",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                JOIN
              </Typography>
            }
            size="small"
          />
        </div>
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            width: "70%",
            bottom: "0%",
            left: "0%",
            marginLeft: "10px",
            marginBottom: "5px",
            display: "flex",
            alignContent: "center",
          }}
        >
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{
              marginTop: "3px",
              color: "text.secondary",
              alignItems: "center",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
          >
            <>{room.description}</>
          </Typography>
        </div>
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            bottom: "0%",
            right: "0%",
            marginRight: "5px",
            marginBottom: "0px",
            display: "flex",
            alignContent: "center",
          }}
        >
          <Chip
            variant="outlined"
            label={
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{
                  color: "text.secondary",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <>{room.current_amount_attending}</>
                <VscEye style={{ marginLeft: "5px" }} />
              </Typography>
            }
            sx={{
              padding: "0px",
              margin: "0px",
              borderWidth: "0px",
              width: "auto",
              justifyContent: "start",
              alignContent: "center",
            }}
          />
        </div>
      </div>
    </Grid>
  );
}
