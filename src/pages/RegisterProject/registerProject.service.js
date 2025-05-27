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

  const handleBackBackCloseALert = () => {
    close();
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

  const registerProject = (body, success, error, warning) => {
    api
      .post(path, body)
      .then(() => {
        open(success);
      })
      .catch((err) => {
        debugger;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(path);
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
  };
};

export default RegisterProjectService;
