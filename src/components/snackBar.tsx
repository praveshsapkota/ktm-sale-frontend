import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";
import { snackBarStore } from "../store/snackBarStore";

export const SnackbarComponent = () => {
    const snackBarState = snackBarStore((state) => state.snackBarState);
    const snackbarClose = snackBarStore((state) => state.toogleSnackBar);
    const handleClose = () => {
        snackbarClose("CLOSE", "", "");
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const AlertDiv = () => {
        switch (snackBarState.severity) {
            case "success": {
                return (
                    <Alert
                        severity="success"
                        sx={{ width: "100%", backgroundColor: "green", color: "white" }}
                    >
                        {snackBarState.message}
                    </Alert>
                );
            }
            case "error": {
                return (
                    <Alert
                        severity="error"
                        sx={{ width: "100%", backgroundColor: "red", color: "white" }}
                    >
                        {snackBarState.message}
                    </Alert>
                );
            }
            case "info": {
                return (
                    <Alert
                        severity="info"
                        sx={{ width: "100%", backgroundColor: "#22add7", color: "black" }}
                    >
                        {snackBarState.message}
                    </Alert>
                );
            }
            case "warning": {
                return (
                    <Alert
                        severity="warning"
                        sx={{ width: "100%", backgroundColor: "#d2cc31", color: "black" }}
                    >
                        {snackBarState.message}
                    </Alert>
                );
            }
            default:
                null
                // console.log("hellow")
        }
    };

    return (
        <div>
            <Snackbar
                open={snackBarState.isOpen}
                autoHideDuration={5000}
                onClose={handleClose}
                action={action}
                color="white"
            >
                {AlertDiv()}
            </Snackbar>
        </div>
    );
};
