import Message from "./message";
import { Chip } from "@mui/material";
import { BsFillFileEarmarkFill } from "react-icons/bs";

class BlobMessage extends Message {
  constructor(message, { timestamp }) {
    super(message, { timestamp });
  }

  // @override

  display() {
    return (
      <Chip
        sx={{ bgcolor: "#00b894", color: "#ffff" }}
        avatar={
          <div
            style={{
              color: "#ffff",
              fontSize: "12px",
              display: "flex",
              paddingTop: "3px",
              paddingLeft: "2px",
            }}
          >
            <BsFillFileEarmarkFill style={{}} />
          </div>
        }
        size="small"
        label={this._message}
      />
    );
  }
}

export default BlobMessage;
