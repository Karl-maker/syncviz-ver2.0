import { createContext, useEffect, useState } from "react";
import ManageVirtualSpace from "../components/manage-virtual-space";
import VirtualSpaceComponent from "../components/virtual-space";
import useLocalStorage from "../utils/hooks/useLocalStorage";
import { useTour } from "@reactour/tour";

export const VirtualSpaceContext = createContext({});
export const TagContext = createContext({});

export default function VirtualSpaceWidget({ manage, socket, virtualSpace }) {
  // This will create instance and share with all components

  const [select, setSelect] = useState({ x: 0, y: 0, z: 0 });
  const [tag, setTag] = useState(false);

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
      let id = JSON.parse(current).id;
      let code = JSON.parse(current).code;

      if (!manage) {
        virtualSpace.join();
      } else if (id && code) {
        // reconnect to previous room
        virtualSpace.manageVirtualRoom({
          code: code,
          id: id,
        });
      } else {
        // create new room
        virtualSpace.create();
      }
    });

    return () => {
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
    </VirtualSpaceContext.Provider>
  );
}
