import React from "react";
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "widgets/LayoutContainers/DashboardLayout";
import DashboardNavbar from "widgets/Navbars/DashboardNavbar";
import CertificatesPage from "./ui";
const Certificates = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={12}>
            <CertificatesPage />
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default Certificates;
