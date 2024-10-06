import React, { useRef, useState } from "react";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import A4Page from "./A4Page";
import { useReactToPrint } from "react-to-print";



const Templates = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: componentRef
  });
  const print = (event) => {
    const printElement = componentRef.current;
    if (printElement) {
      // Geçici bir DOM elementine çevir
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = printElement.outerHTML;

      // Silmek istediğin öğeyi seç (örneğin, bir düğme)
      const item1 = tempDiv.querySelectorAll('.codex-editor-overlay');
      item1.forEach((item) => {
        item.remove(); // Seçilen düğümü DOM'dan sil
      });
      const item2 = tempDiv.querySelectorAll('.ce-inline-toolbar');
      item2.forEach((item) => {
        item.remove(); // Seçilen düğümü DOM'dan sil
      });
      const item3 = tempDiv.querySelectorAll('.ce-toolbar');
      item3.forEach((item) => {
        item.remove(); // Seçilen düğümü DOM'dan sil
      });

      // Kalan HTML'i tekrar outerHTML olarak al
      console.log(tempDiv.innerHTML);

      console.log();
    }
    // handlePrint(event);
  };


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <button onClick={print}>Print</button>
        <A4Page ref={componentRef} />
      </MDBox>
    </DashboardLayout>
  );
};

export default Templates;
