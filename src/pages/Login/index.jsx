import styles from "./styles.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Wrapper from "../../components/Wrapper";
import toast, { Toaster } from "react-hot-toast";
import InputPassword from "../../components/InputPassword";
import axios from "axios";
const baseURL = "https://675f-2804-29b8-5004-40de-7009-d2fd-ff3c-e84d.ngrok-free.app";

export default function Login() {
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Deve ser um E-mail válido!")
      .required("E-mail é um campo obrigatório!"),
    password: Yup.string()
      .min(6, "A senha deve conter pelo menos 6 caracteres!")
      // .min(8, "A senha deve conter pelo menos 8 caracteres!")
      .required(),
  });

  const { register, handleSubmit, formState } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const handleSubmitForm = (body) => {
    axios
      .post(baseURL+"/login", body)
      .then(() => {
        toast.success("Login realizado com sucesso!");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Inesperado!");
      });
  };

  return (
    <Wrapper>
      <div className={styles.card__container}>
        <section className={styles.card__body}>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div>
              <label htmlFor="email">E-mail</label>
              <input
                {...register("email")}
                autoFocus={true}
                type="text"
                name="email"
                id="email"
                placeholder="exemplo@usarp.com"
              />
              {errors.email && (
                <p className={styles.card__error}>{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password">Senha</label>
              <InputPassword
                label={"password"}
                register={register}
                type="password"
                name="password"
                id="password"
                autoComplete="on"
                placeholder="•••••••••"
              />
              {errors.password && (
                <p className={styles.card__error}>{errors.password.message}</p>
              )}
              <b>Esqueci minha senha</b>
            </div>
            <button className={styles.card__button} type="submit">
              ACESSAR CONTA
            </button>
          </form>
        </section>
        <section className={styles.card__footer}>
          <p>
            Ainda não possui uma conta?
            <Link to="cadastro">
              <b> Criar agora</b>
            </Link>
          </p>
        </section>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{
          top: 200,
          left: 20,
          bottom: 20,
          right: 20,
        }}
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </Wrapper>
  );
}
