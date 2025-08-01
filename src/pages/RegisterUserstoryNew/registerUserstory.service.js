import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";
import { useAuth } from "../../hooks/useAuth";

const RegisterUserstoryService = (url) => {
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
  };

  return {
    registerUserstory,
    handleBackButton,
    handleBackBackCloseALert,
  };
};

export default RegisterUserstoryService;