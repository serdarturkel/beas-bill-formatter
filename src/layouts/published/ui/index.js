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
import { getData, deleteData } from "api/api";
import Notification from "components/Notification";
import DataModel from "../model";
import createBody from "./components/CreateDialogBody";
import viewBody from "./components/ViewDialogBody";
function PublishedInvoiceTemplatePage() {

  const createDialogRef = useRef();
  const viewDialogRef = useRef();

  const notificationElement = useRef();
  const confirm = useConfirm();

  const create = () => {
    if (createDialogRef.current) {
      createDialogRef.current.showDialog(DataModel.createDialogOpts);
    }
  };

  const createSubmitAction = (formJson) => {
    const publishTemplate = getData("/publishedInvoiceTemplate/publish/" + formJson.templateId + "/" + formJson.certificateId, {}).then((obj) => {
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
          deleteData("/publishedInvoiceTemplate/delete/" + item.id);
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

  const handleView = async (item) => {
    if (viewDialogRef.current) {
      viewDialogRef.current.showDialog(DataModel.viewDialogOpts, item);
    }
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
        <GenericDialog ref={viewDialogRef} prop body={viewBody} />
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDButton variant="outlined" color={"dark"} circular onClick={create}>
            <Icon sx={{ fontWeight: "bold" }}>{"add"}</Icon>
            <span>Publish Template</span>
          </MDButton>
        </MDBox>
      </MDBox>
      <MDBox>
        <Card>
          <DataTableWithPagination
            cols={DataModel.cols}
            handleDelete={handleDelete}
            fetchUrl={"/publishedInvoiceTemplate/read"}
            handleView={handleView}
            searchKey={"templateName"}
          />
        </Card>
      </MDBox>
    </MDBox>
  );
}

export default PublishedInvoiceTemplatePage;
