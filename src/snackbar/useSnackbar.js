import { useContext } from "react";
import { SnackbarContext } from "./SnackbarProvider";

export function useSnackbar() {
  const { showSnackbar } = useContext(SnackbarContext);
  return {
    showSnackbarMessage: showSnackbar
  };
}
