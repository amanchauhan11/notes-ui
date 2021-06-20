import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import LoginDialog from "../dialogs/LoginDialog";
import SignUpDialog from "../dialogs/SignUpDialog";
import { useState } from "react";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100% - 64px)"
  },
  authBlock: {
    marginTop: "20px",
    marginBottom: "20px"
  },
  authButton: {
    margin: "10px"
  },
  welcomeBlock: {
    margin: "10px"
  }
}));

const Welcome = ({ user, setAuth }) => {
  const classes = useStyles();
  const [loginDialog, setLoginDialog] = useState(false);
  const [signUpDialog, setSignUpDialog] = useState(false);
  return user.isAuth ? (
    <Redirect to="/" />
  ) : (
    <Box className={classes.root}>
      <Typography
        variant="h1"
        className={classes.welcomeBlock}
        color="textPrimary"
      >
        Welcome
      </Typography>
      <Box className={classes.authBlock}>
        <Button
          className={classes.authButton}
          onClick={() => setLoginDialog(true)}
        >
          Login
        </Button>
        <Button
          className={classes.authButton}
          onClick={() => setSignUpDialog(true)}
        >
          Sign up
        </Button>
      </Box>
      <LoginDialog
        isOpen={loginDialog}
        close={() => setLoginDialog(false)}
        setAuth={setAuth}
      />
      <SignUpDialog
        isOpen={signUpDialog}
        close={() => setSignUpDialog(false)}
      />
    </Box>
  );
};

export default Welcome;
