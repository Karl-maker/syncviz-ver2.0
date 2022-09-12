import { VirtualSpaceContext } from "../../widgets/virtual-space";
import {
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  useMediaQuery,
} from "@mui/material";
import { BiLogOut } from "react-icons/bi";
import { IoOptions } from "react-icons/io5";
import { RiShareFill } from "react-icons/ri";
import { useState, useContext } from "react";
import { HiOutlineCubeTransparent } from "react-icons/hi";
import MEDIA from "../../utils/constants/media";
import EndMetaverseRoom from "./end";
import Attributes from "./attributes";
import EnvironmentSelection from "./environment";
import Share from "../../components/virtual-space/share";
import classes from "../../utils/constants/classes";

export default function ManageVirtualSpace({ isManager }) {
  // Have Virtual Room there WITH snackbar
  const mobile = useMediaQuery(MEDIA.MOBILE_MAX);
  const { virtualSpace, manage } = useContext(VirtualSpaceContext);

  // Dialog Triggers
  const [open, setOpen] = useState(true);
  const [endDialog, toggleEndDialog] = useState(false);
  const [attributesDialog, toggleAttributesDialog] = useState(false);
  const [environmentDialog, toggleEnvironmentDialog] = useState(false);
  const [shareDialog, toggleShareDialog] = useState(false);

  // Options

  const SHARE = {
    name: "Share",
    icon: <RiShareFill color="#fff" />,
    action: () => toggleShareDialog(true),
    class: classes.VIEWER_SNACKBAR_SHARE,
  };

  const actions = manage
    ? [
        SHARE,
        {
          name: "End Metaverse Room",
          icon: <BiLogOut color="#fff" />,
          action: () => toggleEndDialog(true),
          managerOnly: true,
          class: classes.VIEWER_SNACKBAR_ENDROOM,
        },
        {
          name: "Edit attributes",
          icon: <IoOptions color="#fff" />,
          action: () => toggleAttributesDialog(true),
          managerOnly: true,
          class: classes.VIEWER_SNACKBAR_EDIT_ATTRIBUTES,
        },

        {
          name: "Add model",
          icon: <HiOutlineCubeTransparent color="#fff" />,
          action: () => toggleEnvironmentDialog(true),
          managerOnly: true,
          class: classes.VIEWER_SNACKBAR_ADD_MODEL,
        },
      ]
    : [SHARE];

  return (
    <>
      <SpeedDial
        open={open}
        onClick={() => {
          setOpen((open) => !open);
        }}
        ariaLabel="Metaverse Room Manager"
        sx={{
          position: "fixed",
          bottom: mobile ? 65 : 30,
          right: mobile ? 16 : 60,
        }}
        icon={<SpeedDialIcon className={classes.VIEWER_SNACKBAR} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            className={action.class || null}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
          />
        ))}
      </SpeedDial>
      {
        // Options Dialogs
      }
      <EndMetaverseRoom
        virtualSpace={virtualSpace}
        setOpen={toggleEndDialog}
        open={endDialog}
      />
      <Attributes
        virtualSpace={virtualSpace}
        setOpen={toggleAttributesDialog}
        open={attributesDialog}
      />
      <EnvironmentSelection
        virtualSpace={virtualSpace}
        setOpen={toggleEnvironmentDialog}
        open={environmentDialog}
      />
      <Share toggleOpen={toggleShareDialog} open={shareDialog} />
    </>
  );
}
