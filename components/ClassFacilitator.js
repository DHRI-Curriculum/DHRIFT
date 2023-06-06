import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";

export default function ClassFacilitator({ name, bio, facilitatorOpen, handleClose }) {

  useEffect(() => {
  }, [facilitatorOpen]);
  
  return (
    <div>
      <Dialog open={facilitatorOpen} onClose={handleClose}>
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