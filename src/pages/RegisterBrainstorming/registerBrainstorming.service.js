import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";

const RegisterBrainstormingService = (url) => {
  const [listProjects, setListProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { open, close } = useAlert();
  const navigate = useNavigate();

  const handleBackBackCloseALert = () => {
    close();
    navigate(-1);
  };

  const RegisterBrainstorming = (body, success, error, warning) => {
    axios
      .post(url + "/brainstorming", body)
      .then(() => {
        open(success);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          open(warning);
        }
        open(error);
      });
  };

  const handleBackButton = (formValues, contentAlert) => {
    const hasDataLoss = Object.values(formValues).some((value) => {
      if (Array.isArray(value)) {
        return value.some((item) => Object.values(item).some((val) => val));
      }
      return Boolean(value);
    });

    hasDataLoss ? open(contentAlert) : handleBackBackCloseALert();
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // Chamada à API para buscar projetos
        const projectResponse = await fetch(`${url}/projeto`);
        if (!projectResponse.ok) {
          throw new Error("Failed to fetch projects");
        }
        const projectsData = await projectResponse.json();

        // Para cada projeto, buscar a user story correspondente
        const projectsWithUserStories = await Promise.all(
          projectsData.map(async (project) => {
            const userStoryResponse = await fetch(
              `${url}/historiaUsuario/${project.userStoryId}`
            );
            if (!userStoryResponse.ok) {
              throw new Error("Failed to fetch user story");
            }
            const userStory = await userStoryResponse.json();
            return { ...project, ...userStory };
          })
        );
        console.log(projectsWithUserStories);
        setListProjects(projectsWithUserStories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [url]);
  return {
    listProjects,
    loading,
    error,
    RegisterBrainstorming,
    handleBackButton,
    handleBackBackCloseALert,
  };
};

export default RegisterBrainstormingService;
