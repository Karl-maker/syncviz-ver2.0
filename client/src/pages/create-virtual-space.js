import VirtualSpaceWidget from "../widgets/virtual-space";
import { useMemo, useContext, useState, useEffect } from "react";
import VirtualSpaceClass from "../classes/virtual-space";
import { UserAccountContext } from "../context/user";
import Tour from "../tours";
import Steps from "../tours/steps";
import ProtectPage from "./protect";
import PAGES from "../utils/constants/page-names";
import { useNavigate } from "react-router-dom";

export default function CreateVirtualSpace() {
  // Create Space On Site

  /*

  Cannot re make another Metaverse room from refreshing so a re-render tracker is made

  */

  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserAccountContext);

  /*

  1. Fill out info
  2. Create Metaverse Room

  */

  const virtualSpace = useMemo(() => {
    let vs = new VirtualSpaceClass(null, {
      attendee: user,
    });

    return vs;

    // eslint-disable-next-line
  }, []);

  const socket = useMemo(() => {
    let io = virtualSpace.connect({});

    return io;

    // eslint-disable-next-line
  }, [virtualSpace]);

  useEffect(() => {
    check()
      .then((id) => {
        if (id) {
          // navigate
          navigate(`${PAGES.METAVERSE_ROOM}/?id=${id}`);
        } else {
          setReady(true);
        }
      })
      .catch((err) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function check() {
    try {
      const id = await user.checkLastRoom();
      return id;
    } catch (err) {
      throw err;
    }
  }

  return (
    <ProtectPage>
      {ready && (
        <>
          {socket && (
            <Tour steps={Steps.MANAGE}>
              <VirtualSpaceWidget
                manage={true}
                socket={socket}
                virtualSpace={virtualSpace}
              />
            </Tour>
          )}
        </>
      )}
    </ProtectPage>
  );
}
