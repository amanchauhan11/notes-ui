import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../assets/logo.png";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded";
import { IconButton } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useState, useEffect } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Api from "../api/Api";
import { useSnackbar } from "../snackbar/useSnackbar";

const useStyles = makeStyles(theme => ({
  logo: {
    height: 50,
    width: 50
  },
  title: {
    marginLeft: 10
  },
  authBlock: {
    marginLeft: "20px"
  },
  darkMode: {
    marginLeft: "auto",
    color: theme.palette.getContrastText(theme.palette.primary.main)
  }
}));

const TopAppBar = ({ profile, toggleDarkMode, setAuth, isAuth }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => setAnchorEl(null), [isAuth]);
  const { showSnackbarMessage } = useSnackbar();
  const openMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    Api.logout()
      .then(() => setAuth(false))
      .catch(() => showSnackbarMessage("Error logging out"));
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <img src={Logo} className={classes.logo} alt="logo" />
        <Typography variant="h6" className={classes.title}>
          Notes
        </Typography>
        <IconButton className={classes.darkMode} onClick={toggleDarkMode}>
          <Brightness4RoundedIcon />
        </IconButton>
        {isAuth && (
          <Box className={classes.authBlock}>
            <IconButton className={classes.darkMode} onClick={openMenu}>
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={closeMenu}
            >
              <MenuItem>{profile.email}</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
