import Prompt from "../../classes/prompt";
import Message from "../../classes/message";
import Alert from "../../classes/alert";
import {
  TextField,
  InputAdornment,
  IconButton,
  Badge,
  useMediaQuery,
  Typography,
  Divider,
} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { MdOutlineFullscreen, MdOutlineFullscreenExit } from "react-icons/md";
import { BiSend } from "react-icons/bi";
import { HiOutlineCubeTransparent } from "react-icons/hi";
import { BsFillEyeFill, BsFillEyeSlashFill, BsTagFill } from "react-icons/bs";
import { RiMessage2Fill } from "react-icons/ri";
import { BiLink } from "react-icons/bi";
import { VirtualSpaceContext } from "../../widgets/virtual-space";
import useDidMountEffect from "../../utils/hooks/useDidMountEffect";
import MEDIA from "../../utils/constants/media";
import classes from "../../utils/constants/classes";
import useAnalyticsEventTracker from "../../utils/hooks/useAnalyticsEventTracker";

export default function ChatRoomComponent({
  display,
  chatFocus,
  toggleChatFocus,
  toggleDisplay,
  handleFullScreen,
  setTag,
  tag,
  setVR,
  progress,
  sceneReady,
}) {
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  const messageEventTracker = useAnalyticsEventTracker("Message");
  const { socket, virtualSpace, manage } = useContext(VirtualSpaceContext);
  const [messages, setMessages] = useState(<></>);
  const [message, setMessage] = useState("");
  const [newMessages, setNewMessages] = useState(0);

  const ICONS = [{ type: "tag", icon: <BsTagFill size={12} /> }];

  const addMessage = (message) => {
    virtualSpace.chat_room.add(message);
    setMessages(virtualSpace.chat_room.display());

    // append with useRef..
  };

  const enterKeyHandler = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message) {
      messageEventTracker("send");
      virtualSpace.chat_room.send(message);
    }
    setMessage("");
  };

  useEffect(() => {
    socket.on("3D", ({ message }) => {
      const update = new Prompt(message, {
        icon: <HiOutlineCubeTransparent />,
      });
      addMessage(update);
    });

    socket.on("alerts", ({ message, type }) => {
      const alert = new Alert(message, { type });
      addMessage(alert);
    });

    socket.on("updates", ({ message, type }) => {
      let icon = null;
      if (type) {
        icon = ICONS.find((element) => element.type === type).icon;
      }
      const prompt = new Prompt(message, { icon });
      addMessage(prompt);
    });

    socket.on("messages", ({ message, sender, timestamp }) => {
      const new_message = new Message(message, {
        username: sender.username,
        color: sender.color,
        timestamp,
      });
      addMessage(new_message);
    });

    return () => {
      socket.off("3D");
      socket.off("updates");
      socket.off("alerts");
      socket.off("messages");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDidMountEffect(() => {
    if (!display) {
      setNewMessages((length) => length + 1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <>
      <ol
        className={!chatFocus ? "messengerlist" : "messengerlist-slight"}
        style={{
          pointerEvents: chatFocus ? "auto" : "none",
          padding: "0px",
          opacity: display ? 1 : 0,
          display: "flex",
          visibility: display ? "" : "hidden",
          flexDirection: "column-reverse",
          marginTop: "0px",
          height: "300px",
          webKitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none",
        }}
      >
        {messages}
      </ol>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          pointerEvents: "auto",
          justifyContent: "start",
        }}
      >
        {display && (
          <TextField
            // inputRef={(input) => {
            //   if (input != null) {
            //     input.focus();
            //   }
            // }}
            onKeyDown={enterKeyHandler}
            label="Send Message"
            size="small"
            id="input-message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            sx={{
              m: 0,
              minWidth: "20ch",
              display: display ? "block" : "none",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ marginBottom: "2px" }}>
                  <IconButton
                    size="small"
                    onClick={() => {
                      toggleChatFocus((focus) => !focus);
                    }}
                  >
                    {chatFocus ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end" sx={{ marginBottom: "2px" }}>
                  <IconButton size="small" onClick={handleSendMessage}>
                    <BiSend />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        )}
        <IconButton
          className={classes.VIEWER_MESSENGER}
          sx={{ marginTop: "0px", marginRight: "5px" }}
          onClick={(e) => {
            e.preventDefault();
            const toggle = !display;

            toggleDisplay(toggle);
            if (toggle) {
              setNewMessages(0);
            }
          }}
        >
          <Badge badgeContent={newMessages} max={999} color="primary">
            <RiMessage2Fill />
          </Badge>
        </IconButton>

        {/* <IconButton
          onClick={() => {
            setVR((vr) => !vr);
          }}
        >
          <Typography sx={{ fontSize: "15px" }}>VR</Typography>
        </IconButton> */}

        {/* {manage ? <MicTransmitter /> : <AudioStream />} */}
        {manage && !handleFullScreen.active && (
          <IconButton
            disabled={progress !== "100" || !sceneReady}
            className={classes.VIEWER_TAGS}
            onClick={() => {
              setTag((tag) => !tag);
            }}
          >
            <BsTagFill size={23} color={tag ? "#e17055" : ""} />
          </IconButton>
        )}
        {virtualSpace.link && (
          <IconButton
            onClick={() => {
              function windowOpen(url, specs) {
                if (!url.match(/^https?:\/\//i) || !url.match(/^http?:\/\//i)) {
                  url = "https://" + url;
                }
                return window.open(url, specs);
              }

              windowOpen(virtualSpace.link, "_blank");
            }}
          >
            <BiLink />
          </IconButton>
        )}

        {!mobile && (
          <IconButton
            sx={{ marginTop: "0px" }}
            onClick={
              !handleFullScreen.active
                ? handleFullScreen.enter
                : handleFullScreen.exit
            }
          >
            {!handleFullScreen.active ? (
              <MdOutlineFullscreen style={{ fontSize: "27px" }} />
            ) : (
              <MdOutlineFullscreenExit style={{ fontSize: "27px" }} />
            )}
          </IconButton>
        )}

        <Divider
          orientation="vertical"
          flexItem
          sx={{ marginLeft: "5px", color: "#ffff" }}
        />
        <div style={{ display: "block" }}>
          <Typography
            sx={{
              marginLeft: "10px",
              color: "#ffff",
              fontSize: "12px",
              textShadow: "0.5px 0.5px 0.5px rgba(0,0,0,0.64)",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
          >
            {virtualSpace.description}
          </Typography>
          <Typography
            sx={{
              marginLeft: "10px",
              color: "#ffff",
              fontSize: "10px",
              textShadow: "0.5px 0.5px 0.5px rgba(0,0,0,0.64)",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              fontWidth: 3,
            }}
          >
            {virtualSpace.hashtags}
          </Typography>
        </div>
      </div>
    </>
  );
}
