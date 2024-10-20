
import { Autocomplete, Grid, TextField } from "@mui/material";
import { getData } from 'api/api';
import { useEffect, useRef, useState } from "react";
const CreateBody = (item) => {

    const [templateLoading, setTemplateLoading] = useState(true);
    const [templateData, setTemplateData] = useState([]);
    const [template, setTemplate] = useState(null);

    const [certificateLoading, setCertificateLoading] = useState(true);
    const [certificateData, setCertificateData] = useState([]);
    const [certificate, setCertificate] = useState(null);
    const fetchTemplateData = async () => {
        setTemplateLoading(true);
        const result = await getData('/invoiceTemplate/read');
        if (Array.isArray(result.content)) {
            setTemplateData(result.content);
        } else {
            console.error("Data is not an array");
        }
        setTemplateLoading(false);
    };
    const selectTemplate = (event, data) => {
        setTemplate(data);
    };

    const fetchCertificateData = async () => {
        setCertificateLoading(true);
        const result = await getData('/certificate/read');
        if (Array.isArray(result.content)) {
            setCertificateData(result.content);
        } else {
            console.error("Data is not an array");
        }
        setCertificateLoading(false);
    };
    const selectCertificate = (event, data) => {
        setCertificate(data);
    };
    
    useEffect(() => {
        fetchTemplateData();
        fetchCertificateData();
    }, []);

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            
            <Grid item xs={12}>
                {templateLoading ? (
                    <p>Loading...</p>
                ) : (
                    <Autocomplete
                        disablePortal
                        options={Array.isArray(templateData) ? templateData : []}
                        getOptionLabel={(dt) => dt.templateName ? dt.templateName : ''}
                        renderInput={(params) => <TextField {...params} label="Select a template" />}
                        onChange={(event, value) => selectTemplate(event, value)}
                    />
                )}
                <TextField
                    required
                    margin="dense"
                    id="templateId"
                    name="templateId"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={template?.id}
                    defaultValue={template?.id}
                />
                {certificateLoading ? (
                    <p>Loading...</p>
                ) : (
                    <Autocomplete
                        disablePortal
                        options={Array.isArray(certificateData) ? certificateData : []}
                        getOptionLabel={(dt) => dt.commonName ? dt.commonName : ''}
                        renderInput={(params) => <TextField {...params} label="Select a certificate" />}
                        onChange={(event, value) => selectCertificate(event, value)}
                    />
                )}
                <TextField
                    required
                    margin="dense"
                    id="certificateId"
                    name="certificateId"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={certificate?.id}
                    defaultValue={certificate?.id}
                />
            </Grid>
        </Grid>
    );
}

export default CreateBody;

