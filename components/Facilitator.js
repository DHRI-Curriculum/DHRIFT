import React, {useState} from "react";
import ReactDOM from "react-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";

export default function Facilitator({ name, bio, open, handleClose }) {
  console.log("Facilitator component rendered")
  console.log(bio)
  const handleCloseDialog = () => {
    handleClose(false);
  };
  return (
    <div>
      {console.log("Facilitator", name, open, handleClose)}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Facilitator</DialogTitle>
        <DialogContent>
          <Typography>Name: {name}</Typography>
        </DialogContent>
        <DialogContent>
          <Typography>Bio: {bio}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Profile Page</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}