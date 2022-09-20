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
  const fileInput = useRef(null);
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  const [load, setLoad] = useState(false);

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
        open={load}
      >
        <CircularProgress color="inherit" />
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
                  startLoad();
                  setOpen(false);
                  const formData = new FormData();
                  formData.append("file-3d", fileInput.current.files[0]);
                  virtualSpace
                    .transfer3D(formData)
                    .then((model) => {
                      stopLoad();
                    })
                    .catch((err) => {
                      //...
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
