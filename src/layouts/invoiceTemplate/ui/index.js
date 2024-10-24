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
import { deleteData } from "api/api";
import Notification from "components/Notification";
import DataModel from "../model";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import InvoiceTemplateModel from "../model";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import { fileUpload } from "api/api";
import ConfirmModal from "components/Confirm";
import { BASE_PATH } from "api/api";

function InvoiceTemplatePage() {
  const notificationElement = useRef();
  const confirmModal = useRef();

  const confirm = useConfirm();
  const navigate = useNavigate();

  const [xmlFile, setXmlFile] = useState(null);
  const [xslFile, setXslFile] = useState(null);

  const handleXmlFileChange = (event) => {
    setXmlFile(event.target.files[0]);
  };

  const handleXslFileChange = (event) => {
    setXslFile(event.target.files[0]);
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

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
  const downloadFiles = (item) => {
    const file1Url = BASE_PATH + '/invoiceTemplate/download?fileName=' + encodeURIComponent(item?.xmlFileName);
    const file2Url = BASE_PATH + '/invoiceTemplate/download?fileName=' + encodeURIComponent(item?.xslFileName);


    window.open(file1Url, "_blank");
    window.open(file2Url, "_blank");
  };

  const handleView = async (item) => {
    if (item?.uploaded) {
      downloadFiles(item);
    }
    else
      navigate('/invoiceTemplate/' + item?.id + "?action=view");
  };

  const handleCreate = async (item) => {
    navigate('/invoiceTemplate/' + uuidv4() + "?action=new");
  };


  const confirmTemplateName = () => {
    confirmModal.current.show();
  }

  const uploadAction = (templateName) => {
    const formData = new FormData();
    formData.append("xmlFile", xmlFile);
    formData.append("xslFile", xslFile);

    fileUpload("/invoiceTemplate/upload?templateName=" + templateName, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }).then((obj) => {
      InvoiceTemplateModel
        .message(InvoiceTemplateModel.SUCCESS, "Create Request", "Create request is completed.", Date.now)
        .then((o) => {
          showSnack(o);
        });
    }).catch((e) => {
      console.error(e);
    });
  }

  const showUploadButton = () => {
    if (xmlFile && xslFile) {
      return (<Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        color='white'
        width="48px"
        height="48px"
        style={{ marginRight: "10px" }}
        onClick={confirmTemplateName}>

        <Icon sx={{ fontWeight: "bold" }}>{"upload"}</Icon>
        <span>Upload Template</span>
      </Button>);
    }
  }

  const showClearUploadButton = () => {
    if (xmlFile && xslFile) {
      return (<Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        color='white'
        width="48px"
        height="48px"
        style={{ marginRight: "10px" }}
        onClick={(e) => {
          setXmlFile(null);
          setXslFile(null);
        }}>
        <Icon sx={{ fontWeight: "bold" }}>{"close"}</Icon>
        <span>Clear Selections</span>
      </Button>);
    }
  }
  const selectFileButton = (name, id, file, accepts, handleMethod) => {

    return (<Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      color='white'
      width="48px"
      height="48px"
      style={{ marginRight: "10px" }}
    >
      <Icon fontSize="small">
        attach_file
      </Icon>
      <span>{file?.name ? file?.name : (name === 'xmlFile' ? 'XML' : 'XSL')}</span>
      <VisuallyHiddenInput
        type="file"
        onChange={handleMethod}
        required
        name={name}
        id={id}
        accept={accepts}
      />
    </Button>);

  };

  return (
    <MDBox>
      <Notification ref={notificationElement} />
      <ConfirmModal ref={confirmModal} callback={uploadAction} approveButtonText="Send" cancelButtonText="Cancel" title="Please input a value" />
      <MDBox>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDButton variant="outlined" color={"dark"} circular onClick={handleCreate}>
            <Icon sx={{ fontWeight: "bold" }}>{"add"}</Icon>
            <span>Create Template</span>
          </MDButton>
          <MDBox>
            <span>Invoice Upload : </span>
            {selectFileButton("xmlFile", "xmlFile", xmlFile, ".xml", handleXmlFileChange)}
            {selectFileButton("xslFile", "xslFile", xslFile, ".xsl", handleXslFileChange)}
            {showUploadButton()}
            {showClearUploadButton()}
          </MDBox>
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

