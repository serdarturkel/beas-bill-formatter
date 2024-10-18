import { Autocomplete, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getData } from 'api/api';
import { Label } from "@mui/icons-material";

const ViewBody = (item) => {
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{fontSize:"9pt"}}>
            <Grid item xs={3} style={{textAlign:"right"}} >
                <span>Common Name :</span>
            </Grid>
            <Grid item xs={9} style={{textAlign:"left"}}>
                <span>{item?.commonName}</span>
            </Grid>
            <Grid item xs={3} style={{textAlign:"right"}} >
                <span>Organization :</span>
            </Grid>
            <Grid item xs={9} style={{textAlign:"left"}}>
                <span>{item?.organization}</span>
            </Grid>
            <Grid item xs={3} style={{textAlign:"right"}} >
                <span>Organizational Unit :</span>
            </Grid>
            <Grid item xs={9} style={{textAlign:"left"}}>
                <span>{item?.organizationalUnit}</span>
            </Grid>
            <Grid item xs={3} style={{textAlign:"right"}} >
                <span>Country :</span>
            </Grid>
            <Grid item xs={9} style={{textAlign:"left"}}>
                <span>{item?.country}</span>
            </Grid>
            <Grid item xs={3} style={{textAlign:"right"}} >
                <span>Locality :</span>
            </Grid>
            <Grid item xs={9} style={{textAlign:"left"}}>
                <span>{item?.locality}</span>
            </Grid>
            <Grid item xs={3} style={{textAlign:"right"}} >
                <span>Validity Days :</span>
            </Grid>
            <Grid item xs={9} style={{textAlign:"left"}}>
                <span>{item?.validityDays}</span>
            </Grid>
            <Grid item xs={3} style={{textAlign:"right"}} >
                <span>Alias :</span>
            </Grid>
            <Grid item xs={9} style={{textAlign:"left"}}>
                <span>{item?.alias}</span>
            </Grid>
            <Grid item xs={3} style={{textAlign:"right"}} >
                <span>Password :</span>
            </Grid>
            <Grid item xs={9} style={{textAlign:"left"}}>
                <span>********</span>
            </Grid>
            <Grid item xs={3} style={{textAlign:"right"}} >
                <span>Certificate Store ID :</span>
            </Grid>
            <Grid item xs={9} style={{textAlign:"left"}}>
                <span>{item?.certificateStoreId}</span>
            </Grid>
        </Grid>
    );
};

export default ViewBody;

