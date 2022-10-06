import { Grid, Box, Tooltip, Chip, useMediaQuery } from "@mui/material";
import { RiFileUploadFill } from "react-icons/ri";
import { FaLock } from "react-icons/fa";
import MEDIA from "../../../utils/constants/media";

export default function Selection({ data, action, lock, premium }) {
  const { name, thumbnail, description } = data;
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);

  return (
    <Grid item xs={4} sm={4} md={6} sx={{ padding: 0.5 }} onClick={action}>
      <Tooltip title={description}>
        <Box
          sx={{
            position: "relative",
            borderRadius: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: mobile ? "150px" : "100px",
            width: "100%",
            bgcolor: "background.screen",
          }}
        >
          <div
            style={{
              position: "absolute",
              zIndex: 10,
              top: "0%",
              right: "0%",
              marginRight: "5px",
              marginTop: "2px",
            }}
          >
            <Chip
              size="small"
              sx={{ fontSize: "8px", padding: 0.05 }}
              label={name}
            />
            {premium && (
              <Chip
                label="PREMIUM"
                size="small"
                sx={{
                  fontSize: "8px",
                  padding: 0.05,
                  bgcolor: "#fbc531",
                  color: "#353b48",
                  marginLeft: "5px",
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
              marginRight: "5px",
              marginTop: "2px",
            }}
          >
            {lock && (
              <Chip
                label={<FaLock />}
                size="small"
                sx={{ fontSize: "8px", padding: 0.05, marginLeft: "3px" }}
              />
            )}
          </div>

          {thumbnail ? (
            <img
              src={thumbnail}
              alt={name}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: "15px",
              }}
              loading="lazy"
            />
          ) : (
            <RiFileUploadFill size={30} />
          )}
        </Box>
      </Tooltip>
    </Grid>
  );
}
