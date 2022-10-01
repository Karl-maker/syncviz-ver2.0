import Article from "../../components/content/article";
import Heading from "../../components/content/heading";
import PAGES from "../../utils/constants/page-names";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet";
import MEDIA from "../../utils/constants/media";
import { useNavigate } from "react-router-dom";

export default function LearnMoreVirtualRoom() {
  const theme = useTheme();
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  const navigation = useNavigate();
  const common_span = {
    color: theme.palette.mode === "dark" ? "#74b9ff" : "#0984e3",
  };
  const common_a = {
    textDecoration: "none",
    color: theme.palette.mode === "dark" ? "#81ecec" : "#00cec9",
  };

  const article = {
    header: (
      <>
        What is a <span style={common_span}>Virtual Room</span>?
      </>
    ),
    body: (
      <>
        A Virtual Room is the environment in which 3D models can be broadcasted
        to everyone attending it. Attendees can interact with the model,
        communicate with eachother and select{" "}
        <a style={common_a} href={`${PAGES.LEARN_MORE_3D_TAG}`}>
          3D Tags.
        </a>{" "}
        With the main features given in these Virtual Rooms you can create
        virtual environments where attendees may learn about a design, purchase
        a product using a{" "}
        <a style={common_a} href={`${PAGES.LEARN_MORE_3D_TAG}`}>
          3D Tag
        </a>{" "}
        or just experience an event in a different way.
      </>
    ),
    keywords: [{ word: "virtual room" }, { word: "3d sharing" }],
  };

  return (
    <>
      <Helmet>
        <title>SyncPoly | Learn More About Virtual Rooms</title>
        <meta
          name="description"
          content="Learn more about Syncpoly's Virtual Rooms and how they can be used to develop a Metaverse and Virtual environment. A Virtual Room is the environment in which 3D models can be broadcasted to everyone attending it. Attendees can interact with the model, communicate with eachother and select 3D Tags. With the main features given in these Virtual Rooms you can create virtual environments where attendees may learn about a design, purchase a product using a 3D Tag or just experience an event in a different way."
        />
      </Helmet>
      <Box
        className="no-sidebar"
        sx={{
          overflow: mobile ? "none" : "scroll",
          maxHeight: "100vh",
          padding: "20px",
        }}
      >
        <div style={{ marginBottom: "30px" }}>
          <Heading
            header={
              <>
                Learn More About <span style={common_span}>Virtual Rooms</span>
              </>
            }
            action_label="Start A Virtual Room"
            action={() => navigation(PAGES.CREATE_VIRTUAL_ROOM)}
          />
        </div>

        <Article
          keywords={article.keywords}
          learn_more_text={article.learn_more_text}
          learn_more={article.learn_more}
          header={article.header}
          subtitle={article.subtitle}
          body={article.body}
        />
      </Box>
    </>
  );
}
