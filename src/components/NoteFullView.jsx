import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Api, { isOk } from "../api/Api";
import { useSnackbar } from "../snackbar/useSnackbar";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  paper: {
    width: "50%"
  }
}));

const NoteFullView = props => {
  const classes = useStyles();
  const { showSnackbarMessage } = useSnackbar();
  const [note, setNote] = useState(props.note);
  const [isLoading, setLoading] = useState(false);
  const saveNote = newNote => {
    setLoading(true);
    Api.saveNote(newNote)
      .then(resp => {
        if (!isOk(resp.data.status)) throw new Error();
      })
      .then(() => {
        showSnackbarMessage("Note saved successfully");
        props.close();
        props.loadUserProfile();
      })
      .catch(() => showSnackbarMessage("Error saving note"))
      .finally(setLoading(false));
  };
  useEffect(() => {
    setNote(props.note);
  }, [props.note]);
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.close}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      classes={{ paper: classes.paper }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <DialogTitle id="scroll-dialog-title">
            <TextField
              fullWidth
              variant="outlined"
              value={note.title}
              onChange={e => {
                setNote(prevState => ({ ...prevState, title: e.target.value }));
              }}
              label="Title"
            />
          </DialogTitle>
          <DialogContent>
            <TextField
              multiline
              fullWidth
              rows={20}
              variant="outlined"
              value={note.body}
              onChange={e => {
                setNote(prevState => ({ ...prevState, body: e.target.value }));
              }}
              label="Body"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.close}>Cancel</Button>
            <Button onClick={() => saveNote(note)}>Save</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default NoteFullView;
