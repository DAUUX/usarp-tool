import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigurationsLayout } from "../components/ConfigurationsLayout";
import { Profile } from "../pages/Profile";
import { Home } from "../pages/Home";
import { Layout } from "../components/Layout";
import { ViewProject } from "../pages/ViewProject";
import { ViewBrainstorming } from "../pages/ViewBrainstorming";
import { RegisterBrainstorming } from "../pages/RegisterBrainstorming";
import { RegisterUserstory } from "../pages/RegisterUserstory";
import { RegisterProject } from "../pages/RegisterProject";
import { NoFound } from "../pages/Maintenance/NoFound";
import { Maintenance } from "../pages/Maintenance/Maintenance/";
import { DetailProject } from "../pages/DetailProject";
import { GlobalDropdownProvider } from "../components/Dropdown/GlobalDropdownContext";

export function LoggedRoutes() {
  return (
    <GlobalDropdownProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="project" element={<ViewProject />} />
            <Route path="brainstorming" element={<Maintenance />} />
            <Route path="registerProject" element={<RegisterProject />} />
            <Route path="editProject/:id" element={<RegisterProject />} />
            <Route path="DetailProject/:id" element={<DetailProject />} />
            <Route path="registerUserstory" element={<RegisterUserstory />} />
            <Route
              path="registerBrainstorming"
              element={<RegisterBrainstorming />}
            />
            <Route
              path="registerBrainstorming"
              element={<RegisterBrainstorming />}
            />
          </Route>
          <Route path="/configurations" element={<ConfigurationsLayout />}>
            <Route index path="profile" element={<Profile />} />
            <Route index path="privacity" element={<Maintenance />} />
          </Route>
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </GlobalDropdownProvider>
  );
}