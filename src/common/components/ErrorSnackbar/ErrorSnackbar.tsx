import React from "react"
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectAppError } from "app/appSelectors"
import { setAppErrorAC } from "app/app-reducer"

export const ErrorSnackbar = () => {
  const error = useAppSelector(selectAppError)
  const dispatch = useAppDispatch()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return
    }

    dispatch(setAppErrorAC(null))
  }

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
