import Article from "../../components/content/article";
import { useTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet";
import MEDIA from "../../utils/constants/media";
import { nested } from "../../utils/constants/page-names";
import URLS from "../../utils/constants/url";
import { Box, useMediaQuery } from "@mui/material";
import Heading from "../../components/content/heading";
import { Link, useLocation } from "react-router-dom";

export default function LearnMore() {
  const location = useLocation();
  const theme = useTheme();
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  const common_span = {
    color: theme.palette.mode === "dark" ? "#74b9ff" : "#0984e3",
  };
  const common_a = {
    textDecoration: "none",
    color: theme.palette.mode === "dark" ? "#81ecec" : "#00cec9",
  };

  const ARTICLES = [
    {
      header: (
        <>
          What is <span style={common_span}>Syncpoly</span>?
        </>
      ),

      body: (
        <>
          <span style={common_span}>Syncpoly</span> at its core is a 3D sharing
          web app that allows users to broadcast their 3D models, environments,
          concepts, products or designs. With this technology persons can avoid
          the long process of rendering their 3D creations into still images or
          video. We believe that it is much more beneficial to use a{" "}
          <Link
            style={common_a}
            to={`${location.pathname}/${nested.LEARN_MORE.VIRTUAL_ROOM}`}
          >
            Virtual Room
          </Link>{" "}
          because whoever you are the content with will be able to interact live
          with it.
          <br />
          <br />
          Our main objective is to share 3D models, however we have learnt that
          our users may use{" "}
          <Link
            style={common_a}
            to={`${location.pathname}/${nested.LEARN_MORE.VIRTUAL_ROOM}`}
          >
            Virtual Room
          </Link>{" "}
          for more creative reasons. This technology is also used to create
          other experiences within a 3D environment such as stores, showrooms,
          3D maps and other things. We welcome innovation and creativity within{" "}
          <span style={common_span}>Syncpoly</span>, with our different features
          users may find new ways to share whatever it is they want with their
          friends, clients and colleagues.
        </>
      ),
      keywords: [
        { word: "syncpoly" },
        { word: "3d sharing" },
        { word: "virtual room" },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>SyncPoly | Learn More</title>
        <meta
          name="description"
          content="Syncpoly at its core is a 3D sharing web app that allows users to broadcast their 3D models, environments, concepts, products or designs. With this technology persons can avoid the long process of rendering their 3D creations into still images or video. We believe that it is much more beneficial to use a Virtual Room because whoever you are the content with will be able to interact live with it."
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
        <div style={{ marginBottom: "20px" }}>
          <Heading
            header={
              <>
                Learn More about <span style={common_span}>Syncpoly</span> and
                our many features
              </>
            }
            action={() => window.open(URLS.presentation, "_blank")}
            action_label={<>Watch Presentation</>}
          />
        </div>
        {ARTICLES.map((article, index) => {
          return (
            <div>
              <Article
                keywords={article.keywords}
                learn_more_text={article.learn_more_text}
                learn_more={article.learn_more}
                header={article.header}
                subtitle={article.subtitle}
                body={article.body}
              />
            </div>
          );
        })}
        <br />
        <br />
        {/* Also Check Out
        <ul style={{ marginBottom: "100px" }}>
          <li
            style={{
              paddingLeft: "0px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaDotCircle size={10} style={{ marginRight: "5px" }} />
            <Link
              style={common_a}
              to={`${location.pathname}/${nested.LEARN_MORE.VIRTUAL_ROOM}`}
            >
              Virtual Rooms
            </Link>
          </li>
        </ul> */}
      </Box>
    </>
  );
}