import { Button, Divider, Stack, Typography, Chip } from "@mui/material";

export default function Article({
  header,
  subtitle,
  body,
  action_label,
  action,
  keywords,
}) {
  const common_style = { marginBottom: "10px" };

  return (
    <article>
      <Typography
        variant="h5"
        component="h2"
        sx={{ fontWeight: "bold", ...common_style }}
      >
        {header}
      </Typography>
      <Typography variant="subtitle1" component="h3" sx={{ ...common_style }}>
        {subtitle}
      </Typography>
      <Divider />
      <Typography
        variant="body1"
        component="p"
        sx={{ marginTop: "10px", ...common_style }}
      >
        <p>{body}</p>
      </Typography>
      <footer style={{ width: "100%", display: "flex", justifyContent: "end" }}>
        {keywords && (
          <Stack direction="row" spacing={1}>
            <>
              {keywords.map((keyword) => {
                return (
                  <Chip
                    size="small"
                    label={keyword.word}
                    color="primary"
                    variant="outlined"
                  />
                );
              })}
            </>
          </Stack>
        )}
        {action && (
          <Button variant="contained" disableElevation onClick={action}>
            {action_label ? { action_label } : <>Learn More</>}
          </Button>
        )}
      </footer>
    </article>
  );
}
