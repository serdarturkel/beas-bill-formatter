import { Icon, Switch } from "@mui/material";
import { format } from "date-fns";


const InvoiceTemplateModel = {
    cols: [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Template Name',
            selector: row => row.templateName,
            sortable: true,
        },
        {
            name: 'Version',
            selector: row => row.version,
            sortable: true,
        },
        {
            name: 'XML File Version',
            selector: row => row.xmlFileVersion,
            sortable: true,
        },
        {
            name: 'XSL File Version',
            selector: row => row.xslFileVersion,
            sortable: true,
        },
        {
            name: 'Uploaded',
            selector: row => <Icon fontSize="medium" color="dark">{row.uploaded?'attach_file':'none'}</Icon>,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => <Icon fontSize="medium" color={row.status=='ACTIVE'?'success':'primary'}>circle</Icon>,
            sortable: true,
        },
        {
            name: 'Created By',
            selector: row => row.createdBy,
            sortable: true,
        },
        {
            name: 'Created Date',
            selector: row => format(new Date(row.createdDate), 'dd/MM/yyyy HH:mm'),
            sortable: true,
        },
        {
            name: 'Last Modified By',
            selector: row => row.lastModifiedBy,
            sortable: true,
        },
        {
            name: 'Last Modified Date',
            selector: row => format(new Date(row.lastModifiedDate), 'dd/MM/yyyy HH:mm'),
            sortable: true,
        },
    ],
    createDialogOpts: {
        submitButtonText: "Create",
        cancelButtonText: "Cancel",
        title: "Invoice Template",
        content: "Please enter the information you want",
    },
    editDialogOpts: {
        submitButtonText: "Edit",
        cancelButtonText: "Cancel",
        title: "Edit Invoice Template",
        content: "Please enter the information you want",
    },
    viewDialogOpts: {
        submitButtonText: "OK",
        cancelButtonText: "Cancel",
        title: "View Invoice Template",
        content: "Certificate details in below",
    },
    WARNING: {
        color: "warning",
        icon: "warning",
        title: "",
        content: "",
        info: "",
    },
    ERROR: {
        color: "error",
        icon: "error",
        title: "",
        content: "",
        info: "",
    },
    SUCCESS: {
        color: "success",
        icon: "success",
        title: "",
        content: "",
        info: "",
    },
    async message(type, title, content, info) {
        return new Promise((resolve) => {
            type.title = title;
            type.content = content;
            type.info = info;
            resolve(type);
        });
    },

};
export default InvoiceTemplateModel;