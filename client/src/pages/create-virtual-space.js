import VirtualSpaceWidget from "../widgets/virtual-space";
import { useMemo, useContext } from "react";
import VirtualSpaceClass from "../classes/virtual-space";
import { UserAccountContext } from "../context/user";
import Tour from "../tours";
import Steps from "../tours/steps";

export default function CreateVirtualSpace() {
  // Create Space On Site

  /*

  Cannot re make another Metaverse room from refreshing so a re-render tracker is made

  */

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

  return (
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
  );
}
