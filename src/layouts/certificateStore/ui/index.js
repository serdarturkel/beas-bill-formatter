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
import GenericDialog from "components/GenericDialog";
import { postData, deleteData } from "api/api";
import Notification from "components/Notification";
import DataModel from "../model";
import createBody from "./components/CreateDialogBody";
function CertificateStorePage() {

  const createDialogRef = useRef();


  const notificationElement = useRef();
  const confirm = useConfirm();

  const create = () => {
    if (createDialogRef.current) {
      createDialogRef.current.showDialog(DataModel.createDialogOpts);
    }
  };

  const createSubmitAction = (formJson) => {
    const createMethod = postData("/certificate-store/create", {
      "name": formJson.name,
      "keyStorePassword": formJson.keyStorePassword,
      "projectId": formJson.projectId
    }).then((obj) => {
      DataModel
        .message(DataModel.SUCCESS, "Create Request", "Create request is completed.", Date.now)
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
          deleteData("/certificate-store/delete/" + item.id);
          resolve();
        })
        .then(() => {
          DataModel
            .message(DataModel.SUCCESS, "Delete Request", "Delete request is completed!", Date.now)
            .then((opts) => showSnack(opts));
        })
        .catch((e) => {
          console.error(e);
        });
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


  return (
    <MDBox>
      <MDBox>
        <Notification ref={notificationElement} />
        <GenericDialog ref={createDialogRef} prop submitAction={createSubmitAction} body={createBody} />
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDButton variant="outlined" color={"dark"} circular onClick={create}>
            <Icon sx={{ fontWeight: "bold" }}>{"add"}</Icon>
            <span>New Certificate Store</span>
          </MDButton>
        </MDBox>
      </MDBox>
      <MDBox>
        <Card>
          <DataTableWithPagination
            cols={DataModel.cols}
            handleDelete={handleDelete}
            fetchUrl={"/certificate-store/read"}
            searchKey={"name"}
          />
        </Card>
      </MDBox>
    </MDBox>
  );
}

export default CertificateStorePage;
