
import { Autocomplete, Grid, TextField } from "@mui/material";
import { getData } from 'api/api';
import { useEffect, useRef, useState } from "react";
const CreateBody = (item) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const fetchData = async () => {
        setLoading(true);
        const result = await getData('/project/read');
        if (Array.isArray(result.content)) {
            setData(result.content);
        } else {
            console.error("Data is not an array");
        }
        setLoading(false);
    };
    const selectItem = (event, data) => {
        setSelectedItem(data);
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                />

            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    margin="dense"
                    id="keyStorePassword"
                    name="keyStorePassword"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <Autocomplete
                        disablePortal
                        options={Array.isArray(data) ? data : []}
                        getOptionLabel={(dt) => dt.name ? dt.name : ''}
                        renderInput={(params) => <TextField {...params} label="Select a project" />}
                        onChange={(event, value) => selectItem(event, value)}
                    />
                )}
                <TextField
                    margin="dense"
                    name="projectId"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={selectedItem?.id || ''}
                />
            </Grid>
        </Grid>
    );
}

export default CreateBody;

