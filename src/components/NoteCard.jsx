import { makeStyles, CardActionArea } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  content: {
    height: "100px"
  },
  controls: {
    textAlign: "right"
  }
}));
const NoteCard = props => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={props.openNote}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {props.noteData.title}
          </Typography>
          <Typography variant="body1">{props.noteData.body}</Typography>
        </CardContent>
      </CardActionArea>
      <div className={classes.controls}>
        <Tooltip
          title={
            "Created On: " +
            new Date(props.noteData.createdOn).toLocaleDateString()
          }
          arrow
        >
          <IconButton aria-label="info">
            <InfoIcon aria-label="info" fontSize="small" />
          </IconButton>
        </Tooltip>
        <IconButton aria-label="delete" onClick={props.deleteNote}>
          <DeleteIcon aria-label="delete note" fontSize="small" />
        </IconButton>
      </div>
    </Card>
  );
};

export default NoteCard;
