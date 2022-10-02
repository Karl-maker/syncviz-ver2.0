import VirtualSpaceWidget from "../widgets/virtual-space";
import { useMemo, useContext } from "react";
import VirtualSpaceClass from "../classes/virtual-space";
import { UserAccountContext } from "../context/user";
import Tour from "../tours";
import Steps from "../tours/steps";
import PAGES from "../utils/constants/page-names";
import { Helmet } from "react-helmet";

export default function CreateVirtualSpace() {
  // Create Space On Site

  /*

  Cannot re make another Virtual room from refreshing so a re-render tracker is made

  */

  const { user } = useContext(UserAccountContext);

  /*

  1. Fill out info
  2. Create Virtual Room

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
          <Helmet>
            <title>SyncPoly | Create Virtual Room</title>
            <meta
              name="description"
              content="Start a Virtual Room to create a virtual environment where 3D models, products and environments can be shared. Allow persons to join your Virtual Room now and share your 3D experience with many."
            />
            <link rel="canonical" href={`${PAGES.CREATE_VIRTUAL_ROOM}`} />
          </Helmet>
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
