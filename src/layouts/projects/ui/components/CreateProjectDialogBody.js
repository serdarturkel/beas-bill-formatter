import { Grid, TextField } from "@mui/material";

const CreateProjectBody = (item) => (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
            />

        </Grid>
        <Grid item xs={12}>
            <TextField
                autoFocus
                required
                margin="dense"
                id="description"
                name="description"
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
                id="image"
                name="image"
                label="Project Image URL"
                type="text"
                fullWidth
                variant="standard"
            />
        </Grid>
    </Grid>
);

export default CreateProjectBody;

