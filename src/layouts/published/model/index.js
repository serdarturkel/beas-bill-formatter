import { format } from "date-fns";

const PublishedCertificateModel = {
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
            name: 'Template Id',
            selector: row => row.templateId,
            sortable: true,
        },
        {
            name: 'HTML',
            selector: row => row.html,
            sortable: true,
        },
        {
            name: 'Version',
            selector: row => row.version,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Certificate Id',
            selector: row => row.certificateId,
            sortable: true,
        },
        {
            name: 'File Name',
            selector: row => row.fileName,
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
        title: "Publish Certificate",
        content: "Please enter the information you want",
    },
    editDialogOpts: {
        submitButtonText: "Edit",
        cancelButtonText: "Cancel",
        title: "Edit Published Certificate",
        content: "Please enter the information you want",
    },
    viewDialogOpts: {
        submitButtonText: "OK",
        cancelButtonText: "Cancel",
        title: "View Published Certificate",
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
export default PublishedCertificateModel;