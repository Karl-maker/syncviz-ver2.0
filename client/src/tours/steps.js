import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import constants from "../utils/constants/classes";
import MEDIA from "../utils/constants/media";
import { useTour } from "@reactour/tour";

const NextButton = () => {
  const { setCurrentStep, setIsOpen } = useTour();
  return (
    <div
      style={{
        marginTop: "10px",
        display: "flex",
        width: "100%",
        justifyContent: "end",
      }}
    >
      <Button
        onClick={() => {
          setIsOpen(false);
        }}
      >
        End Tour
      </Button>
      <Button
        onClick={() => {
          setCurrentStep((current) => current + 1);
        }}
      >
        Next
      </Button>
    </div>
  );
};

const Instructions = () => {
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);

  return (
    <>
      {mobile ? (
        <ul>
          <li>
            <Typography
              sx={{ color: "#2d3436", marginTop: "5px" }}
              variant="caption"
            >
              <span style={{ fontWeight: "bold" }}>Pinch</span> to move forward
            </Typography>
          </li>
          <li>
            <Typography
              sx={{ color: "#2d3436", marginTop: "5px" }}
              variant="caption"
            >
              <span style={{ fontWeight: "bold" }}>Spread</span> to move
              backward
            </Typography>
          </li>
          <li>
            <Typography
              sx={{ color: "#2d3436", marginTop: "5px" }}
              variant="caption"
            >
              <span style={{ fontWeight: "bold" }}>Drag</span> to rotate
            </Typography>
          </li>
          <li>
            <Typography
              sx={{ color: "#2d3436", marginTop: "5px" }}
              variant="caption"
            >
              <span style={{ fontWeight: "bold" }}>Drag with Two Fingers</span>{" "}
              to move sideways
            </Typography>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Typography
              sx={{ color: "#2d3436", marginTop: "5px" }}
              variant="caption"
            >
              <span style={{ fontWeight: "bold" }}>Arrow Keys</span> to move
              around
            </Typography>
          </li>
          <li>
            <Typography
              sx={{ color: "#2d3436", marginTop: "5px" }}
              variant="caption"
            >
              <span style={{ fontWeight: "bold" }}>
                Left Click and Drag Mouse
              </span>{" "}
              to rotate
            </Typography>
          </li>
        </ul>
      )}
    </>
  );
};

const COMMON = {
  CONTROLS: {
    selector: `.${constants.VIEWER_WINDOW}`,
    position: "center",
    content: () => {
      return (
        <Box>
          <Typography sx={{ color: "#2d3436" }}>Controls</Typography>
          <Typography
            sx={{ color: "#2d3436", marginTop: "5px" }}
            variant="caption"
          >
            When a 3D model is loaded, you can traverse and interact with the{" "}
            <span style={{ fontWeight: "bold" }}>Metaverse Room</span>.
          </Typography>
          <Instructions />
          <NextButton />
        </Box>
      );
    },
  },
  MESSENGER: {
    selector: `.${constants.VIEWER_MESSENGER}`,
    position: "right",
    content: () => {
      return (
        <Box>
          <Typography sx={{ color: "#2d3436" }}>Messenger</Typography>
          <Typography
            sx={{ color: "#2d3436", marginTop: "5px" }}
            variant="caption"
          >
            Here are all the messages and updates that are occuring within the
            current <span style={{ fontWeight: "bold" }}>Metaverse Room</span>
          </Typography>
          <NextButton />
        </Box>
      );
    },
  },
  ATTENDEES: {
    selector: `.${constants.VIEWER_AMOUNT_OF_ATTENDEES}`,
    position: "left",
    content: () => {
      return (
        <Box>
          <Typography sx={{ color: "#2d3436" }}>
            Current Amount of Attendees
          </Typography>
          <Typography
            sx={{ color: "#2d3436", marginTop: "5px" }}
            variant="caption"
          >
            This shows you how many persons are currently in this{" "}
            <span style={{ fontWeight: "bold" }}>Metaverse Room</span>,
            including you.
          </Typography>
          <NextButton />
        </Box>
      );
    },
  },
  TIMER: {
    selector: `.${constants.VIEWER_TIMER}`,
    position: "left",
    content: () => {
      return (
        <Box>
          <Typography sx={{ color: "#2d3436" }}>Timer</Typography>
          <Typography
            sx={{ color: "#2d3436", marginTop: "5px" }}
            variant="caption"
          >
            Here tells you and your visitors how much time is left till your{" "}
            <span style={{ fontWeight: "bold" }}>Metaverse Room</span> ends.
          </Typography>
          <NextButton />
        </Box>
      );
    },
  },
  CONNECTION: {
    selector: `.${constants.VIEWER_CONNECTION_STATUS}`,
    position: "left",
    content: () => {
      return (
        <Box>
          <Typography sx={{ color: "#2d3436" }}>Connection Status</Typography>
          <Typography
            sx={{ color: "#2d3436", marginTop: "5px" }}
            variant="caption"
          >
            Different colors of this icon tells you your current connection
            status to the{" "}
            <span style={{ fontWeight: "bold" }}>Metaverse Room</span>
          </Typography>
          <ul>
            <li>
              <Typography
                sx={{ color: "#2d3436", marginTop: "5px" }}
                variant="caption"
              >
                <span style={{ color: "#00b894" }}>Green</span> means you are
                connected
              </Typography>
            </li>
            <li>
              <Typography
                sx={{ color: "#2d3436", marginTop: "5px" }}
                variant="caption"
              >
                <span style={{ color: "#e17055" }}>Red</span> means you are
                disconnected
              </Typography>
            </li>
          </ul>
          <NextButton />
        </Box>
      );
    },
  },
  SNACKBAR: {
    selector: `.${constants.VIEWER_SNACKBAR}`,
    position: "left",
    content: ({ currentStep, setCurrentStep }) => {
      return (
        <Box>
          <Typography sx={{ color: "#2d3436" }}>
            Settings and Options
          </Typography>
          <Typography
            sx={{ color: "#2d3436", marginTop: "5px" }}
            variant="caption"
          >
            This gives you more options and settings for the Metaverse Room.{" "}
            <span
              style={{ fontWeight: "bold" }}
              onClick={() => {
                setCurrentStep(currentStep + 1);
              }}
            >
              Continue
            </span>{" "}
            the tour and discover what else you can do.
          </Typography>
          <NextButton />
        </Box>
      );
    },
  },
  SNACKBAR_SHARE: {
    selector: `.${constants.VIEWER_SNACKBAR_SHARE}`,
    position: "left",
    content: () => {
      return (
        <Box>
          <Typography sx={{ color: "#2d3436" }}>Share</Typography>
          <Typography
            sx={{ color: "#2d3436", marginTop: "5px" }}
            variant="caption"
          >
            You can share this{" "}
            <span style={{ fontWeight: "bold" }}>Metaverse Room</span> with your
            friends, family and clients.
          </Typography>
          <NextButton />
        </Box>
      );
    },
  },
  END: {
    selector: `.${constants.VIEWER_WINDOW}`,
    position: "center",
    content: ({ setCurrentStep, setIsOpen }) => {
      return (
        <Box>
          <Typography sx={{ color: "#2d3436" }}>All Ready!</Typography>
          <Typography
            sx={{ color: "#2d3436", marginTop: "5px" }}
            variant="caption"
          >
            This demo allows you to interact and explore{" "}
            <span style={{ fontWeight: "bold" }}>Metaverse Rooms</span>, please
            enjoy!
          </Typography>
          <div style={{ display: "flex", marginTop: "10px" }}>
            <Button
              onClick={() => {
                setCurrentStep(0);
              }}
            >
              Restart Tour
            </Button>
            <Button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              End Tour
            </Button>
          </div>
        </Box>
      );
    },
  },
};

const MANAGE = [
  {
    selector: `.${constants.VIEWER_WINDOW}`,
    position: "center",
    disableFocusLock: true,
    content: ({ setIsOpen, setCurrentStep }) => {
      return (
        <Box>
          <Typography sx={{ color: "#2d3436" }}>
            Welcome to our{" "}
            <span style={{ fontWeight: "bold" }}>Metaverse Manager</span>
          </Typography>
          <Typography
            sx={{ color: "#2d3436", marginTop: "5px" }}
            variant="caption"
          >
            Here you can create and manage a environment where 3D environments,
            models, products and concepts can be shared. Do you want to do our
            quick tour?
          </Typography>
          <div
            style={{
              marginTop: "10px",
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button
              onClick={() => {
                setCurrentStep((step) => step + 1);
              }}
            >
              Yes, Do Tour
            </Button>
            <Button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              No Tour
            </Button>
          </div>
        </Box>
      );
    },
  },
  COMMON.CONTROLS,
  COMMON.TIMER,
  COMMON.CONNECTION,
  COMMON.MESSENGER,
  {
    selector: `.${constants.VIEWER_TAGS}`,
    position: "right",
    content: () => {
      return (
        <Box>
          <Typography sx={{ color: "#2d3436" }}>3D Tags</Typography>
          <Typography
            sx={{ color: "#2d3436", marginTop: "5px" }}
            variant="caption"
          >
            If you have a 3D model loaded you can create 3D tags. This can give
            your viewers information, calls to action and much more while
            interacting with your room.
          </Typography>
          <ul>
            <li>
              <Typography
                sx={{ color: "#2d3436", marginTop: "5px" }}
                variant="caption"
              >
                A 3D model must be loaded to use this feature
              </Typography>
            </li>
            <li>
              <Typography
                sx={{ color: "#2d3436", marginTop: "5px" }}
                variant="caption"
              >
                Click Tag icon so it turns red
              </Typography>
            </li>
            <li>
              <Typography
                sx={{ color: "#2d3436", marginTop: "5px" }}
                variant="caption"
              >
                Click/Press the area where you want to place tag
              </Typography>
            </li>
            <li>
              <Typography
                sx={{ color: "#2d3436", marginTop: "5px" }}
                variant="caption"
              >
                Enter details about the tag
              </Typography>
            </li>
          </ul>
          <NextButton />
        </Box>
      );
    },
  },
  COMMON.ATTENDEES,
  COMMON.SNACKBAR,
  COMMON.SNACKBAR_SHARE,
  {
    selector: `.${constants.VIEWER_SNACKBAR_EDIT_ATTRIBUTES}`,
    position: "left",
    content: () => {
      return (
        <Box>
          <Typography sx={{ color: "#2d3436" }}>Change Attributes</Typography>
          <Typography
            sx={{ color: "#2d3436", marginTop: "5px" }}
            variant="caption"
          >
            You can add a caption, hashtags or other attributes to your{" "}
            <span style={{ fontWeight: "bold" }}>Metaverse Room</span> right
            here
          </Typography>
          <NextButton />
        </Box>
      );
    },
  },
  {
    selector: `.${constants.VIEWER_SNACKBAR_ADD_MODEL}`,
    position: "left",
    content: () => {
      return (
        <Box>
          <Typography sx={{ color: "#2d3436" }}>Add Model</Typography>
          <Typography
            sx={{ color: "#2d3436", marginTop: "5px" }}
            variant="caption"
          >
            Add your own 3D models, concepts or worlds right here. Currently we
            only support{" "}
            <span style={{ fontWeight: "bold" }}>.glb, .gltf and .babylon</span>{" "}
            files. We also have other 3D models avaliable for use.
          </Typography>
          <NextButton />
        </Box>
      );
    },
  },
  {
    selector: `.${constants.VIEWER_SNACKBAR_ENDROOM}`,
    position: "left",
    content: () => {
      return (
        <Box>
          <Typography sx={{ color: "#2d3436" }}>End Room</Typography>
          <Typography
            sx={{ color: "#2d3436", marginTop: "5px" }}
            variant="caption"
          >
            Whenever you are ready you can end your{" "}
            <span style={{ fontWeight: "bold" }}>Metaverse Room</span> here.
            This will also end it for all your visitors.{" "}
            <span style={{ fontWeight: "bold" }}>
              Please note if you leave or close your window the Metaverse Room
              won't end.
            </span>
          </Typography>
          <NextButton />
        </Box>
      );
    },
  },
  COMMON.END,
];

const VISITER = [
  {
    selector: `.${constants.VIEWER_WINDOW}`,
    position: "center",
    disableFocusLock: true,
    content: ({ setIsOpen, setCurrentStep }) => {
      return (
        <Box>
          <Typography sx={{ color: "#2d3436" }}>
            Welcome to a{" "}
            <span style={{ fontWeight: "bold" }}>Metaverse Room</span>
          </Typography>
          <Typography
            sx={{ color: "#2d3436", marginTop: "5px" }}
            variant="caption"
          >
            Here you can view and interact with 3D worlds, products, concepts
            and other things. Do you want to do our quick tour?
          </Typography>
          <div
            style={{
              marginTop: "10px",
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button
              onClick={() => {
                setCurrentStep((step) => step + 1);
              }}
            >
              Yes, Do Tour
            </Button>
            <Button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              No Tour
            </Button>
          </div>
        </Box>
      );
    },
  },
  COMMON.CONTROLS,
  COMMON.TIMER,
  COMMON.CONNECTION,
  COMMON.MESSENGER,
  COMMON.ATTENDEES,
  COMMON.SNACKBAR,
  COMMON.SNACKBAR_SHARE,
  COMMON.END,
];

const STEPS = {
  MANAGE,
  VISITER,
};

export default STEPS;
