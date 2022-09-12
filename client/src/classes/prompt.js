import Message from "./message";
import { BiLinkAlt } from "react-icons/bi";
import { Chip, Avatar, Typography } from "@mui/material";

class Prompt extends Message {
  constructor(message, { timestamp, icon }) {
    super(message, { timestamp });
    this._icon = icon || null;
  }

  // @override

  display() {
    return (
      <div style={{ display: "flex" }}>
        <Avatar
          sizes="small"
          src="/"
          sx={{
            width: 25,
            height: 25,
            bgcolor: this._color,
            color: "#ffff",
            marginRight: "5px",
          }}
          alt={this._message}
        >
          {this._icon ? this._icon : <BiLinkAlt />}
        </Avatar>
        <Chip
          label={
            <Typography
              variant="body2"
              sx={{
                color: "#ffff",
                ...this._textShadow,
                width: "100%",
                display: "inline-block",
                whiteSpace: "pre-line",
                wordWrap: "break-word",
                margin: 0.5,
              }}
            >
              {this._message}
            </Typography>
          }
          size="small"
          sx={{ height: "100%" }}
        />
      </div>
    );
  }
}

export default Prompt;
