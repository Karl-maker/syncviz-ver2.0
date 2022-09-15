import * as BABYLON from "@babylonjs/core";
import { useEffect, useRef } from "react";
import MEDIA from "../../utils/constants/media";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SceneBabylon from "../../classes/babylon/scene";

export default function BabylonViewer(props) {
  const theme = useTheme();
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  const reactCanvas = useRef(null);
  const babylonSceneRef = useRef(null);
  const {
    modelUrl,
    meshName,
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    fullScreen,
    refresh,
    setLoading,
    setProgress,
    borderRadiusNull,
    setPreviousTags,
    previousTags,
    setSelect,
    setInfo,
    setInfoOpen,
    tags,
    vr,
    ...rest
  } = props;

  const onSceneReady = async (scene) => {
    const babylonScene = new SceneBabylon({ scene });

    babylonSceneRef.current = babylonScene;
    babylonSceneRef.current.mobile = mobile;

    babylonSceneRef.current.scene.clearColor = new BABYLON.Color4(
      theme.palette.mode === "dark" ? 0.2 : 0.93,
      theme.palette.mode === "dark" ? 0.29 : 0.94,
      theme.palette.mode === "dark" ? 0.37 : 0.95,
      1
    );

    //theme.palette.mode === "dark" ? "#34495e" : "#ecf0f1"34495e

    babylonSceneRef.current.initializeCamera({ mobile, vr });
    await babylonSceneRef.current.loadScene(modelUrl, { setProgress });

    babylonSceneRef.current.setArcCameraFraming();
    // This attaches the camera to the canvas
    babylonSceneRef.current.scene.activeCamera.attachControl(
      babylonSceneRef.current.canvas,
      true,
      true,
      mobile ? 1 : 0
    );
  };

  const onRender = (scene) => {};

  useEffect(() => {
    if (reactCanvas.current) {
      const engine = new BABYLON.Engine(
        reactCanvas.current,
        antialias,
        engineOptions,
        adaptToDeviceRatio
      );

      // Loading Screen

      function customLoadingScreen() {}
      customLoadingScreen.prototype.displayLoadingUI = function () {
        if (setLoading) setLoading(true);
      };
      customLoadingScreen.prototype.hideLoadingUI = function () {
        if (setLoading) setLoading(false);
      };
      let loadingScreen = new customLoadingScreen();
      engine.loadingScreen = loadingScreen;

      BABYLON.SceneLoader.ShowLoadingScreen = true;

      const scene = new BABYLON.Scene(engine, sceneOptions);
      if (scene.isReady()) {
        onSceneReady(scene);
      } else {
        scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
      }

      engine.runRenderLoop(() => {
        if (typeof onRender === "function") {
          onRender(scene);
        }
        scene.render();
      });

      const resize = () => {
        scene.getEngine().resize();
      };

      let vector = { x: "", y: "", z: "" };
      scene.onPointerDown = function (event, pickResult) {
        //left mouse click
        if (event.button === 0) {
          vector = pickResult.pickedPoint;

          if (setSelect) {
            setSelect(vector);
          }
        }
      };

      if (window) {
        window.addEventListener("resize", resize);
      }

      return () => {
        scene.getEngine().dispose();

        if (window) window.removeEventListener("resize", resize);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactCanvas, fullScreen, refresh, theme.palette.mode, vr]);

  useEffect(() => {
    if (!tags) return;

    if (babylonSceneRef.current && babylonSceneRef) {
      // Add tag / render
      tags.forEach((tag) => {
        if (!previousTags.includes({ _id: tag._id }))
          babylonSceneRef.current.addTag(tag, 0, {
            backgroundColor:
              theme.palette.mode === "dark" ? "#2c3e50" : "#2980b9",
            fontColor: "#ffff",
            setInfo,
            setInfoOpen,
          });
      });

      setPreviousTags(tags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags, fullScreen, refresh, theme.palette.mode, vr]);

  return (
    <canvas
      ref={reactCanvas}
      style={{
        zIndex: 10000,
        borderRadius: fullScreen || borderRadiusNull ? "0em" : "2em",
        backgroundColor: theme.palette.mode === "dark" ? "#34495e" : "#ecf0f1",
        height: "100%",
        width: mobile ? "100%" : "100%",
        overflow: "hidden",
        margin: mobile ? "0px" : "0px",
        padding: "0",
        webKitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none",
      }}
      {...rest}
    />
  );
}
