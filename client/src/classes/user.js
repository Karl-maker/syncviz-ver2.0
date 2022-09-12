import { Chip, Avatar } from "@mui/material";

class User {
  constructor(username, theme) {
    this._username = username;
    this._theme = theme;
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
            src="/"
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
        onClick={action}
        src="/"
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
