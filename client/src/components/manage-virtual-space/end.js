import { Typography, Button } from "@mui/material";
import DialogButton from "../../template/buttons/dialog";
import useAnalyticsEventTracker from "../../utils/hooks/useAnalyticsEventTracker";

export default function EndVirutalRoom({ virtualSpace, open, setOpen }) {
  const gaEventTracker = useAnalyticsEventTracker("End Room");
  return (
    <DialogButton
      title="End Virtual Room"
      content={<Typography>This will end room for all other users</Typography>}
      open={open}
      setOpen={setOpen}
      actions={
        <>
          <Button
            variant="filled"
            onClick={() => {
              gaEventTracker("end");
              virtualSpace.end();
              setOpen(false);
            }}
          >
            End
          </Button>
          <Button
            variant="filled"
            onClick={() => {
              gaEventTracker("cancel");
              setOpen(false);
            }}
          >
            Cancel
          </Button>
        </>
      }
    />
  );
}
