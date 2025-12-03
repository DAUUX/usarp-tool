import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../layouts/Layout/Layout";

import Home from "../pages/Home";
import Project from "../pages/Projects";
import CreateProject from "../pages/CreateProject";

import { ConfigurationsLayout } from "../components/ConfigurationsLayout";
import { Profile } from "../pages/Profile";
import { ViewBrainstorming } from "../pages/ViewBrainstorming";
import { RegisterBrainstorming } from "../pages/RegisterBrainstorming";
import { RegisterUserstory } from "../pages/RegisterUserstory";
import { Maintenance } from "../pages/Maintenance/Maintenance/";
import { DetailProject } from "../pages/DetailProject";
import { OrdemUserstory } from "../pages/OrdemUserstory";
import { BrainstormingChecklist } from "../pages/BrainstormingChecklist";
// import { NoFound } from "../pages/Maintenance/NoFound";

export function LoggedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="project" element={<Project />} />
        <Route path="brainstorming" element={<ViewBrainstorming />} />
        <Route path="userStories" element={<Maintenance />} />

        {/* <Route path="editProject/:id" element={<RegisterProject />} /> */}
        <Route path="registerProject" element={<CreateProject />} />
        <Route path="editProject/:id" element={<CreateProject />} />
        <Route path="DetailProject/:id" element={<DetailProject />} />
        <Route path="registerUserstory" element={<RegisterUserstory />} />
        <Route path="registerBrainstorming" element={<RegisterBrainstorming />} />
        <Route path="brainstormingChecklist" element={<BrainstormingChecklist />} />
      </Route>
      <Route path="/ordemUserstory" element={<OrdemUserstory />} />
      <Route path="/configurations" element={<ConfigurationsLayout />}>
        <Route index path="profile" element={<Profile />} />
        <Route index path="privacity" element={<Maintenance />} />
      </Route>
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
