import { Grid } from "@mui/material";

export default function GridLayout({ children }) {
  return (
    <Grid
      className="no-sidebar"
      container
      spacing={{ xs: 0, md: 0 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{
        overflowY: "auto",
        maxHeight: "100vh",
        paddingBottom: "50px",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {children}
    </Grid>
  );
}
