import React, { useState } from "react";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import A4Page from "./components/page/a4/A4Page";
import { Grid } from "@mui/material";
import StyledTable from "./components/page/styledTable/StyledTable";



const Templates = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const handleStyleChange = (property, value) => {
    if (selectedElement) {
      selectedElement.style[property] = value;
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container justifyContent="center" spacing={1}>
        <Grid item xs={12} md={2}>
          {selectedElement && (
            <StyledTable selectedElement={selectedElement} onStyleChange={handleStyleChange} />
          )}
        </Grid>
        <Grid item xs={12} md={10}>
          <MDBox>
            <A4Page setSelectedElement={setSelectedElement} />
          </MDBox>
        </Grid>

      </Grid>
    </DashboardLayout>
  );
};

export default Templates;
