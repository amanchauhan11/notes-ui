import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState } from "react";
import { useSnackbar } from "../snackbar/useSnackbar";
import Api, { isOk } from "../api/Api";

const DeleteDialog = props => {
  const [isLoading, setLoading] = useState(false);
  const { showSnackbarMessage } = useSnackbar();
  const deleteNote = noteId => {
    setLoading(true);
    Api.deleteNote(noteId)
      .then(resp => {
        if (!isOk(resp.data.status)) throw new Error();
      })
      .then(() => {
        showSnackbarMessage("Deleted successfully");
        props.close();
        props.loadUserProfile();
      })
      .catch(e => {
        showSnackbarMessage("Error deleting node");
      })
      .finally(() => setLoading(false));
  };
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.close}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <DialogTitle id="scroll-dialog-title">Delete Note</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this note?
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={props.close}>Cancel</Button>
            <Button onClick={() => deleteNote(props.noteId)}>Delete</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default DeleteDialog;
