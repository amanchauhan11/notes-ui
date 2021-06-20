import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  }
}));

const SearchBar = props => {
  const classes = useStyles();
  return (
    <Paper
      component="form"
      className={classes.root}
      style={{ width: props.width }}
    >
      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        onChange={e => props.onChange(e.target.value)}
      />
      <SearchIcon className={classes.iconButton} />
    </Paper>
  );
};

SearchBar.defaultProps = {
  width: "40%"
};

export default SearchBar;
