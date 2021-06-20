import CircularProgress from "@material-ui/core/CircularProgress";
import { useEffect, useState, useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import TopAppBar from "./components/TopAppBar";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import { SnackbarProvider } from "./snackbar/SnackbarProvider";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Api from "./api/Api";

const style = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100vh"
  },
  loadingScreen: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

function App() {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState({ isAuth: false, profile: {} });
  const setAuth = auth =>
    setUser(prevState => {
      if (auth) return { ...prevState, isAuth: auth };
      else return { profile: {}, isAuth: false };
    });
  const [colorScheme, setColorScheme] = useState(
    () => localStorage.getItem("colorScheme") || "light"
  );
  const toggleDarkMode = () => {
    if (colorScheme === "light") {
      setColorScheme("dark");
    } else {
      setColorScheme("light");
    }
  };
  useEffect(() => localStorage.setItem("colorScheme", colorScheme), [
    colorScheme
  ]);
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: colorScheme
        }
      }),
    [colorScheme]
  );
  const classes = makeStyles(style(theme))();
  const loadUserProfile = () => {
    return Api.getUserProfile()
      .then(resp => {
        setUser({ isAuth: true, profile: Api.getResponseObj(resp) });
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          setUser({ isAuth: false, profile: {} });
        } else {
          window.alert(error.toString());
        }
      });
  };
  useEffect(() => {
    loadUserProfile().finally(() => setLoading(false));
  }, [user.isAuth]);
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        {isLoading ? (
          <Box className={classes.loadingScreen}>
            <CircularProgress size={100} thickness={3} />
          </Box>
        ) : (
          <div className={classes.root}>
            <TopAppBar
              profile={user.profile}
              toggleDarkMode={toggleDarkMode}
              setAuth={setAuth}
              isAuth={user.isAuth}
            ></TopAppBar>
            <Router>
              <Switch>
                <ProtectedRoute exact path="/" user={user}>
                  <Home
                    notes={user.profile.notes}
                    loadUserProfile={loadUserProfile}
                  />
                </ProtectedRoute>
                <Route exact path="/login">
                  <Welcome user={user} setAuth={setAuth} />
                </Route>
              </Switch>
            </Router>
          </div>
        )}
      </SnackbarProvider>
    </ThemeProvider>
  );
}

const ProtectedRoute = ({ user, children, ...rest }) => {
  return user && user.isAuth ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Redirect to="/login" />
  );
};

export default App;
