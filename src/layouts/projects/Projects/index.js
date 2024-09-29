import React, { useRef, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Data
import MDButton from "components/MDButton";
import { useConfirm } from "material-ui-confirm";
import { format } from "date-fns";
import DataTableWithPagination from "components/DataTable/DataTableWithPagination";
import CreateProjectDialog from "../components/CreateProjectDialog";
import { postData as saveProject, deleteData as deleteProject, patchData as updateProject } from "api/api";
function Projects() {

  const createProjectDialog = useRef();

  const createNewProject = () => {
    if (createProjectDialog.current) {
      createProjectDialog.current.showDialog();
    }
  };

  const submitAction = (formJson) => {
    const name = formJson.projectName;
    const description = formJson.projectDescription;
    const imageUrl = formJson.projectImage;
    const createdProject = saveProject("/project/create", {
      "name": name,
      "description": description,
      "image": imageUrl
    });
  };

  const cols = [
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
      name: 'Description',
      selector: row => row.description,
      sortable: true,
    },
    {
      name: 'Image',
      selector: row => row.image,
      sortable: true,
    },
    {
      name: 'Created By',
      selector: row => row.createdBy,
      sortable: true,
    },
    {
      name: 'Created Date',
      selector: row => format(new Date(row.createdDate), 'dd/MM/yyyy'),
      sortable: true,
    },
    {
      name: 'Last Modified By',
      selector: row => row.lastModifiedBy,
      sortable: true,
    },
    {
      name: 'Last Modified Date',
      selector: row => format(new Date(row.lastModifiedDate), 'dd/MM/yyyy'),
      sortable: true,

    },
  ];


  const confirm = useConfirm();

  function doError(item) {
    console.log("Error logged");
  }

  // Silme işlemi
  const handleDelete = async (item) => {
    return new Promise((resolve) => {
      confirm({ description: `This will permanently delete ${item.id}.` })
        .then(() => { deleteProject("/project/delete/" + item.id); resolve();})
        .catch(() => doError(item));
    });
  };

  // Düzenleme işlemi
  const handleEdit = async (item) => {
    console.log(`Edit item with id: ${item.id}`);
    // Düzenleme için ilgili modal açılabilir veya yeni bir form gösterilebilir
  };

  return (
    <Card>
      <CreateProjectDialog ref={createProjectDialog} submitAction={submitAction} />
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDButton variant="outlined" color={"dark"} circular onClick={createNewProject}>
          <Icon sx={{ fontWeight: "bold" }}>{"add"}</Icon>
          <span>New Project</span>
        </MDButton>
      </MDBox>
      <DataTableWithPagination
        cols={cols}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        fetchUrl={"/project/read"}
      />
    </Card>
  );
}

export default Projects;
