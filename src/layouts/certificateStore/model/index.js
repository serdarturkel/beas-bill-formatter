import { format } from "date-fns";

const CertificateModel = {
    cols: [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Project Id',
            selector: row => row.projectId,
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
        title: "Create Certificate Store",
        content: "Please enter the information you want",
    },
    editDialogOpts: {
        submitButtonText: "Edit",
        cancelButtonText: "Cancel",
        title: "Edit Certificate Store",
        content: "Please enter the information you want",
    },
    viewDialogOpts: {
        submitButtonText: "OK",
        cancelButtonText: "Cancel",
        title: "View Certificate Store",
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
export default CertificateModel;