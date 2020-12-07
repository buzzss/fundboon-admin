import React from "react";
import $ from "jquery";
import Auth from "./Auth";
import Profile from "./components/Profile";
import Application from "./components/Application";
import UserManagement from "./components/UserManagement";
import Bank from "./components/Bank";
import BankLeads from "./components/LeadManagement";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const routes = [
  { path: "/login", exact: true, name: "Login", component: Auth },
  {
    path: "/logout",
    exact: true,
    name: "Logout",
    component: (props) => <Auth defaultRoutine="logout" {...props} />,
  },
];

const adminRoutes = [
  { path: "/admin/dashboard", exact: true, name: "Dashboard", component: null },
  { path: "/admin/profile", exact: true, name: "Profile", component: Profile },
  {
    path: "/admin/application",
    exact: true,
    name: "Application",
    component: Application,
  },
  {
    path: "/admin/usermgmt",
    exact: true,
    name: "User Management",
    component: UserManagement,
  },
  {
    path: "/admin/bank",
    exact: true,
    name: "Banks & Services",
    component: Bank,
  },
  {
    path: "/admin/lead",
    exact: true,
    name: "Lead Management",
    component: BankLeads,
  },
];

export { routes, adminRoutes };
