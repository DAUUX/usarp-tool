import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";
import { ConfigurationsLayout } from "./components/ConfigurationsLayout";
import { Profile } from "./pages/Profile";


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
        </Route>
          <Route path="/configurations" element={<ConfigurationsLayout />}>
          <Route index path="profile" element={<Profile />} />
          <Route index path="privacity" element={<p>Em construção</p>} />
        </Route>
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}
