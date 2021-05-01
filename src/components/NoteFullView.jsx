import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    width: "50%"
  }
}));

const NoteFullView = props => {
  const classes = useStyles();
  const [note, setNote] = useState(props.note);
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
      <DialogTitle id="scroll-dialog-title">{note.title}</DialogTitle>
      <DialogContent>
        <TextField
          id="outlined-multiline-static"
          multiline
          fullWidth
          rows={20}
          variant="outlined"
          value={note.body}
          onChange={e => {
            setNote(prevState => ({ ...prevState, body: e.target.value }));
          }}
          inputRef={input => input && input.focus()}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            props.save(note);
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteFullView;
