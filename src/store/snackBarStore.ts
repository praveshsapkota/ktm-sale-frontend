import create from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
    isOpen: false,
    message: "",
    severity: "",
}

type state = {
    isOpen: boolean,
    message: string,
    severity: string,
}

type SnackBarStoreType = {
    snackBarState: state;
    toogleSnackBar: (SnackBarState: string, message: string, severity: string) => any;
}

export const snackBarStore = create<SnackBarStoreType>(
    devtools((set) => ({
        snackBarState: initialState,
        toogleSnackBar: (SnackBarState: string, message: string, severity: string) => {
            switch (SnackBarState) {
                case "OPEN":
                    return set({
                        snackBarState: {
                            isOpen: true,
                            message: message,
                            severity: severity
                        }
                    });
                case "CLOSE":
                    return set({
                        snackBarState: {
                            isOpen: false,
                            message: "",
                            severity: ""
                        }
                    });
                default:
                    return initialState;
            }
        },
    }))
)