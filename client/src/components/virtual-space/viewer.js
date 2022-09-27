import MenuComponent from "./user-menu";
import Timer from "./timer";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import synclogo from "../../images/logo192.png";
import { useState, useEffect, useContext, useMemo } from "react";
import { VirtualSpaceContext, TagContext } from "../../widgets/virtual-space";
import {
  CircularProgress,
  IconButton,
  useMediaQuery,
  Chip,
} from "@mui/material";
import { BiLinkAlt } from "react-icons/bi";
import ThreeDimentionalViewer from "./babylon-viewer";
import MEDIA from "../../utils/constants/media";
import ViewersChip from "./viewers-chip";
import { useTheme } from "@mui/material/styles";
import Tag from "../manage-virtual-space/tag";
import classes from "../../utils/constants/classes";
// Meshes: https://github.com/BabylonJS/Assets/tree/master/meshes

export default function Viewer() {
  const theme = useTheme();
  const handleFullScreen = useFullScreenHandle();
  const { socket, virtualSpace, manage } = useContext(VirtualSpaceContext);
  const { tag, setTag, setSelect, select } = useContext(TagContext);
  const [softRefresh, toggleSoftRefresh] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("0");
  const [vr, setVR] = useState(false);
  const [deleteTag, setDeleteTag] = useState(null);
  const [displayTimer, setDisplayTimer] = useState(false);
  const [displayChat, toggleDisplayChat] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [chatFocus, toggleChatFocus] = useState(false);
  const [host, setHost] = useState(null);
  const [tags, setTags] = useState([]);
  const [previousTags, setPreviousTags] = useState([]);
  const [tagDialog, toggleTagDialog] = useState(false);
  const [info, setInfo] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);

  useEffect(() => {
    document.getElementById("syncviz-viewer").disabled = true;
  }, []);

  useEffect(() => {
    setHost(virtualSpace.host.display({ backgroundColor: "transparent" }));
  }, [virtualSpace.host]);

  useEffect(() => {
    const style = { marginLeft: "5px", height: "25px", width: "25px" };
    socket.on("disconnect", () => {
      // Allow user to attempt to rejoin
      //virtualSpace.reconnect().emit("reconnect", { id: this._id });
      setDisplayTimer(false);
      setConnectionStatus(
        <IconButton
          className={classes.VIEWER_CONNECTION_STATUS}
          sx={{ ...style, bgcolor: "#d63031" }}
          size="small"
        >
          <BiLinkAlt size={15} />
        </IconButton>
      );
    });

    socket.on("connect", () => {
      setDisplayTimer(true);
      setConnectionStatus(
        <IconButton
          className={classes.VIEWER_CONNECTION_STATUS}
          size="small"
          sx={{ bgcolor: "#00b894", ...style }}
        >
          <BiLinkAlt size={15} />
        </IconButton>
      );
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("3D", ({ url }) => {
      virtualSpace.url = url;
      setTags([]);
      toggleSoftRefresh((refresh) => !refresh);
    });

    socket.on("add-tag", ({ data }) => {
      setTags([...tags, data]);
    });

    socket.on("add-tags", (data) => {
      setTags([...data]);
    });

    socket.on("remove-tag", ({ data }) => {
      setDeleteTag(data._id);
      setTags(
        tags.filter(function (e) {
          return e !== { _id: data._id };
        })
      );
    });

    return () => {
      socket.off("3D");
      socket.off("add-tag");
      socket.off("remove-tag");
      socket.off("add-tags");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tag) {
      toggleTagDialog(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select]);

  useEffect(() => {
    if (progress === "100" && sceneReady) {
      virtualSpace.getTags();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, sceneReady]);

  const BabylonViewer = useMemo(
    () =>
      virtualSpace.url ? (
        <ThreeDimentionalViewer
          sceneOptions={{
            useGeometryIdsMap: true,
            useMaterialMeshMap: true,
            useClonedMeshMap: true,
          }}
          virtualSpace={virtualSpace}
          fullScreen={handleFullScreen.active}
          modelUrl={virtualSpace.url}
          refresh={softRefresh}
          setLoading={setLoading}
          setProgress={setProgress}
          setPreviousTags={setPreviousTags}
          previousTags={previousTags}
          setSelect={setSelect}
          setInfo={setInfo}
          setInfoOpen={setInfoOpen}
          vr={vr}
          manage={manage}
          infoOpen={infoOpen}
          info={info}
          progress={progress}
          tags={tags}
          sceneReady={sceneReady}
          setSceneReady={setSceneReady}
          deleteTag={deleteTag}
        />
      ) : (
        <div
          style={{
            zIndex: 10000,
            borderRadius: handleFullScreen.active ? "0em" : "2em",
            backgroundColor:
              theme.palette.mode === "dark" ? "#34495e" : "#ecf0f1",
            height: "100%",
            width: mobile ? "100%" : "100%",
            overflow: "hidden",
            margin: mobile ? "0px" : "0px",
            padding: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={synclogo} alt="syncviz-logo" height={80} />
        </div>
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      handleFullScreen.active,
      theme.palette.mode,
      softRefresh,
      vr,
      tags,
      infoOpen,
      info,
    ]
  );

  return (
    <FullScreen
      handle={handleFullScreen}
      style={{
        webKitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none",
      }}
    >
      <div
        id="syncviz-viewer"
        className={classes.VIEWER_WINDOW}
        style={{
          position: "relative",
          margin: mobile ? "5px" : "0px",
          padding: "0px",
          width: "auto",
          height: handleFullScreen.active ? "100vh" : mobile ? "65vh" : "60vh",
          webKitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none",
        }}
      >
        {
          // 3D View
        }

        {BabylonViewer}

        {
          // Overlay Content
        }
        {
          // Timer
        }
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            top: "0%",
            right: "0%",
            marginRight: "20px",
            marginTop: "15px",
          }}
        >
          {virtualSpace.createdAt && (
            <Timer
              on={displayTimer}
              start={virtualSpace.createdAt}
              timeLeft={virtualSpace.time_limit}
            />
          )}
          {connectionStatus && connectionStatus}
        </div>
        {
          // Message
        }

        <div
          style={{
            pointerEvents: chatFocus ? "auto" : "none",
            position: "absolute",
            zIndex: 10,
            bottom: "0%",
            left: "0%",
            marginLeft: "20px",
            marginBottom: "15px",
            height: "auto",
            alignItems: "end",
            width: displayChat ? "75%" : "75%",
          }}
        >
          <MenuComponent
            chatFocus={chatFocus}
            toggleChatFocus={toggleChatFocus}
            display={displayChat}
            toggleDisplay={toggleDisplayChat}
            handleFullScreen={handleFullScreen}
            setTag={setTag}
            tag={tag}
            setVR={setVR}
            sceneReady={sceneReady}
            progress={progress}
          />
        </div>
        {
          // Host
        }
        <div
          style={{
            position: "absolute",
            zIndex: 20,
            top: "0%",
            left: "0%",
            marginLeft: "15px",
            marginTop: "15px",
          }}
        >
          {loading ? (
            <CircularProgress
              size={30}
              variant="determinate"
              value={progress}
            />
          ) : (
            <>
              {!tag ? (
                host
              ) : (
                <Chip
                  size="small"
                  label={`${
                    mobile ? "Press" : "Click"
                  } where you want to place tag`}
                />
              )}
            </>
          )}
        </div>
        {
          // Viewers
        }
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            bottom: "0%",
            right: "0%",
            marginRight: "20px",
            marginBottom: "20px",
          }}
        >
          <ViewersChip />
        </div>
        <Tag
          virtualSpace={virtualSpace}
          setOpen={toggleTagDialog}
          open={tagDialog}
          select={select}
          setTag={setTag}
        />
        {/* <DialogButton
          open={infoOpen}
          setOpen={setInfoOpen}
          title={info ? info.text : ""}
          content={
            <div style={{ width: mobile ? "70vw" : "30vw" }}>
              <Typography variant="subtitle1">
                {info ? info.description : ""}
              </Typography>
              {info && (
                <>
                  {info.link ? (
                    <IconButton
                      color="primary"
                      onClick={() => {
                        // link

                        function windowOpen(url, specs) {
                          if (
                            !url.match(/^https?:\/\//i) ||
                            !url.match(/^http?:\/\//i)
                          ) {
                            url = "https://" + url;
                          }
                          return window.open(url, specs);
                        }

                        windowOpen(info.link, "_blank");
                      }}
                      sx={{ marginTop: "15px" }}
                    >
                      <BiLink />
                    </IconButton>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          }
          actions={
            <>
              {manage && (
                <Button
                  variant="filled"
                  onClick={() => {
                    if (info) virtualSpace.deleteTag(info._id);
                    setInfoOpen(false);

                    // setTags(
                    //   tags.filter(function (e) {
                    //     return e !== { _id: info._id };
                    //   })
                    // );
                  }}
                  sx={{ bgcolor: "#d63031" }}
                >
                  Delete
                </Button>
              )}
              <Button
                variant="filled"
                onClick={() => {
                  setInfoOpen(false);
                }}
              >
                Close
              </Button>
            </>
          }
        /> */}
      </div>
    </FullScreen>
  );
}
