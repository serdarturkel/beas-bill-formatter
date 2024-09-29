import React from "react";

const ProjectsClient = React.forwardRef((ref) => {
    React.useImperativeHandle(ref, () => ({
        create: createAction,
        read: readAction,
        update: updateAction,
        delete: deleteAction,
    }));

    const createAction = (obj) => { };
    const readAction = (obj,parameters) => { };
    const updateAction = (obj) => { };
    const deleteAction = (obj) => { };

    return "";
});

export default ProjectsClient;