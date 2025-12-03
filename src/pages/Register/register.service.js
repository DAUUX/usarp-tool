import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";

const RegisterService = (url) => {
  const navigate = useNavigate();
  const { open, close } = useAlert();

  const Register = async (body, success, error) => {
    try {
      const response = await axios.post(url + "/auth/signup", body);

      if (success) {
        open(success);
        setTimeout(() => {
          close();
          navigate("/");
        }, 2000);
      }
      return response;
    } catch (err) {
      open(error);
      throw err;
    }
  };

  return {
    Register,
  };
};

export default RegisterService;
