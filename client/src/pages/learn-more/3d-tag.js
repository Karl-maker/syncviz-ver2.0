import Article from "../../components/content/article";
import Heading from "../../components/content/heading";
import PAGES from "../../utils/constants/page-names";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet";
import { NESTED as nested, ID } from "../../utils/constants/page-names";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LearnMore3DTag() {
  const theme = useTheme();
  const navigation = useNavigate();
  const common_span = {
    color: theme.palette.mode === "dark" ? "#74b9ff" : "#0984e3",
  };
  const common_a = {
    textDecoration: "none",
    color: theme.palette.mode === "dark" ? "#81ecec" : "#00cec9",
  };

  const content_id = ID.LEARN_MORE;

  const articles = [
    {
      header: (
        <>
          What is a <span style={common_span}>3D Tag</span>?
        </>
      ),
      body: (
        <>
          3D Tags are notes that are placed in the{" "}
          <Link
            style={common_a}
            to={`${nested.LEARN_MORE.INDEX}${nested.LEARN_MORE.VIRTUAL_ROOM}`}
          >
            Virtual Room
          </Link>
          . These can highlight aspects of the Virtual environment that can
          inform or give a call to action. 3D Tags can be used in many creative
          ways.
        </>
      ),

      // ${location.pathname}${nested.LEARN_MORE.TAG}

      keywords: [
        { word: "3d tag", action: () => {} },
        {
          word: "annotation",
          action: () => navigation(`#${content_id.ANNOTATIONS}`),
        },
        { word: "label", action: () => navigation(`#${content_id.LABELS}`) },
        {
          word: "call to action",
          action: () => navigation(`#${content_id.CALL_TO_ACTIONS}`),
        },
      ],
    },
    {
      position_id: content_id.LABELS,
      subtitle: <>Labels</>,
      body: (
        <>
          Quick labels do very well for describing 3D maps, products in a store
          or other elements that need to be quickly labeled. Labeling your 3D
          model will go a long way by giving your attendees a quick way to learn
          about the different parts of a 3D model. Unlike annotations you can
          label your models with just the title attribute so that it will have a
          name. For example if you are sharing a 3D map of a university campus,
          you can label the separate buildings so that the attendees can quickly
          click or press the tag. Another example can be the labeling of a 3D
          model of the human skeleton. Many students can gather around and join
          a Virtual Room to interact with this model and view these labels.
        </>
      ),
    },
    {
      position_id: content_id.ANNOTATIONS,
      subtitle: <>Annotations</>,
      body: (
        <>
          By annotating aspects of the 3D model, the other attendees are given
          more explanation by notes and comments. 3D Tags will allow you to go
          in depth in whatever product, model, concept or design you have
          shared, and go into further detail by using the description attribute
          in the tag. By using the title attribute and the description attribute
          you can fully explain all the different aspects of your model. In
          situations of explanation the link tag can also send your attendees to
          another website to view more information on whatever you want.
        </>
      ),
    },
    {
      position_id: content_id.CALL_TO_ACTIONS,
      subtitle: <>Call To Action</>,
      body: (
        <>
          For commercial use{" "}
          <Link
            style={common_a}
            to={`${nested.LEARN_MORE.INDEX}${nested.LEARN_MORE.VIRTUAL_ROOM}`}
          >
            Virtual Rooms
          </Link>{" "}
          are perfect to host virtual stores, products, virtual showcase rooms
          and whatever you can think of. Just like annotating using the
          description and the title tags will help also by allowing your
          customers to understand your products better, however the link tag is
          also available which will redirect your customers to any website you
          want including a payment link. We try to understand what a company or
          business would need when allowing their potential customers to
          interact with their products in a virtual environment. We believe that
          the link attributes will help close sales and bring more customers to
          their own website.
        </>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Syncpoly | Learn More About 3D Tag</title>
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
          overflow: "scroll",
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
          {articles.map((article, index) => (
            <>
              <Article
                key={index}
                keywords={article.keywords}
                learn_more_text={article.learn_more_text}
                learn_more={article.learn_more}
                header={article.header}
                subtitle={article.subtitle}
                body={article.body}
              />
              <br />
            </>
          ))}
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
