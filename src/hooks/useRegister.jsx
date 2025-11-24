import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../utils/config";

export const useRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const register = useCallback(
    async (data, { openModal, closeModal, reset, modalSuccess, modalError }) => {
      setIsLoading(true);
      try {
        const response = await axios.post(config.baseUrl + "/auth/signup", data);

        const successModalProps = {
          ...modalSuccess,
          title: `Bem vindo(a), ${data.fullName || "Usuário"}`,
        };

        openModal(successModalProps);

        setTimeout(() => {
          closeModal();
          navigate("/login");
        }, 3000);

        reset();
        setIsLoading(false);
        return response;
      } catch (err) {
        console.log("Form submission error:", err);

        const errorMessage = err.response?.data?.message || modalError.text || "Ocorreu um erro ao criar sua conta.";
        const errorModalProps = { ...modalError, text: errorMessage };

        openModal(errorModalProps);
        setIsLoading(false);
      }
    },
    [navigate]
  );

  return { register, isLoading };
};
