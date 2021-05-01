import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../assets/logo.png";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  logo: {
    height: 50,
    width: 50
  },
  title: {
    marginLeft: 10
  },
  authBlock: {
    marginLeft: "auto"
  }
}));

const TopAppBar = props => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <img src={Logo} className={classes.logo} alt="logo" />
        <Typography variant="h6" className={classes.title}>
          Notes
        </Typography>
        <Box className={classes.authBlock}>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Sign up</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
