import { Chip, Avatar } from "@mui/material";

class User {
  constructor(username, theme, img) {
    this._username = username;
    this._theme = theme;
    this._img = img;
    this._socket_id = null;
  }

  get username() {
    return this._username;
  }

  set username(username) {
    this._username = username;
  }

  get theme() {
    return this._theme;
  }

  set theme(theme) {
    this._theme = theme;
  }

  get img() {
    return this._img;
  }

  set img(img) {
    this._img = img;
  }

  get socket_id() {
    return this._socket_id;
  }

  set socket_id(id) {
    this._socket_id = id;
  }

  display({ backgroundColor, color }) {
    return (
      <Chip
        label={this._username}
        size="small"
        sx={{
          color: color || "",
          backgroundColor: backgroundColor || "",
        }}
        avatar={
          <Avatar
            referrerPolicy="no-referrer"
            src={this._img ? this._img : "/"}
            sx={{ bgcolor: this._theme, color: "#ffff" }}
            alt={this._username}
          />
        }
      />
    );
  }

  avatar({ size, sx, action }) {
    return (
      <Avatar
        referrerPolicy="no-referrer"
        onClick={action}
        src={this._img ? this._img : "/"}
        sx={{
          ...sx,
          bgcolor: this._theme,
          color: "#ffff",
          height: size,
          width: size,
        }}
        alt={this._username}
      />
    );
  }
}

export default User;
