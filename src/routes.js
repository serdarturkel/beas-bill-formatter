/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Billing from "layouts/billing";
import Profile from "layouts/profile";

// @mui icons
import Icon from "@mui/material/Icon";
import Tasks from "layouts/tasks/Tasks";
import Certificates from "layouts/certificates/index";
import Projects from "layouts/projects";
import Settings from "layouts/settings/Settings";
import CertificateStore from "layouts/certificateStore";
import Published from "layouts/published";
import InvoiceTemplate from "layouts/invoiceTemplate";
import NewTemplate from "layouts/templates";

const routes = [
  {
    menu: true,
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    menu: true,
    type: "collapse",
    key: "projects",
    route: "/projects",
    name: "Projects",
    icon: <Icon fontSize="small">account_tree</Icon>,
    component: <Projects />,
  },
  {
    menu: true,
    type: "collapse",
    key: "certificateStore",
    route: "/certificateStore",
    name: "Certificate Store",
    icon: <Icon fontSize="small">warehouse</Icon>,
    component: <CertificateStore />,
  },
  {
    menu: true,
    type: "collapse",
    key: "certificates",
    route: "/certificates",
    name: "Certificates",
    icon: <Icon fontSize="small">shield</Icon>,
    component: <Certificates />,
  },
  {
    menu: true,
    type: "collapse",
    key: "invoiceTemplates",
    route: "/invoiceTemplates",
    name: "Invoice Templates",
    icon: <Icon fontSize="small">widgets</Icon>,
    component: <InvoiceTemplate />,
  },
  {
    menu: false,
    type: "collapse",
    key: "template",
    route: "/invoiceTemplate/:id",
    name: "Invoice Template Management",
    icon: <Icon fontSize="small">note_add</Icon>,
    component: <NewTemplate />,
  },
  {
    menu: true,
    type: "collapse",
    key: "published",
    route: "/published",
    name: "Published",
    icon: <Icon fontSize="small">backup_table</Icon>,
    component: <Published />,
  },
  {
    menu: false,
    type: "collapse",
    key: "tasks",
    route: "/tasks",
    name: "Tasks",
    icon: <Icon fontSize="small">list_alt</Icon>,
    component: <Tasks />,
  },
  {
    menu: false,
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    menu: false,
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    menu: false,
    type: "collapse",
    key: "settings",
    route: "/settings",
    name: "Settings",
    icon: <Icon fontSize="small">settings</Icon>,
    component: <Settings />,
  },
];

export default routes;
