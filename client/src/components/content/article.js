import { Button, Divider, Stack, Typography, Chip } from "@mui/material";

export default function Article({
  header,
  subtitle,
  body,
  learn_more,
  learn_more_text,
  keywords,
}) {
  const common_style = { marginBottom: "10px" };

  return (
    <article style={{ padding: "20px" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", ...common_style }}>
        {header}
      </Typography>
      <Typography variant="subtitle1" sx={{ ...common_style }}>
        {subtitle}
      </Typography>
      <Divider />
      <Typography variant="body1" sx={{ marginTop: "10px", ...common_style }}>
        {body}
      </Typography>
      <footer style={{ width: "100%", display: "flex", justifyContent: "end" }}>
        {keywords && (
          <Stack direction="row" spacing={1}>
            <>
              {keywords.map((keyword) => {
                return (
                  <Chip size="small" label={keyword.word} color="primary" />
                );
              })}
            </>
          </Stack>
        )}
        {learn_more && (
          <Button variant="contained" disableElevation>
            {learn_more_text ? { learn_more_text } : <>Learn More</>}
          </Button>
        )}
      </footer>
    </article>
  );
}
