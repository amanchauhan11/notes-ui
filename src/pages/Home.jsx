import { Grid, IconButton } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import NoteFullView from "../components/NoteFullView";
import SearchBar from "../components/SearchBar";
import DeleteDialog from "../dialogs/DeleteDialog";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";

const useStyles = makeStyles(theme => ({
  search: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2%"
  },
  noteGrid: {
    padding: "2%"
  },
  noteCard: {
    margin: "20px"
  },
  addButton: {
    position: "absolute",
    bottom: "20px",
    right: "20px"
  }
}));

const Home = ({ notes, loadUserProfile }) => {
  const [filteredNotes, setfilteredNotes] = useState([]);
  useEffect(() => notes && setfilteredNotes(notes.map(note => note.id)), [
    notes
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
  const updateSearchResult = subStr => {
    setfilteredNotes(
      notes
        .filter(
          note =>
            (note.title && note.title.includes(subStr)) ||
            (note.body && note.body.includes(subStr))
        )
        .map(note => note.id)
    );
  };
  const classes = useStyles();
  return (
    <>
      <Box className={classes.search}>
        <SearchBar onChange={updateSearchResult} />
      </Box>
      <Grid container className={classes.noteGrid}>
        {notes &&
          notes.map((note, idx) =>
            filteredNotes.includes(note.id) ? (
              <Grid item xs={3} key={idx} className={classes.noteCard}>
                <NoteCard
                  noteData={note}
                  openNote={() => openNote(note.id)}
                  deleteNote={() =>
                    setDelDialog({ isOpen: true, noteId: note.id })
                  }
                ></NoteCard>
              </Grid>
            ) : (
              ""
            )
          )}
      </Grid>
      <IconButton
        aria-label="add"
        onClick={() => {
          setFullView({
            isOpen: true,
            note: { id: null, title: "", body: "", createdOn: null }
          });
        }}
        className={classes.addButton}
      >
        <AddCircleRoundedIcon style={{ fontSize: 60 }} color="secondary" />
      </IconButton>
      <NoteFullView
        isOpen={fullView.isOpen}
        close={() => setFullView({ ...fullView, isOpen: false })}
        note={fullView.note}
        loadUserProfile={loadUserProfile}
      />
      <DeleteDialog
        isOpen={delDialog.isOpen}
        close={() => setDelDialog({ ...delDialog, isOpen: false })}
        noteId={delDialog.noteId}
        loadUserProfile={loadUserProfile}
      />
    </>
  );
};

export default Home;
