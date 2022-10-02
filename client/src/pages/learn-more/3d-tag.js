import Article from "../../components/content/article";
import Heading from "../../components/content/heading";
import PAGES from "../../utils/constants/page-names";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet";
import { NESTED as nested } from "../../utils/constants/page-names";
import MEDIA from "../../utils/constants/media";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LearnMore3DTag() {
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
        What is a <span style={common_span}>3D Tag</span>?
      </>
    ),
    body: (
      <>
        3D Tags are annotations that are placed in the{" "}
        <Link
          style={common_a}
          to={`${nested.LEARN_MORE.INDEX}${nested.LEARN_MORE.VIRTUAL_ROOM}`}
        >
          Virtual Room
        </Link>
        . These can highlight aspects of the Virtual environment that can inform
        or give a call to action. 3D Tags can be used in many creative ways such
        as the following:
        <ul>
          <li>1. Annotations</li>
          <li>2. Call to Actions</li>
          <li>3. Labels</li>
        </ul>
        <br />
        <br />
        3D Tags can be added live in the{" "}
        <Link
          style={common_a}
          to={`${nested.LEARN_MORE.INDEX}${nested.LEARN_MORE.VIRTUAL_ROOM}`}
        >
          Virtual Room
        </Link>
        .
      </>
    ),
    keywords: [{ word: "virtual room" }, { word: "3d tag" }],
  };

  return (
    <>
      <Helmet>
        <title>SyncPoly | Learn More About 3D Tag</title>
        <meta
          name="description"
          content=" 3D Tags are annotations that are placed in the Virtual Room. These can highlight aspects of the Virtual environment that can inform or give a call to action. 3D Tags can be used in many creative ways such as the following; Annotaions, Labels and Call to actions"
        />
        <link
          rel="canonical"
          href={`${nested.LEARN_MORE.INDEX}${nested.LEARN_MORE.TAG}`}
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
        <div style={{ marginBottom: "300px" }}>
          <div style={{ marginBottom: "20px" }}>
            <Heading
              share={{
                message:
                  "Learn more about Syncpoly's 3D Tags and how it can improve your Virtual Room experience.",
              }}
              header={
                <>
                  Learn More About <span style={common_span}>3D Tags</span>
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
          />{" "}
        </div>
      </Box>
    </>
  );
}

/*

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

        */
