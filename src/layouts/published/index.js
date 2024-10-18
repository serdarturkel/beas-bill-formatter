import React from "react";
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PublishedInvoiceTemplatePage from "./ui";
const Published = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={12}>
            <PublishedInvoiceTemplatePage />
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default Published;
