import { Autocomplete, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getData } from 'api/api';
import { Label } from "@mui/icons-material";

const ViewBody = (item) => {
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{fontSize:"9pt"}}>
            <Grid item xs={3} style={{textAlign:"right"}} >
                <span>Template Id :</span>
            </Grid>
            <Grid item xs={9} style={{textAlign:"left"}}>
                <span>{item?.templateId}</span>
            </Grid>
            <Grid item xs={3} style={{textAlign:"right"}} >
                <span>Template Name :</span>
            </Grid>
            <Grid item xs={9} style={{textAlign:"left"}}>
                <span>{item?.templateName}</span>
            </Grid>
            <Grid item xs={3} style={{textAlign:"right"}} >
                <span>Html :</span>
            </Grid>
            <Grid item xs={9} style={{textAlign:"left"}}>
                <span>{item?.html}</span>
            </Grid>
            <Grid item xs={3} style={{textAlign:"right"}} >
                <span>Version :</span>
            </Grid>
            <Grid item xs={9} style={{textAlign:"left"}}>
                <span>{item?.version}</span>
            </Grid>
            <Grid item xs={3} style={{textAlign:"right"}} >
                <span>Status :</span>
            </Grid>
            <Grid item xs={9} style={{textAlign:"left"}}>
                <span>{item?.status}</span>
            </Grid>
            <Grid item xs={3} style={{textAlign:"right"}} >
                <span>Certificate Id :</span>
            </Grid>
            <Grid item xs={9} style={{textAlign:"left"}}>
                <span>{item?.certificateId}</span>
            </Grid>
        </Grid>
    );
};

export default ViewBody;

