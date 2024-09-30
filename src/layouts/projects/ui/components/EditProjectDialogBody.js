import { Grid, TextField } from "@mui/material";
import { useState } from "react";


const EditProjectBody = (item) => {
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="id"
                    name="id"
                    label="Project ID"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={item?.id}
                />

            </Grid>
            <Grid item xs={12}>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="name"
                    label="Project Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    defaultValue={item?.name}
                />

            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    margin="dense"
                    id="description"
                    name="description"
                    label="Project Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    defaultValue={item?.description}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    margin="dense"
                    id="image"
                    name="image"
                    label="Project Image URL"
                    type="text"
                    fullWidth
                    variant="standard"
                    defaultValue={item?.image}
                />
            </Grid>
        </Grid>
    );
};

export default EditProjectBody;

