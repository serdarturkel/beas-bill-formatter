import React, { useRef } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Data
import MDButton from "components/MDButton";
import { useConfirm } from "material-ui-confirm";
import DataTableWithPagination from "components/DataTable";
import { deleteData } from "api/api";
import Notification from "components/Notification";
import DataModel from "../model";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function InvoiceTemplatePage() {

  const notificationElement = useRef();
  const confirm = useConfirm();
  const navigate = useNavigate();

  const showSnack = async (opts) => {
    new Promise((resolve) => {
      if (notificationElement.current) {
        notificationElement.current.show(opts);
        resolve(opts);
      }
    });
  };

  const handleDelete = async (item) => {
    return new Promise((resolve) => {
      confirm({ description: `This will permanently delete ${item.id}.` })
        .then(() => {
          deleteData("/invoiceTemplate/delete/" + item.id);
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
    console.log("TODO: it will redirect to a4 page");
  };

  const handleCreate = async (item) => {
    console.log("TODO: it will redirect to a4 page");
    navigate('/newTemplate/' + uuidv4());
  };


  return (
    <MDBox>
      <MDBox>
        <Notification ref={notificationElement} />
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDButton variant="outlined" color={"dark"} circular onClick={handleCreate}>
            <Icon sx={{ fontWeight: "bold" }}>{"add"}</Icon>
            <span>Create Template</span>
          </MDButton>
        </MDBox>
      </MDBox>
      <MDBox>
        <Card>
          <DataTableWithPagination
            cols={DataModel.cols}
            handleDelete={handleDelete}
            fetchUrl={"/invoiceTemplate/read"}
            handleView={handleView}
            searchKey={"templateName"}
          />
        </Card>
      </MDBox>
    </MDBox>
  );
}

export default InvoiceTemplatePage;

