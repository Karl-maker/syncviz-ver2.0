import DialogButton from "../../template/buttons/dialog";
import {
  Button,
  useMediaQuery,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import Selection from "./environment-selections";
//import { GiPirateFlag, GiModernCity } from "react-icons/gi";
import MEDIA from "../../utils/constants/media";
import { useRef } from "react";
import GridLayout from "../../template/layout/grid-layout";
import { Box } from "@mui/system";
import { useState } from "react";
import useAnalyticsEventTracker from "../../utils/hooks/useAnalyticsEventTracker";

const MODELS = [
  {
    name: "Pirate Fort",
    description: "Detailed model of pirate fort",
    url: `https://assets.babylonjs.com/meshes/pirateFort/pirateFort.glb`,
  },
  {
    name: "Seagull",
    description: "Stylistic seagull model",
    url: `https://assets.babylonjs.com/meshes/seagulf.glb`,
  },
  {
    name: "UFO",
    description: "UFO model",
    url: `https://assets.babylonjs.com/meshes/ufo.glb`,
  },
  {
    name: "Flight Helmet",
    description: "Detailed flight helmet",
    url: `https://assets.babylonjs.com/meshes/flightHelmet.glb`,
  },
  {
    name: "Fish",
    description: "Fish",
    url: `https://assets.babylonjs.com/meshes/fish.glb`,
  },
];

export default function EnvironmentSelection({ virtualSpace, open, setOpen }) {
  const gaEventTracker = useAnalyticsEventTracker("Add 3D Model");
  const modelSizeTracker = useAnalyticsEventTracker("Model Size");
  const modelTypeTracker = useAnalyticsEventTracker("Model Type");
  const fileInput = useRef(null);
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  const [load, setLoad] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const handleClick = (event) => {
    fileInput.current.click();
  };

  const selectEnvironment = (model) => {
    const { url, name } = model;

    virtualSpace
      .updateEnvironment(url, name)
      .then((result) => {
        setOpen(false);
      })
      .catch((error) => {});
  };

  const stopLoad = () => {
    setLoad(false);
  };

  const startLoad = () => {
    setLoad(true);
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 2 }}
        open={loadProgress !== 100 && load}
      >
        <CircularProgress
          color="inherit"
          variant="determinate"
          value={loadProgress}
        />
      </Backdrop>
      <DialogButton
        noClickOff
        title="Select Model"
        content={
          <Box sx={{ width: mobile ? "70vw" : "30vw", maxHeight: "50vh" }}>
            <GridLayout>
              <Selection
                data={{
                  name: "Upload 3D File",
                  description: "Upload your own 3D model",
                }}
                key={0}
                action={handleClick}
              />
              <input
                type="file"
                accept=".glb, .gltf, .babylon, .obj, .stl"
                ref={fileInput}
                style={{ display: "none" }}
                onChange={() => {
                  gaEventTracker(`selected upload`);
                  modelTypeTracker(
                    `${
                      fileInput.current.files[0].name.substring(
                        fileInput.current.files[0].name.lastIndexOf(".") + 1,
                        fileInput.current.files[0].name.length
                      ) || fileInput.current.files[0].name
                    }`
                  );
                  modelSizeTracker(`${fileInput.current.files[0].size}`);
                  setOpen(false);
                  startLoad();
                  const formData = new FormData();
                  formData.append("file-3d", fileInput.current.files[0]);
                  virtualSpace
                    .transfer3D(formData, (progress) => {
                      setLoadProgress(progress);

                      if (progress === 100) {
                        stopLoad();
                      }
                    })
                    .then((result) => {
                      if (result.status === 200) {
                      }
                    })
                    .catch((err) => {
                      stopLoad();
                    });
                }}
              />

              {MODELS.map((model, index) => {
                return (
                  <Selection
                    data={model}
                    key={index + 1}
                    action={() => {
                      gaEventTracker(`selected ${model.name}`);
                      selectEnvironment(model);
                    }}
                  />
                );
              })}
            </GridLayout>
          </Box>
        }
        open={open}
        setOpen={setOpen}
        actions={
          <>
            <Button
              variant="filled"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </>
        }
      />
    </>
  );
}
