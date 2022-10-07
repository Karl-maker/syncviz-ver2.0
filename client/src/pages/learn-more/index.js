import Article from "../../components/content/article";
import { useTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet";
import PAGES, { NESTED as nested, ID } from "../../utils/constants/page-names";
import URLS from "../../utils/constants/url";
import { Box } from "@mui/material";
import Heading from "../../components/content/heading";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function LearnMore() {
  const location = useLocation();
  const theme = useTheme();
  const common_span = {
    color: theme.palette.mode === "dark" ? "#74b9ff" : "#0984e3",
  };
  const common_a = {
    textDecoration: "none",
    color: theme.palette.mode === "dark" ? "#81ecec" : "#00cec9",
  };
  const navigation = useNavigate();

  const ARTICLES = [
    {
      position_id: ID.LEARN_MORE.SYNCPOLY,
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
            to={`${location.pathname}${nested.LEARN_MORE.VIRTUAL_ROOM}`}
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
            to={`${location.pathname}${nested.LEARN_MORE.VIRTUAL_ROOM}`}
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
        { word: "syncpoly", action: () => navigation(`${PAGES.ABOUT}`) },
        {
          word: "3d sharing",
          action: () =>
            navigation(`${location.pathname}${nested.LEARN_MORE.SHARING}`),
        },
        {
          word: "virtual room",
          action: () =>
            navigation(`${location.pathname}${nested.LEARN_MORE.VIRTUAL_ROOM}`),
        },
      ],
    },
    {
      position_id: ID.LEARN_MORE.THRIVE_AREAS,
      subtitle: <>Areas we thrive in</>,
      body: (
        <>
          Our 3D sharing software thrives in certain areas within different
          industries and markets. We are committed to facilitating and packaging
          for the needs of each of these areas listed below. As we grow, we will
          continue to develop features that aims at facilitating these area's
          goals.
          <ul
            style={{
              paddingLeft: "0px",
              listStyleType: "circle",
              listStyle: "display",
            }}
          >
            <li>Education</li>
            <li>Retail</li>
            <li>Architecture</li>
            <li>Manufacturing</li>
            <li>Advertising</li>
            <li>Health Care</li>
          </ul>
        </>
      ),
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
        <link rel="canonical" href={`${nested.LEARN_MORE.INDEX}`} />
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
          <Heading
            share={{
              message:
                "Learn more about Syncpoly and the many features we provide to create amazing Virtual Rooms",
            }}
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
        <div style={{ marginBottom: "200px" }}>
          {ARTICLES.map((article, index) => {
            return (
              <Article
                keywords={article.keywords}
                learn_more_text={article.learn_more_text}
                learn_more={article.learn_more}
                header={article.header}
                subtitle={article.subtitle}
                body={article.body}
              />
            );
          })}
        </div>

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
