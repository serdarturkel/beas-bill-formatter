import React, { useRef, useState } from "react";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import A4Page from "./A4Page";



const Templates = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox style={{ display: 'inline-block', width: '300mm', height: '100vh' }}>
        <A4Page />
      </MDBox>
    </DashboardLayout>
  );
};

export default Templates;
