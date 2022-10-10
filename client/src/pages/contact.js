import Heading from "../../components/content/heading";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Syncpoly | Contact Us</title>
        <meta name="description" content="Contact Us" />
      </Helmet>
      <Box
        className="no-sidebar"
        sx={{
          overflow: "scroll",
          maxHeight: "100vh",
          padding: "20px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <Heading header={<>Contact Us</>} />
        </div>
      </Box>
    </>
  );
}
