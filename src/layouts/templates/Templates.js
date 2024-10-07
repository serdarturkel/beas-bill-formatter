import React, { useRef, useState } from "react";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import A4Page from "./components/page/a4/A4Page";
import { useReactToPrint } from "react-to-print";



const Templates = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <A4Page/>
      </MDBox>
    </DashboardLayout>
  );
};

export default Templates;
