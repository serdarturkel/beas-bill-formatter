import React, { useRef, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Data
import MDButton from "components/MDButton";
import { useConfirm } from "material-ui-confirm";
import DataTableWithPagination from "components/DataTable";
import ProjectDialog from "components/GenericDialog";
import { postData as saveProject, deleteData as deleteProject, patchData as updateProject } from "api/api";
import Notification from "components/Notification";
import ProjectModel from "../model";
import createProjectBody from "./components/CreateProjectDialogBody";
import editProjectBody from "./components/EditProjectDialogBody";
function Projects() {

  const createProjectDialogRef = useRef();
  const editProjectDialogRef = useRef();

  const notifi = useRef();
  const confirm = useConfirm();

  const createNewProject = () => {
    if (createProjectDialogRef.current) {
      createProjectDialogRef.current.showDialog(ProjectModel.createDialogOpts);
    }
  };

  const createProjectSubmitAction = (formJson) => {
    const createdProject = saveProject("/project/create", {
      "name": formJson.name,
      "description": formJson.description,
      "image": formJson.image
    }).then((obj) => {
      ProjectModel
        .message(ProjectModel.SUCCESS, "Create Request", "Create request is completed.", Date.now)
        .then((o) => {
          showSnack(o);
        });
    }).catch((e) => {
      console.error(e);
    });
  };

  const editProjectSubmitAction = (formJson) => {
    const createdProject = updateProject("/project/update", {
      "id": formJson.id,
      "name": formJson.name,
      "description": formJson.description,
      "image": formJson.image
    }).then((obj) => {
      ProjectModel
        .message(ProjectModel.SUCCESS, "Edit Request", "Edit request is completed.", Date.now)
        .then((o) => {
          showSnack(o);
        });
    }).catch((e) => {
      console.error(e);
    });
  };

  const handleDelete = async (item) => {
    return new Promise((resolve) => {
      confirm({ description: `This will permanently delete ${item.id}.` })
        .then(() => {
          deleteProject("/project/delete/" + item.id);
          resolve();
        })
        .then(() => {
          ProjectModel
            .message(ProjectModel.SUCCESS, "Delete Request", "Delete request is completed!", Date.now)
            .then((opts) => showSnack(opts));
        })
        .catch((e) => {
          console.error(e);
        });
    });
  };

  const handleEdit = async (item) => {

    if (editProjectDialogRef.current) {
      editProjectDialogRef.current.showDialog(ProjectModel.editDialogOpts, item);
    }
  };

  const showSnack = async (opts) => {
    new Promise((resolve) => {
      if (notifi.current) {
        notifi.current.show(opts);
        resolve(opts);
      }
    });
  };


  return (
    <MDBox>
      <MDBox>
        <Notification ref={notifi} />
        <ProjectDialog ref={createProjectDialogRef} prop submitAction={createProjectSubmitAction} body={createProjectBody} />
        <ProjectDialog ref={editProjectDialogRef} prop submitAction={editProjectSubmitAction} body={editProjectBody} />
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDButton variant="outlined" color={"dark"} circular onClick={createNewProject}>
            <Icon sx={{ fontWeight: "bold" }}>{"add"}</Icon>
            <span>New Project</span>
          </MDButton>
        </MDBox>
      </MDBox>
      <MDBox>
        <Card>
          <DataTableWithPagination
            cols={ProjectModel.cols}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            fetchUrl={"/project/read"}
            searchKey={"name"}
          />
        </Card>
      </MDBox>
    </MDBox>
  );
}

export default Projects;
