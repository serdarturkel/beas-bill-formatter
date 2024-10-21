import { Autocomplete, Button, Grid, Icon, Switch, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getData } from 'api/api';
import { Label } from "@mui/icons-material";
import { patchData } from "api/api";
import MDSnackbarOptions from "components/MDSnackbar/options";
import Notification from "components/Notification";

const ViewBody = (item) => {
    const [status, setStatus] = useState(false);
    const statusRef = useRef();
    const notificationElement = useRef();
    const statusChange = (event) => {
        const checkedValue = event.target.checked;
        setStatus(checkedValue);
        const newStatus = checkedValue ? 'ACTIVE' : 'DRAFT';
        statusUpdate(newStatus);
    };
    const statusUpdate = async (newStatus) => {
        patchData("/publishedInvoiceTemplate/update", {
            "id": item?.id,
            "status": newStatus,
        }).then((obj) => {
            MDSnackbarOptions
                .message(MDSnackbarOptions.SUCCESS, "Update Request", "Update request is completed.", Date.now)
                .then((o) => {
                    showSnack(o);
                });
        }).catch((e) => {
            console.error(e);
        });
    };
    const showSnack = async (opts) => {
        new Promise((resolve) => {
            if (notificationElement.current) {
                notificationElement.current.show(opts);
                resolve(opts);
            }
        });
    };
    useEffect(() => {
        if (item?.status === "ACTIVE") {
            setStatus(true);
        } else {
            setStatus(false);
        }
    }, [item?.status]);

    const handleExport = (htmlWithCss) => {
        const blob = new Blob([htmlWithCss], { type: "text/html" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "item.html";
        link.click();
    };

    return (
        <div>
            <Notification ref={notificationElement} />
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ fontSize: "9pt" }}>
                <Grid item xs={3} style={{ textAlign: "right" }} >
                    <span>Id :</span>
                </Grid>
                <Grid item xs={9} style={{ textAlign: "left" }}>
                    <span>{item?.id}</span>
                </Grid>
                <Grid item xs={3} style={{ textAlign: "right" }} >
                    <span>Template Id :</span>
                </Grid>
                <Grid item xs={9} style={{ textAlign: "left" }}>
                    <span>{item?.templateId}</span>
                </Grid>
                <Grid item xs={3} style={{ textAlign: "right" }} >
                    <span>Template Name :</span>
                </Grid>
                <Grid item xs={9} style={{ textAlign: "left" }}>
                    <span>{item?.templateName}</span>
                </Grid>
                <Grid item xs={3} style={{ textAlign: "right" }} >
                    <span>Html :</span>
                </Grid>
                <Grid item xs={9} style={{ textAlign: "left" }}>
                    <Button className='primary' onClick={()=>handleExport(item?.html)}>
                        <Icon fontSize="small" color="inherit">
                            download
                        </Icon>
                        Export
                    </Button>
                </Grid>
                <Grid item xs={3} style={{ textAlign: "right" }} >
                    <span>Version :</span>
                </Grid>
                <Grid item xs={9} style={{ textAlign: "left" }}>
                    <span>{item?.version}</span>
                </Grid>
                <Grid item xs={3} style={{ textAlign: "right" }} >
                    <span>Status :</span>
                </Grid>
                <Grid item xs={9} style={{ textAlign: "left" }}>
                    <Switch ref={statusRef} fontSize="medium" checked={status} onChange={statusChange} />
                </Grid>
                <Grid item xs={3} style={{ textAlign: "right" }} >
                    <span>Certificate Id :</span>
                </Grid>
                <Grid item xs={9} style={{ textAlign: "left" }}>
                    <span>{item?.certificateId}</span>
                </Grid>
            </Grid>
        </div>
    );
};

export default ViewBody;

