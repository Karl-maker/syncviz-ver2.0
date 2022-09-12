import { IconButton, Card, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { MdOutlineContentCopy, MdOutlineQrCode2 } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { BsWhatsapp, BsTwitter, BsFacebook } from "react-icons/bs";
import DialogButton from "../../template/buttons/dialog";
import { useState, useRef, useContext } from "react";
import copyText from "../../utils/others/clipboard";
import { VirtualSpaceContext } from "../../widgets/virtual-space";
import PAGES from "../../utils/constants/page-names";
import QRCode from "react-qr-code";

export default function Share({ toggleOpen, open }) {
  const { virtualSpace } = useContext(VirtualSpaceContext);
  const [showQRCode, toggleShowQRCode] = useState(false);
  const theme = useTheme();
  const clipboard = useRef();

  const createLink = (href) => {
    return href.replace(
      PAGES.CREATE_METAVERSE,
      `${PAGES.METAVERSE_ROOM}/?id=${virtualSpace.id}`
    );
  };

  const shareContent = () => {
    return `${createLink(
      window.location.href
    )} to Join Metaverse Room with topic "${virtualSpace.description}"`;
  };

  const shareHeader = () => {
    return virtualSpace.manage
      ? "Join My Metaverse Room!"
      : `Join ${
          virtualSpace.host.username ? virtualSpace.host.username : "Creator"
        }'s Metaverse Room!`;
  };

  return (
    <>
      <DialogButton
        action_sx={{ justifyContent: "center" }}
        element={
          <>
            {!showQRCode ? (
              <>
                <div
                  style={{ justifyContent: "space-around", display: "flex" }}
                >
                  <IconButton
                    size="large"
                    sx={{ marginBottom: 2 }}
                    href={`mailto:?subject=${shareHeader()}&body=Click Link: ${shareContent()}`}
                  >
                    <IoMail />
                  </IconButton>
                  <IconButton
                    size="large"
                    sx={{ marginBottom: 2 }}
                    href={`http://twitter.com/share?text=Join ${
                      virtualSpace.host.username
                        ? virtualSpace.host.username
                        : "Creator"
                    }'s Metaverse Room "${
                      virtualSpace.description
                    }"&url=${createLink(
                      window.location.href
                    )}&hashtags=3dshare,3dsharing,metaverse`}
                    target="_blank"
                  >
                    <BsTwitter />
                  </IconButton>
                  <IconButton
                    size="large"
                    sx={{ marginBottom: 2 }}
                    onClick={() => {
                      toggleShowQRCode((show) => !show);
                    }}
                  >
                    <MdOutlineQrCode2 />
                  </IconButton>
                  <IconButton
                    size="large"
                    sx={{ marginBottom: 2 }}
                    href={`https://www.facebook.com/share.php?u=${createLink(
                      window.location.href
                    )}`}
                    target="_blank"
                  >
                    <BsFacebook />
                  </IconButton>
                  <IconButton
                    size="large"
                    sx={{ marginBottom: 2 }}
                    href={`whatsapp://send?text=${shareContent()}`}
                    data-action="share/whatsapp/share"
                  >
                    <BsWhatsapp />
                  </IconButton>
                </div>
                <Card
                  elevation={0}
                  sx={{
                    padding: 1,
                    bgcolor: "background.screen",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    readOnly
                    ref={clipboard}
                    value={createLink(window.location.href)}
                    style={{
                      fontSize: "15px",
                      outline: "none",
                      borderWidth: "0px",
                      backgroundColor: "transparent",
                      color: theme.palette.mode === "dark" ? "#fff" : "#2d3436",
                    }}
                  ></input>

                  <Button
                    startIcon={<MdOutlineContentCopy />}
                    sx={{ marginLeft: 0 }}
                    variant="outlined"
                    onClick={() => {
                      copyText(clipboard.current);
                    }}
                  >
                    COPY
                  </Button>
                </Card>
              </>
            ) : (
              <>
                <QRCode value={createLink(window.location.href)} />
              </>
            )}
          </>
        }
        open={open}
        setOpen={toggleOpen}
        actions={
          <>
            {showQRCode && (
              <Button
                variant="filled"
                onClick={() => {
                  toggleShowQRCode(false);
                }}
              >
                BACK
              </Button>
            )}
            <Button
              variant="filled"
              onClick={() => {
                toggleOpen();
              }}
            >
              Cancel
            </Button>
          </>
        }
      />
    </>
  );
}
