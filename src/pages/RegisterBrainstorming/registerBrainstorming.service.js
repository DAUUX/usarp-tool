import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";
import { formatProjectDataSelection } from "../../utils/formatProjectDataSelection";
import { api } from "../../utils/axios.config";
import { formatUserStoriesDataSelection } from "../../utils/formatUserStoriesDataSelection";
import { formatDateToDDMMYYYY } from "../../utils/formatDate";

const RegisterBrainstormingService = (url) => {
  const [listProjects, setListProjects] = useState([]);
  const [listUserStoriesByProject, setListUserStoriesByProject] = useState([]);
  const [projectId, setProjectId] = useState(null);
  const [error, setError] = useState(null);

  const { open, close } = useAlert();
  const navigate = useNavigate();

  const handleBackBackCloseALert = () => {
    close(null);
    navigate(-1);
  };

  const RegisterBrainstorming = (body, success, errorAlert, warning) => {
    const formattedBody = {
      brainstormingTitle: body.title,
      project: body.project.value,
      brainstormingDate: formatDateToDDMMYYYY(body.date),
      brainstormingTime: body.hours,
      userStories: body.userStory.map((item) => item.value),
    };

    api
      .post(`${url}/brainstorming/create`, formattedBody)
      .then((response) => {
        open(success(response.data.id));
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          open(warning);
          return;
        }
        open(errorAlert);
      });
  };

  const handleBackButton = (formValues, contentAlert) => {
    const hasDataLoss = Object.values(formValues).some((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return Boolean(value);
    });

    hasDataLoss ? open(contentAlert) : handleBackBackCloseALert();
  };

  // 🔹 BUSCA PROJETOS
  useEffect(() => {
    const fetchListProject = async () => {
      try {
        const { data } = await api.get("/project/owned-projects");
        setListProjects(formatProjectDataSelection(data.projects));
      } catch (err) {
        setError(err);
      }
    };

    fetchListProject();
  }, []);

  // 🔹 BUSCA USER STORIES (SÓ SE TIVER projectId)
  useEffect(() => {
    if (!projectId) return;

    const fetchListUserStoriesByProject = async () => {
      try {
        const { data } = await api.get(
          `/userstories/${projectId}/user-stories`
        );
        setListUserStoriesByProject(
          formatUserStoriesDataSelection(data.userStories)
        );
      } catch (err) {
        setError(err);
      }
    };

    fetchListUserStoriesByProject();
  }, [projectId]);

  return {
    listProjects,
    listUserStoriesByProject,
    error,
    setProjectId,
    RegisterBrainstorming,
    handleBackButton,
    handleBackBackCloseALert,
  };
};

export default RegisterBrainstormingService;
