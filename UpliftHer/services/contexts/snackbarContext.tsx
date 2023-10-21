import { createContext, useContext } from "react";
import { Snack } from "../../components/CustomSnackbar";

export type SnackDefaultValue = {
    snack: Snack;
    setSnack: (snack: Snack) => void;
};


export const SnackbarContext = createContext<SnackDefaultValue>({ snack: { open: false }, setSnack: () => { } });
export const useSnackbarContext = () => useContext(SnackbarContext)