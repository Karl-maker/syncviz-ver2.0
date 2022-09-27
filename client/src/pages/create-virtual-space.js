import VirtualSpaceWidget from "../widgets/virtual-space";
import { useMemo, useContext } from "react";
import VirtualSpaceClass from "../classes/virtual-space";
import { UserAccountContext } from "../context/user";
import Tour from "../tours";
import Steps from "../tours/steps";
import { Helmet } from "react-helmet";

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
          <Helmet>
            <title>Syncviz | Create Metaverse Room</title>
            <meta
              name="description"
              content="Start a Metaverse Room to create a virtual environment where 3D models, products and environments can be shared. Allow persons to join your Metaverse Room now and share your 3D experience with many."
            />
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
