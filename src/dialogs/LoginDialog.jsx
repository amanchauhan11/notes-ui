import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { useSnackbar } from "../snackbar/useSnackbar";
import Api from "../api/Api";

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px"
  },
  formContent: {
    margin: "10px 0px"
  }
}));

const LoginDialog = props => {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const { showSnackbarMessage } = useSnackbar();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const submitLogin = e => {
    e.preventDefault();
    setLoading(true);
    Api.login(loginForm.email, loginForm.password)
      .then(() => {
        setLoading(false);
        props.close();
        props.setAuth(true);
      })
      .catch(e => {
        setLoading(false);
        showSnackbarMessage("Error logging in");
      });
  };
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.close}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Login</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <form className={classes.form}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              className={classes.formContent}
              value={loginForm.email}
              onChange={e =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={loginForm.password}
              className={classes.formContent}
              onChange={e =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
            />
            <Button
              onClick={submitLogin}
              type="submit"
              className={classes.formContent}
            >
              Login
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
