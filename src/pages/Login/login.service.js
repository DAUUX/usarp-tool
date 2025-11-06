import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAlert } from "../../hooks/useAlert";

const LoginService = (url) => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { open, close } = useAlert();

  const Login = (body, success, error, warning) => {
    return new Promise((resolve, reject) => {
      axios
        .post(url + "/auth/signin", body)
        .then((response) => {
          const token = response.data.token;
          setToken(token);
          localStorage.setItem("@AccessToken", token);
          open(success);
          setTimeout(() => {
            close();
            navigate("/dashboard");
          }, 3000);
          resolve(response);
        })
        .catch((err) => {
          if (err.code === "ERR_NETWORK") {
            open(error);
          }
          reject(err);
        });
    });
  };

  return {
    Login,
  };
};

export default LoginService;
