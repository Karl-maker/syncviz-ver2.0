import { BsSearch } from "react-icons/bs";
import { Chip, IconButton, Typography } from "@mui/material";
import DialogButton from "../../template/buttons/dialog";
import { useState } from "react";
import SearchBar from "./";

export default function SearchDummy() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Chip
        onClick={() => {
          // Pressed
          setOpen((open) => !open);
        }}
        avatar={
          <IconButton>
            <BsSearch style={{ fontSize: "10px" }} />
          </IconButton>
        }
        variant="outlined"
        label={<Typography variant="caption">{"Search Metaverse"}</Typography>}
        sx={{
          border: "1 solid",
          borderColor: "background.screen",
          bgcolor: "transparent",
        }}
      />
      <DialogButton
        setOpen={setOpen}
        open={open}
        content={<SearchBar setOpen={setOpen} />}
      />
    </>
  );
}
