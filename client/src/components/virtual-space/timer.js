import { Chip, Typography } from "@mui/material";

export default function Timer(props) {
  const { on } = props;

  return (
    <Chip
      label={
        <Typography
          variant="overline"
          sx={{
            borderColor: "text.primary",
            color: "#ffff",
            fontSize: "10px",
            fontWeight: "bold",
          }}
        >
          <>{on ? "LIVE" : "DISCONNECTED"}</>
        </Typography>
      }
      size="small"
      sx={{
        fontSize: "10px",
        bgcolor: on ? "#d63031" : "",
        marginRight: "5px",
      }}
    />
  );
}
