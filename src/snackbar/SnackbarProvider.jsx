import { useState, createContext } from "react";
import { Snackbar, SnackbarContent } from "@material-ui/core";

export const SnackbarContext = createContext();

export function SnackbarProvider({ children }) {
  const [snackbars, setSnackbars] = useState([]);

  const showSnackbar = message => setSnackbars([...snackbars, message]);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbars.map((message, i) => (
        <Snackbar
          key={i}
          autoHideDuration={3000}
          open={Boolean(message)}
          onClose={() =>
            setSnackbars([
              ...snackbars.slice(0, i),
              "",
              ...snackbars.slice(i + 1)
            ])
          }
        >
          <SnackbarContent message={message} />
        </Snackbar>
      ))}
    </SnackbarContext.Provider>
  );
}
