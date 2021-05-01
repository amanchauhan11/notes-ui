import SearchBar from "../components/SearchBar";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";
import { useState } from "react";
import NoteCard from "../components/NoteCard";
import NoteFullView from "../components/NoteFullView";
import DeleteDialog from "../components/DeleteDialog";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2%"
  },
  noteGrid: {
    padding: "2%"
  },
  noteCard: {
    margin: "20px"
  }
}));

const Home = () => {
  //dummy state, TODO: replace by rest call
  const [notes, setNotes] = useState([
    { id: 1, title: "Note 1", body: "note 1 body", createdOn: 1619802653155 },
    { id: 2, title: "Note 2", body: "note 2 body", createdOn: 1619802653155 },
    { id: 3, title: "Note 3", body: "note 3 body", createdOn: 1619802653155 },
    { id: 4, title: "Note 4", body: "note 4 body", createdOn: 1619802653155 }
  ]);
  const [fullView, setFullView] = useState({
    isOpen: false,
    note: {}
  });
  const [delDialog, setDelDialog] = useState({
    isOpen: false,
    noteId: null
  });
  const openNote = id => {
    let note = notes.find(note => note.id === id);
    setFullView({
      isOpen: true,
      note: { ...note }
    });
  };
  const saveNote = newNote => {
    //rest call
    setNotes(prevState => {
      let idx = prevState.findIndex(note => note.id === newNote.id);
      const newState = [...prevState];
      newState[idx] = newNote;
      return newState;
    });
    setFullView({ ...fullView, isOpen: false };
  };
  const deleteNote = id => {
    //rest call
    setNotes(prevState => {
      let idx = prevState.findIndex(note => note.id === id);
      const newState = [...prevState];
      newState.splice(idx, 1);
      return newState;
    });
  };
  const classes = useStyles();
  return (
    <>
      <Box className={classes.root}>
        <SearchBar />
      </Box>
      <Grid container className={classes.noteGrid}>
        {notes.map((note, idx) => (
          <Grid item xs={3} key={idx} className={classes.noteCard}>
            <NoteCard
              noteData={note}
              openNote={() => openNote(note.id)}
              deleteNote={() => deleteNote(note.id)}
            ></NoteCard>
          </Grid>
        ))}
      </Grid>
      <NoteFullView
        isOpen={fullView.isOpen}
        close={() => setFullView({ ...fullView, isOpen: false })}
        note={fullView.note}
        save={saveNote}
      />
      <DeleteDialog
        isOpen={delDialog.isOpen}
        close={setDelDialog({ ...delDialog, isOpen: false })}
        delete={deleteNote}
        noteId={delDialog.noteId}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        key={`${"top"},${"center"}`}
        open={open}
        onClose={handleClose}
        message="I love snacks"
      />
    </>
  );
};

export default Home;
