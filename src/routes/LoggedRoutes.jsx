import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Home } from "../pages/Home";

export function LoggedRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route
            path="project"
            element={
              <center>
                <h1>
                  Em manutenção project <br />
                  <img src="https://i.redd.it/2vow1go9nrk31.gif" />
                </h1>
              </center>
            }
          />
          <Route
            path="brainstorming"
            element={
              <center>
                <h1>
                  Em manutenção brainstorming <br />
                  <img src="https://i.redd.it/2vow1go9nrk31.gif" />
                </h1>
              </center>
            }
          />
        <Route path="*" element={<Navigate to="/home" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
