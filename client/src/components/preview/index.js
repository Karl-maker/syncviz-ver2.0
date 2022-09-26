import PAGE from "../../utils/constants/page-names";
import { VscEye } from "react-icons/vsc";
import { Grid, Chip, Typography, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import User from "../../classes/user";
import Timer from "../virtual-space/timer";

export default function Preview({ data }) {
  const room = data;
  const host = new User(room.user.username, "", room.user.picture || "");
  const navigate = useNavigate();

  return (
    <Grid xs={4} sm={8} md={12} sx={{ padding: "5px" }}>
      <Box
        onClick={() => {
          navigate(`${PAGE.METAVERSE_ROOM}?id=${room._id}`);
        }}
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          bgcolor: "background.screen",
          padding: "10px",
          borderRadius: "20px",
          display: "flex",
          cursor: "pointer",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {host.display({ backgroundColor: "transparent" })}
          <Divider
            orientation={"vertical"}
            flexItem={true}
            sx={{ marginLeft: "0px", marginRight: "10px" }}
          ></Divider>
          <Typography
            variant="caption"
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
          >
            {room.description}
          </Typography>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Timer start={room.createdAt} timeLeft={room.time_limit} on={true} />
          <Chip
            icon={<VscEye size={12} />}
            sx={{ marginLeft: "5px", bgcolor: "transparent" }}
            label={
              <Typography variant="caption">
                {room.current_amount_attending}
              </Typography>
            }
            size="small"
          />
        </div>
      </Box>
    </Grid>
  );
}
