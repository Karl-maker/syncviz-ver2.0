import Article from "../components/content/article";
import { useTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet";
import MEDIA from "../utils/constants/media";
import URLS from "../utils/constants/url";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { IoMail } from "react-icons/io5";
import { BsTwitter, BsFacebook } from "react-icons/bs";

export default function LearnMore() {
  const theme = useTheme();
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  const article_content = {
    syncpoly: "syncpoly_article",
    virtual_room: "virtual_room",
    tag: "3d_tag",
  };
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
        <span id={article_content.syncpoly} style={common_span}>
          Syncpoly
        </span>
      ),
      subtitle: (
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
          <a style={common_a} href={`#${article_content.virtual_room}`}>
            Virtual Room
          </a>{" "}
          because whoever you are the content with will be able to interact live
          with it.
          <br />
          <br />
          Our main objective is to share 3D models, however we have learnt that
          our users may use{" "}
          <a style={common_a} href={`#${article_content.virtual_room}`}>
            Virtual Room
          </a>{" "}
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
    {
      header: (
        <span id={article_content.virtual_room} style={common_span}>
          Virtual Room
        </span>
      ),
      subtitle: (
        <>
          What is a <span style={common_span}>Virtual Room</span>?
        </>
      ),
      body: (
        <>
          A Virtual Room is the environment in which 3D models can be
          broadcasted to everyone attending it. Attendees can interact with the
          model, communicate with eachother and select{" "}
          <a style={common_a} href={`#${article_content.tag}`}>
            3D Tags.
          </a>{" "}
          With the main features given in these Virtual Rooms you can create
          virtual environments where attendees may learn about a design,
          purchase a product using a{" "}
          <a style={common_a} href={`#${article_content.tag}`}>
            3D Tag
          </a>{" "}
          or just experience an event in a different way.
        </>
      ),
      keywords: [{ word: "virtual room" }, { word: "3d sharing" }],
    },
    {},
  ];

  const ShareElements = () => {
    return (
      <>
        <Button
          size="large"
          href={`mailto:?subject=Share 3D in SyncPoly's Virtual Room&body=SyncPoly offers a way to bring 3D to clients and friends in a interactive helpful way. This allow persons to develop creative ways share experiences and information. Check us out ${window.location.href} `}
        >
          <IoMail />
        </Button>
        <Button
          size="large"
          href={`http://twitter.com/share?text=Share 3D Models, Products, Environments and more in SyncPoly's Virtual Room &url=${window.location.href}&hashtags=3dshare,3dsharing,virtual`}
          target="_blank"
        >
          <BsTwitter />
        </Button>
        <Button
          size="large"
          href={`https://www.facebook.com/share.php?u=${window.location.href}`}
          target="_blank"
        >
          <BsFacebook />
        </Button>
        {/* <Button
          size="large"
          href={`whatsapp://send?text=${window.location.href}`}
          data-action="share/whatsapp/share"
        >
          <BsWhatsapp />
        </Button> */}
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>SyncPoly | Learn More</title>
      </Helmet>
      <Box
        className="no-sidebar"
        sx={{
          overflow: mobile ? "none" : "scroll",
          maxHeight: "100vh",
        }}
      >
        <div
          style={{
            display: mobile ? "" : "flex",
            alignItems: "center",
            textAlign: mobile ? "center" : "",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          <div>
            <Typography
              variant="h3"
              sx={{ marginBottom: "30px", fontWeight: "bold" }}
            >
              Learn More about <span style={common_span}>Syncpoly</span> and our
              many features
            </Typography>
            <Button
              sx={{ marginBottom: "30px", fontWeight: "bold" }}
              onClick={() => window.open(URLS.presentation, "_blank")}
              variant="contained"
              disableElevation
            >
              Watch Presentation
            </Button>
          </div>
          <Divider
            orientation={mobile ? "" : "vertical"}
            flexItem={mobile ? false : true}
            sx={mobile ? {} : { marginLeft: "30px", marginRight: "30px" }}
          ></Divider>
          <div>
            {/* <img src={synclogo} alt="SyncPoly-logo" height={80} /> */}
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <Typography variant="caption">Share</Typography>
            </div>
            <ButtonGroup
              orientation={mobile ? "horizontal" : "vertical"}
              variant="outlined"
              aria-label="outlined primary button group"
            >
              {
                // Share
              }

              <ShareElements />
            </ButtonGroup>
          </div>
        </div>

        <ol
          style={{
            scroll: "none",
            padding: "0px",
          }}
        >
          {ARTICLES.map((article, index) => {
            return (
              <li
                className="list-content"
                style={{ marginBottom: "5px" }}
                key={index}
              >
                <Article
                  keywords={article.keywords}
                  learn_more_text={article.learn_more_text}
                  learn_more={article.learn_more}
                  header={article.header}
                  subtitle={article.subtitle}
                  body={article.body}
                />
              </li>
            );
          })}
        </ol>
      </Box>
    </>
  );
}
