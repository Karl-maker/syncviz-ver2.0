import {
  InputAdornment,
  TextField,
  Button,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import { UserAccountContext } from "../../context/user";
import { useContext, useState } from "react";
import DialogButton from "../../template/buttons/dialog";

export default function EditUsername({ setOpen, open }) {
  const { user, triggerSave } = useContext(UserAccountContext);
  const [username, setUsername] = useState(user.username);
  const [theme, setTheme] = useState(user.theme);

  const themePickerList = [
    {
      color: "#00b894",
    },
    {
      color: "#0984e3",
    },
    {
      color: "#6c5ce7",
    },
    {
      color: "#d63031",
    },
    {
      color: "#e84393",
    },
  ];

  return (
    <DialogButton
      setOpen={setOpen}
      open={open}
      title="Change Guest Username"
      content={
        <>
          <TextField
            id="search-bar"
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            sx={{ marginTop: "5px" }}
            fullWidth
            label="Edit Username"
            variant="outlined"
            placeholder="Search"
            value={username}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Avatar
                    src="/"
                    alt={username}
                    sx={{ bgcolor: theme, color: "#ffff" }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="caption">Pick theme color</Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {themePickerList.map(({ color }, index) => (
              <IconButton
                key={index}
                onClick={() => {
                  setTheme(color);
                }}
              >
                <div
                  style={{
                    height: 25,
                    width: 25,
                    backgroundColor: color,
                    borderRadius: "25px",
                  }}
                ></div>
              </IconButton>
            ))}
          </div>
        </>
      }
      actions={
        <>
          <Button
            variant="filled"
            onClick={() => {
              user.theme = theme;
              user.username = username;
              triggerSave((save) => !save);
              setOpen(false);
            }}
          >
            Update
          </Button>
          <Button variant="filled" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </>
      }
    />
  );
}
