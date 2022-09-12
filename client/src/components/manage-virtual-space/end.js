import { Typography, Button } from "@mui/material";
import DialogButton from "../../template/buttons/dialog";
import { useNavigate } from "react-router-dom";

export default function EndMetaverseRoom({ virtualSpace, open, setOpen }) {
  const navigate = useNavigate();

  return (
    <DialogButton
      title="End Metaverse Room"
      content={<Typography>This will end room for all other users</Typography>}
      open={open}
      setOpen={setOpen}
      actions={
        <>
          <Button
            variant="filled"
            onClick={() => {
              virtualSpace.end();
              navigate("/");
            }}
          >
            End
          </Button>
          <Button variant="filled" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </>
      }
    />
  );
}
