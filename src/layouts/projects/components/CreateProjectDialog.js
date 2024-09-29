import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

const CreateProjectDialog = React.forwardRef((props, ref) => {
  const { submitAction } = props;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const [dialog, setDialog] = useState(false);
  const showDialog = () => setDialog(true);
  const closeDialog = () => setDialog(false);

  React.useImperativeHandle(ref, () => ({
    showDialog: showDialog,
    closeDialog: closeDialog,
  }));

  return (

    <React.Fragment>
      <Dialog
        open={dialog}
        onClose={closeDialog}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            submitAction(formJson);
            closeDialog();
          },
        }}
      >
        <DialogTitle>*Create a new project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the project details
          </DialogContentText>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>

              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="projectName"
                label="Project Name"
                type="text"
                fullWidth
                variant="standard"
              />

            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="description"
                name="projectDescription"
                label="Project Description"
                type="text"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="projectImage"
                name="projectImage"
                label="Project Image URL"
                type="text"
                fullWidth
                variant="standard"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
});

export default CreateProjectDialog;

