import { Box } from "@mui/material";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { VirtualSpaceContext } from "../../widgets/virtual-space";
import { UserAccountContext } from "../../context/user";
import Viewer from "./viewer";

export default function VirtualSpaceComponent() {
  const { user, save } = useContext(UserAccountContext);
  const navigate = useNavigate();
  const { socket, virtualSpace } = useContext(VirtualSpaceContext);

  useEffect(() => {
    socket.on("updates", (data) => {
      if (data.name === "NotFound" && data.room === "manage") {
        virtualSpace.clean();
        // Refresh
        navigate(0);
      }
    });

    socket.on("current-user", (user) => {
      virtualSpace.attendee.socket_id = user.socket_id;
    });

    socket.on("attributes", ({ virtual_space }) => {
      const {
        _id,
        name,
        description,
        createdAt,
        hashtags,
        time_limit,
        user,
        model,
        link,
      } = virtual_space;

      virtualSpace.id = _id;
      virtualSpace.name = name;
      virtualSpace.description = description;
      virtualSpace.time_limit = time_limit;
      virtualSpace.createdAt = createdAt;
      virtualSpace.host = user;
      virtualSpace.link = link;
      virtualSpace.hashtags = hashtags;

      if (model.url) virtualSpace.url = model.url;

      virtualSpace.setLocal();
    });

    return () => {
      socket.off("attributes");
      socket.off("updates");
      socket.off("current-user");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    virtualSpace.attendee.username = user.username;
    virtualSpace.attendee.theme = user.theme;
    virtualSpace.updateUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [save]);

  return (
    <Box
      sx={{
        width: "100%",
        padding: "5px",
        margin: "0px",
        height: "100%",
        overflow: "none",
      }}
    >
      <Viewer />
    </Box>
  );
}
