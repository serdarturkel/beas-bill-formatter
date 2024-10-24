import { Button, Grid, Icon, TextField } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

const UploadInvoiceTemplateBody = (props, ref) => {
    const [xmlFile, setXmlFile] = useState(null);
    const [xlsFile, setXlsFile] = useState(null);

    const handleXmlFileChange = (event) => {
        setXmlFile(event.target.files[0]);
    };

    const handleXlsFileChange = (event) => {
        setXlsFile(event.target.files[0]);
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
                <Button
                    className='center-in-box'
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    color='white'
                >
                    <Icon fontSize="small">
                        uploadFile
                    </Icon>
                    <span>XML File</span>
                    <VisuallyHiddenInput
                        type="file"
                        onChange={handleXmlFileChange}
                        required
                        name="xmlFile"
                        id="xmlFile"
                        accept=".xml"
                    />
                </Button>
                <br/>
                <label>{xmlFile?.name}</label>
            </Grid>
            <Grid item xs={12}>
                <Button
                    className='center-in-box'
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    color='white'
                >
                    <Icon fontSize="small">
                        uploadFile
                    </Icon>
                    <span>XLS File</span>
                    <VisuallyHiddenInput
                        type="file"
                        onChange={handleXlsFileChange}
                        required
                        name="xlsFile"
                        id="xlsFile"
                        accept=".xls"
                    />
                </Button>
                <br/>
                <label>{xlsFile?.name}</label>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    margin="dense"
                    id="templateName"
                    name="templateName"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </Grid>
        </Grid>
    );
};

export default UploadInvoiceTemplateBody;

