import { useState, useEffect } from "react";
import DialogButton from "../../template/buttons/dialog";
import {
  TextField,
  Button,
  useMediaQuery,
  InputAdornment,
} from "@mui/material";
import MEDIA from "../../utils/constants/media";
import { MdWrapText, MdTitle } from "react-icons/md";
import { BiLink } from "react-icons/bi";

export default function Tag({ virtualSpace, open, setOpen, select, setTag }) {
  const [attributes, setAttributes] = useState({
    text: "",
    description: "",
    link: "",
    position: { x: 0, y: 0, z: 0 },
  });

  useEffect(() => {
    if (select) {
      setAttributes((attribute) => ({
        ...attribute,
        position: { x: select.x, y: select.y, z: select.z },
      }));
    }
  }, [select]);

  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  return (
    <DialogButton
      noClickOff
      title="Add Tag"
      content={
        <div style={{ width: mobile ? "70vw" : "100%" }}>
          <TextField
            key="outlined-multiline-description"
            label="Title"
            placeholder="Give tag a title..."
            multiline
            fullWidth
            rows={1}
            value={attributes.text}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ margin: "10px" }}>
                  <MdTitle />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setAttributes((attribute) => ({
                ...attribute,
                text: e.target.value,
              }));
            }}
            sx={{ alignSelf: "center", width: "100%", marginTop: "10px" }}
          />
          <TextField
            key="outlined-multiline-description"
            label="Description"
            placeholder="Give tag a description..."
            multiline
            fullWidth
            rows={2}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ margin: "10px" }}>
                  <MdWrapText />
                </InputAdornment>
              ),
            }}
            value={attributes.description}
            onChange={(e) => {
              setAttributes((attribute) => ({
                ...attribute,
                description: e.target.value,
              }));
            }}
            sx={{ alignSelf: "center", width: "100%", marginTop: "10px" }}
          />

          <TextField
            key="outlined-multiline-description"
            label="Link"
            placeholder="Give tag a link..."
            multiline
            fullWidth
            rows={1}
            value={attributes.link}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ margin: "10px" }}>
                  <BiLink />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setAttributes((attribute) => ({
                ...attribute,
                link: e.target.value,
              }));
            }}
            sx={{ alignSelf: "center", width: "100%", marginTop: "10px" }}
          />
        </div>
      }
      open={open}
      setOpen={setOpen}
      actions={
        <>
          <Button
            variant="filled"
            onClick={() => {
              virtualSpace.addTag({
                text: attributes.text,
                description: attributes.description,
                link: attributes.link,
                position: attributes.position,
              });
              setAttributes({
                text: "",
                description: "",
                link: "",
                position: { x: 0, y: 0, z: 0 },
              });
              setTag(false);
              setOpen(false);
            }}
          >
            Update
          </Button>
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
  );
}
