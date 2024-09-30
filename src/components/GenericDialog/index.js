import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import React, { useState } from "react";
import styled from "styled-components";

const ProjectDialog = React.forwardRef((props, ref) => {
  const { submitAction, body } = props;
  const [item, setItem] = useState(null);
  const [dialog, show] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    submitButtonText: "Submit",
    cancelButtonText: "Cancel",
    title: "Project Dialog",
    content: "Project Dialog Content",
  });

  React.useImperativeHandle(ref, () => ({
    showDialog(opts, item) {
      options(opts, item).then(show(true));
    },
    closeDialog: close,
  }));




  const close = () => show(false);


  const options = async (opts, item) => {
    return new Promise((resolve) => {
      setItem(item);
      setDialogOptions(opts);
      resolve();
    });
  };


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return (

    <React.Fragment>
      <Dialog
        open={dialog}
        onClose={close}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            submitAction(formJson);
            close();
          },
        }}
      >
        <DialogTitle>{dialogOptions.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogOptions.content}
          </DialogContentText>
          {body(item)}
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>{dialogOptions.cancelButtonText}</Button>
          <Button type="submit">{dialogOptions.submitButtonText}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
});

export default ProjectDialog;

