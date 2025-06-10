import { useEffect } from "react";
import { Sidebar } from "../../components/SIdebar/imdex";
import { IconChoice } from "../../utils/IconChoice";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.slice(1);

  useEffect(() => {
    if (!path) {
      navigate("/home");
    }
  }, [navigate, path]);

  return (
    <main style={{ display: "grid", gridTemplateColumns: "14rem 1fr" }}>
      <Sidebar.Root>
        <Sidebar.Button
          text="Inicio"
          active={
            path == "home" ||
            path == "registerProject" ||
            path == "registerBrainstorming"
          }
          route="home"
        >
          <IconChoice icon="home" />
        </Sidebar.Button>
        <Sidebar.Button
          text="Projetos"
          active={path == "project" || path == "registerUserstory"}
          route="project"
        >
          <IconChoice icon="project" />
        </Sidebar.Button>
        <Sidebar.Button
          text="Brainstormings"
          active={path == "brainstorming"}
          route="brainstorming"
        >
          <IconChoice icon="brainstorming" />
        </Sidebar.Button>
        <Sidebar.Button
          text="Checklist"
          active={path == "brainstormingChecklist"}
          route="brainstormingChecklist"
        >
          <IconChoice icon="brainstorming" />
        </Sidebar.Button>
      </Sidebar.Root>

      <Outlet />
    </main>
  );
}
