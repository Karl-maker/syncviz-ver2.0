import { createContext, useEffect, useState } from "react";
import ManageVirtualSpace from "../components/manage-virtual-space";
import VirtualSpaceComponent from "../components/virtual-space";
import useLocalStorage from "../utils/hooks/useLocalStorage";
import { useTour } from "@reactour/tour";
import DialogButton from "../template/buttons/dialog";
import { Typography, Button } from "@mui/material";
import { VscDebugDisconnect } from "react-icons/vsc";

export const VirtualSpaceContext = createContext({});
export const TagContext = createContext({});

export default function VirtualSpaceWidget({ manage, socket, virtualSpace }) {
  // This will create instance and share with all components

  const [select, setSelect] = useState({ x: 0, y: 0, z: 0 });
  const [tag, setTag] = useState(false);
  const [disconnectionDialog, setDisconnectionDialog] = useState(false);
  const [block, setBlock] = useState(false);
  const { setIsOpen } = useTour();

  // Local Storage

  const [current] = useLocalStorage(
    `current_room`,
    JSON.stringify({
      id: "",
      code: "",
    })
  );
  const [history, setHistory] = useLocalStorage(
    `${manage ? "manage" : "viewer"}_history`,
    JSON.stringify({
      visits: 0,
    })
  );

  useEffect(() => {
    if (JSON.parse(history).visits < 5) {
      // Set tour and add one

      setIsOpen(true);
    }

    setHistory(JSON.stringify({ visits: JSON.parse(history).visits + 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      if (block && manage) {
        // need to release block
        setDisconnectionDialog(true);
        return;
      }

      if (!manage) {
        virtualSpace.join();
      } else if (JSON.parse(current).id && JSON.parse(current).code) {
        // reconnect to previous room
        virtualSpace.manageVirtualRoom({
          code: JSON.parse(current).code,
          id: JSON.parse(current).id,
        });
      } else {
        // create new room
        virtualSpace.create();
      }
    });

    socket.on("disconnect", () => {
      if (manage && !virtualSpace.ended) {
        setBlock(true);
      }
    });

    return () => {
      socket.off("disconnect");
      socket.off("connect");
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Join as soon as rendered

  return (
    <VirtualSpaceContext.Provider value={{ socket, virtualSpace, manage }}>
      <TagContext.Provider value={{ setSelect, select, setTag, tag }}>
        {
          // All components will use virtual space context to display data
        }
        <ManageVirtualSpace />
        <VirtualSpaceComponent />
      </TagContext.Provider>
      <DialogButton
        open={disconnectionDialog}
        setOpen={setDisconnectionDialog}
        title={"Reconnect"}
        content={
          <Typography>
            You have been disconnected unexpectedly, we will attempt to
            reconnect you to your Metaverse Room.
          </Typography>
        }
        actions={
          <>
            <Button
              endIcon={<VscDebugDisconnect />}
              variant="filled"
              onClick={() => {
                if (JSON.parse(current).id && JSON.parse(current).code) {
                  virtualSpace.manageVirtualRoom({
                    code: JSON.parse(current).code,
                    id: JSON.parse(current).id,
                  });
                }

                setDisconnectionDialog(false);
              }}
            >
              Reconnect
            </Button>
          </>
        }
      />
    </VirtualSpaceContext.Provider>
  );
}
