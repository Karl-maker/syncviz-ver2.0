import { Box, Chip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigation = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "100px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Typography variant="h3">Not Found :/</Typography>
        <Chip
          variant="caption"
          sx={{ marginTop: "20px" }}
          onClick={() => navigation("/")}
          label="Get back to home page"
        />
      </div>
    </Box>
  );
}
