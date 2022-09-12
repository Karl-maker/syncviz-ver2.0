import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";

function PaperComponent(props) {
  const theme = useTheme();
  return (
    <div>
      <Paper
        sx={{ bgcolor: theme.palette.mode === "dark" ? "" : "text.tertiary" }}
        {...props}
      />
    </div>
  );
}

export default function DialogButton({
  noClickOff,
  children,
  title,
  content,
  actions,
  setOpen,
  open,
  element,
  action_sx,
  sx,
}) {
  const handleClose = () => {
    setOpen(!noClickOff ? false : true);
  };

  return (
    <div>
      {children}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="delete-alert"
      >
        <DialogTitle sx={{ color: "text.primary" }}>{title}</DialogTitle>
        <DialogContent>
          {element ? (
            element
          ) : (
            <DialogContentText sx={{ color: "text.primary" }}>
              {content}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions sx={action_sx}>{actions}</DialogActions>
      </Dialog>
    </div>
  );
}
