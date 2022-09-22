import { useState, useEffect } from "react";
import { MdWrapText } from "react-icons/md";
import { BiLink, BiHash } from "react-icons/bi";
import generateHashtags from "../../utils/others/generateHashtags";
import DialogButton from "../../template/buttons/dialog";
import {
  Typography,
  TextField,
  InputAdornment,
  Button,
  useMediaQuery,
} from "@mui/material";
import MEDIA from "../../utils/constants/media";
import useAnalyticsEventTracker from "../../utils/hooks/useAnalyticsEventTracker";

export default function Attributes({ virtualSpace, open, setOpen }) {
  const gaEventTracker = useAnalyticsEventTracker("Attributes");
  const [attributes, setAttributes] = useState({
    description: "",
    link: "",
    hashtags: "",
  });

  useEffect(() => {
    setAttributes({
      description: virtualSpace.description,
      link: virtualSpace.link,
      hashtags: virtualSpace.hashtags,
    });
  }, [virtualSpace.link, virtualSpace.description, virtualSpace.hashtags]);

  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  return (
    <DialogButton
      noClickOff
      title="Edit Attributes"
      content={
        <div style={{ width: mobile ? "70vw" : "100%" }}>
          <Typography
            variant="subtitle1"
            sx={{ alignSelf: "center", marginBottom: "10px" }}
          >
            Update your room's attributes
          </Typography>
          <div
            style={{
              width: "100%",

              marginBottom: "10px",
            }}
          >
            <TextField
              key="outlined-multiline-description"
              label="Caption"
              placeholder="Write a caption..."
              multiline
              fullWidth
              rows={2}
              value={attributes.description}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ margin: "10px" }}>
                    <MdWrapText />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setAttributes((attribute) => ({
                  ...attribute,
                  description: e.target.value,
                }));
              }}
              sx={{ alignSelf: "center", width: "100%" }}
            />
            <TextField
              key="outlined-multiline-description"
              label="Link"
              placeholder="Enter your link..."
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
            <TextField
              key="outlined-multiline-description"
              label="Hashtags"
              placeholder="Enter #hastags..."
              multiline
              fullWidth
              rows={1}
              value={attributes.hashtags}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ margin: "10px" }}>
                    <BiHash />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setAttributes((attribute) => ({
                  ...attribute,
                  hashtags: e.target.value,
                }));
              }}
              sx={{ alignSelf: "center", width: "100%", marginTop: "10px" }}
            />
          </div>
        </div>
      }
      open={open}
      setOpen={setOpen}
      actions={
        <>
          <Button
            variant="filled"
            onClick={() => {
              if (attributes.description) gaEventTracker("add caption");
              if (attributes.link) gaEventTracker("add link");

              let hashtags = "";
              if (attributes.hashtags) {
                gaEventTracker("add hashtag");
                hashtags = generateHashtags(attributes.hashtags);
              }
              virtualSpace.updateAttributes({
                description: attributes.description,
                link: attributes.link,
                hashtags,
              });

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
