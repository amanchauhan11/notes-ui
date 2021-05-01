import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useState } from "react";
import React from "react";
import axios from "axios";

const useStyles = makeStyles(theme => ({}));

const DeleteDialog = props => {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const deleteNote = () => {
    Promise.resolve({ status: "Success" }).then(() => {
      setLoading(false);
      props.delete(props.noteId);
      props.close();
    }).catch(e => );
  };
  return (
    <Dialog
      open
      onClose={props.close}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Delete Note</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this note?
        </DialogContentText>
      </DialogContent>
      {isLoading ? (
        <DialogActions>
          <Button onClick={props.close} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.delete(props.noteId);
            }}
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      ) : (
        <CircularProgress />
      )}
    </Dialog>
  );
};

export default DeleteDialog;
