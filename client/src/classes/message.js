import { Chip, Avatar, Typography } from "@mui/material";

class Message {
  constructor(message, { timestamp, username, color }) {
    this._message = message || "";
    this._timestamp = timestamp || "";
    this._username = username || "";
    this._color = color || null;
    this._textShadow = {
      textShadow: "0.5px 0.5px 0.5px rgba(0,0,0,0.64)",
    };
  }

  get message() {
    return this._message;
  }

  set message(message) {
    this._message = message;
  }

  display() {
    return (
      <div style={{ display: "flex" }}>
        <Avatar
          sizes="small"
          src="/"
          sx={{
            width: 30,
            height: 30,
            bgcolor: this._color,
            color: "#ffff",
            marginRight: "5px",
          }}
          alt={this._username}
        />
        <Chip
          sx={{
            height: "auto",
            padding: "0px",
            paddingTop: "5px",
            paddingRight: "5px",
            alignContent: "start",
          }}
          label={
            <>
              {/*<Chip
                size="small"
                label={this._username.toLowerCase()}
                sx={{
                  bgcolor: "transparent",
                  height: "auto",
                  marginBottom: "2px",
                }}
              />*/}
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "#ffff", ...this._textShadow }}
              >
                {this._username}
              </Typography>
              <br />
              <Typography
                variant="body2"
                display="block"
                gutterBottom
                sx={{
                  width: "100%",
                  display: "inline-block",
                  whiteSpace: "pre-line",
                  wordWrap: "break-word",
                  color: "#ffff",
                  ...this._textShadow,
                }}
              >
                {this._message}
              </Typography>
            </>
          }
        />
      </div>
    );
  }

  /*

  <Card elevation={0} sx={{ borderRadius: "10px", padding: "5px" }}>
                <Chip
                  label={
                    <Chip
                      avatar={<Avatar src="/" />}
                      label={this._username.toLowerCase()}
                      size="small"
                      sx={{
                        height: "auto",
                        minHeight: "25px",
                        marginBottom: "5px",
                      }}
                    />
                  }
                  size="small"
                  sx={{
                    height: "auto",
                    minHeight: "25px",
                    marginBottom: "5px",
                  }}
                />
                <Divider />
                <Typography variant="caption" display="block" gutterBottom>
                  {this._message}
                </Typography>
              </Card>


  */
}

export default Message;
