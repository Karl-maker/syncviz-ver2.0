import VirtualSpaceWidget from "../widgets/virtual-space";
import { useSearchParams } from "react-router-dom";
import { useMemo, useContext } from "react";
import { UserAccountContext } from "../context/user";
import VirtualSpaceClass from "../classes/virtual-space";
import Tour from "../tours";
import Steps from "../tours/steps";
import { Helmet } from "react-helmet";
import PAGE from "../utils/constants/page-names";

export default function VirtualSpace() {
  const [searchParams] = useSearchParams();
  const { user } = useContext(UserAccountContext);
  const virtualSpace = useMemo(
    () => new VirtualSpaceClass(searchParams.get("id"), { attendee: user }),
    // eslint-disable-next-line
    [searchParams.get("id")]
  );
  const socket = useMemo(
    () => virtualSpace.connect({}),
    // eslint-disable-next-line
    [virtualSpace]
  );

  return (
    <>
      <Helmet>
        <title>Syncpoly | View Virtual Room</title>
        <meta
          name="description"
          content="Share 3D Models, Products or Environments live with anyone. Quickly you can allow others to interact and explore 3D while communicating with eachother. SyncPoly helps to bring 3D sharing to everyone."
        />
        <link rel="canonical" href={`${PAGE.VIRTUAL_ROOM}`} />
      </Helmet>
      {socket && (
        <Tour steps={Steps.VISITER}>
          <VirtualSpaceWidget virtualSpace={virtualSpace} socket={socket} />
        </Tour>
      )}
    </>
  );
}
