import React from "react";
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "widgets/LayoutContainers/DashboardLayout";
import DashboardNavbar from "widgets/Navbars/DashboardNavbar";

const Settings = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={12}>
            Settings
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default Settings;
