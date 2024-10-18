
import { Autocomplete, Grid, TextField } from "@mui/material";
import { getData } from 'api/api';
import { useEffect, useRef, useState } from "react";
const CreateBody = (item) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedKeystore, setSelectedKeystore] = useState(null);
    const fetchData = async () => {
        setLoading(true);
        const result = await getData('/certificate-store/read');
        if (Array.isArray(result.content)) {
            setData(result.content);
        } else {
            console.error("Data is not an array");
        }
        setLoading(false);
    };
    const keystoreSelected = (event, data) => {
        setSelectedKeystore(data);
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
                    id="commonName"
                    name="commonName"
                    label="Common Name"
                    type="text"
                    fullWidth
                    variant="standard"
                />

            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    margin="dense"
                    id="organization"
                    name="organization"
                    label="Organization"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    margin="dense"
                    id="organizationalUnit"
                    name="organizationalUnit"
                    label="Organizational Unit"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    margin="dense"
                    id="country"
                    name="country"
                    label="Country"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    margin="dense"
                    id="locality"
                    name="locality"
                    label="Locality"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    margin="dense"
                    id="validityDays"
                    name="validityDays"
                    label="Validity Days"
                    type="number"
                    fullWidth
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    margin="dense"
                    id="alias"
                    name="alias"
                    label="Alias"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    margin="dense"
                    id="password"
                    name="password"
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
                        renderInput={(params) => <TextField {...params} label="Select a keystore" />}
                        onChange={(event, value) => keystoreSelected(event, value)}
                    />
                )}
                <TextField
                    required
                    margin="dense"
                    id="certificateStoreId"
                    name="certificateStoreId"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={selectedKeystore?.id}
                    defaultValue={selectedKeystore?.id}
                />
            </Grid>
        </Grid>
    );
}

export default CreateBody;

