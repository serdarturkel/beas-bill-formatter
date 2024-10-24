import { Autocomplete, Grid, Icon, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getData } from 'api/api';
import { Label } from "@mui/icons-material";
import { BASE_PATH } from "api/api";
import MDButton from "components/MDButton";

const ViewBody = (item) => {
    const downloadPem = () => {
        if (item?.id) {
            window.open(BASE_PATH + '/pdfSigner/download/pem/' +encodeURIComponent(item?.id), "_blank");
        }
    };

    const downloadCert = () => {
        if (item?.id) {
            window.open(BASE_PATH + '/pdfSigner/download/cert/' + encodeURIComponent(item?.id), "_blank");
        }
    };
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ fontSize: "9pt" }}>
            <Grid item xs={3} style={{ textAlign: "right" }} >
                <span>ID :</span>
            </Grid>
            <Grid item xs={9} style={{ textAlign: "left" }}>
                <span>{item?.id}</span>
            </Grid>
            <Grid item xs={3} style={{ textAlign: "right" }} >
                <span>Common Name :</span>
            </Grid>
            <Grid item xs={9} style={{ textAlign: "left" }}>
                <span>{item?.commonName}</span>
            </Grid>
            <Grid item xs={3} style={{ textAlign: "right" }} >
                <span>Organization :</span>
            </Grid>
            <Grid item xs={9} style={{ textAlign: "left" }}>
                <span>{item?.organization}</span>
            </Grid>
            <Grid item xs={3} style={{ textAlign: "right" }} >
                <span>Organizational Unit :</span>
            </Grid>
            <Grid item xs={9} style={{ textAlign: "left" }}>
                <span>{item?.organizationalUnit}</span>
            </Grid>
            <Grid item xs={3} style={{ textAlign: "right" }} >
                <span>Country :</span>
            </Grid>
            <Grid item xs={9} style={{ textAlign: "left" }}>
                <span>{item?.country}</span>
            </Grid>
            <Grid item xs={3} style={{ textAlign: "right" }} >
                <span>Locality :</span>
            </Grid>
            <Grid item xs={9} style={{ textAlign: "left" }}>
                <span>{item?.locality}</span>
            </Grid>
            <Grid item xs={3} style={{ textAlign: "right" }} >
                <span>Validity Days :</span>
            </Grid>
            <Grid item xs={9} style={{ textAlign: "left" }}>
                <span>{item?.validityDays}</span>
            </Grid>
            <Grid item xs={3} style={{ textAlign: "right" }} >
                <span>Alias :</span>
            </Grid>
            <Grid item xs={9} style={{ textAlign: "left" }}>
                <span>{item?.alias}</span>
            </Grid>
            <Grid item xs={3} style={{ textAlign: "right" }} >
                <span>Password :</span>
            </Grid>
            <Grid item xs={9} style={{ textAlign: "left" }}>
                <span>********</span>
            </Grid>
            <Grid item xs={3} style={{ textAlign: "right" }} >
                <span>Certificate Store ID :</span>
            </Grid>
            <Grid item xs={9} style={{ textAlign: "left" }}>
                <span>{item?.certificateStoreId}</span>
            </Grid>
            <Grid item xs={3} style={{ textAlign: "right" }} >
                <MDButton variant="outlined" color="info" size="small" onClick={downloadPem}>
                    <Icon>download</Icon> .PEM File
                </MDButton>
            </Grid>
            <Grid item xs={9} style={{ textAlign: "left" }}>
                <MDButton variant="outlined" color="info" size="small" onClick={downloadCert}>
                    <Icon>download</Icon> .CRT File
                </MDButton>
            </Grid>
        </Grid>
    );
};

export default ViewBody;

