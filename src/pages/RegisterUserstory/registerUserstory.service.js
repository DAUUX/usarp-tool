import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";
import { useAuth } from "../../hooks/useAuth";

const RegisterUserstoryService = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const { open, close } = useAlert();
  const navigate = useNavigate();
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
  const registerUserstory = (body, success, error, warning) => {
    open(success);
    body["createdBy"] = user.email;
    axios
      .post(url + "/historiaUsuario", body)
      .then(() => {})
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          // handleOpenAlertError();
        }
        // handleOpenToastError();
      });
    for (let item of data) {
      if (item.label === body.project) {
        axios.patch(url + "/projeto/" + item.value, {
          amountUs: body.userStory.length,
        });
      }
    }
  };

  useEffect(() => {
    const fetchListProject = async () => {
      try {
        const response = await fetch(url + "/projeto");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        let data = result.map(({ id, name }) => ({ value: id, label: name }));
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListProject();
  }, [url]);

  return {
    registerUserstory,
    handleBackButton,
    data,
    loading,
    error,
    handleBackBackCloseALert,
  };
};

export default RegisterUserstoryService;
