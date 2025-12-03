import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";
import { api } from "../../utils/axios.config";

const RegisterProjectService = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { open, close } = useAlert();
  const navigate = useNavigate();

  const path = "/project/create";
  const getPath= "/project/owned-projects";
  const pathUpdate = "/project/update/";
  const pathById = "/project/owned-projects?id=";

  const handleBackBackCloseALert = () => {
    close(null);
    navigate(-1);
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


    const extractValueSimpleQuotes = (texto) => {
      const regex = /'([^']*)'/;
      const resultado = regex.exec(texto);
      return resultado ? resultado[1] : null;
    };

  const registerProject = (body, success, error, warningCallback) => {
    api
      .post(path, body)
      .then(() => {
        open(success);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          open(error);
          return;
        }
        if (err.response.status == 400) {
          const errorMessage = err.response.data?.message || "Ocorreu um erro.";
          let warningContent = warningCallback(
            `Usuário com email <span style="color: var(--primary-600);font-weight: 600;"> ${extractValueSimpleQuotes(
              errorMessage
            )} </span> não encontrado.`
          );
          if (errorMessage === 'Validation error') {
            warningContent = warningCallback(
              `O Nome do projeto já está sendo utilizado.`
            );
          }
          open(warningContent);
          return;
        }
      });
  };

  const updateProject = (id, body, success, error, warning) => {
    api
      .put(pathUpdate + id, body)
      .then(() => {
        open(success);
        setTimeout(() => {
          handleBackBackCloseALert();
        }, 2000);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          open(error);
          return;
        }
        if (err.response.status == 400) {
          open(warning);
          return;
        }
        open(error);
      });
  };

  const getProjectByid = async (id) => {
      const response = await api.get(pathById + id);
      const projectData = response.data.projects[0];
      const project = {
        projectName: projectData.projectName,
        description: projectData.description,
        projectTeam: [
          ...(projectData.projectTeam || []).map((member) => ({
            email: member.email || "",
            roleInProject: member.roleInProject || "",
          })),
        ],
      };
      return project;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(getPath);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
    handleBackButton,
    registerProject,
    handleBackBackCloseALert,
    close,
    getProjectByid,
    updateProject,
  };
};

export default RegisterProjectService;
