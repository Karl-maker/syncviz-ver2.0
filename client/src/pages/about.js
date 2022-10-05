import Heading from "../components/content/heading";
import PAGES from "../utils/constants/page-names";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import MEDIA from "../utils/constants/media";
import Article from "../components/content/article";
import { Box, useMediaQuery } from "@mui/material";

export default function About() {
  const theme = useTheme();
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  const navigation = useNavigate();
  const common_span = {
    color: theme.palette.mode === "dark" ? "#74b9ff" : "#0984e3",
  };

  return (
    <>
      <Helmet>
        <title>SyncPoly | About Us</title>
        <meta
          name="description"
          content="SyncPoly is an online platform that offers a lightweight Virtual
          Experience that allows anyone with any device to access. Our
          idea was to make the Metaverse simple to all persons, then build
          our features and complexity overtime with our user's wants"
        />
        <link rel="canonical" href={`${PAGES.ABOUT}`} />
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
            share={{
              message: "Learn more about Syncpoly and what we are about.",
            }}
            header={
              <>
                More About <span style={common_span}>Syncpoly</span>
              </>
            }
            action_label="Start A Virtual Room"
            action={() => navigation(PAGES.CREATE_VIRTUAL_ROOM)}
          />
        </div>
        <div style={{ marginBottom: "200px" }}>
          <Article
            header="The Problem With 3D"
            subtitle="How we want to solve it"
            body={
              <>
                For many years companies, artists, freelancers and hobbyists
                have used 3D modeling to create detailed, accurate virtual
                replicas of their ideas, concepts and products. However due to
                the complex nature of 3D files and models most have been limited
                to sharing their creations though video and images, which is
                limiting and takes significant time. Today people want to share
                their models in a more interactive way and have shown this need
                by opting into augmented reality, 3D sharing software and 3D
                viewers within their website. These ways of bringing more
                interactivity to their models are still hard to access, also it
                is limited in what value it can offer. Besides gamers there is
                yet to be a way for ordinary people to easily view and
                experience 3D in a meaningful manner that is beneficial to their
                needs. Few may say video games will replace all forms of living
                and interaction, however that industry is already stigmatized
                and usually requires a lot of commitment, hassle and time. For
                example most ordinary people are not going to go on Roblox or
                Minecraft to find out about events, experiences or products.
              </>
            }
          />
          <Article
            subtitle="Syncpoly's way of tackling this issue"
            body={
              <>
                SyncPoly is an online platform that offers a lightweight Virtual
                Experience that allows anyone with any device to access. Our
                idea was to make the Metaverse simple to all persons, then build
                our features and complexity overtime with our user's wants. The
                Metaverse in our definition is a virtual world where people can
                connect to each other to share an experience in 3D. SyncPoly
                brings the Metaverse to ordinary people by giving them the
                ability to develop their own spaces with ease and the help of
                the community. Virtual Rooms allow its owners to share
                experiences, inform, sell products, entertain and advertise to
                all its attendees in a familiar hassle free manner.
              </>
            }
          />
        </div>
      </Box>
    </>
  );
}
