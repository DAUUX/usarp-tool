import styles from "./styles.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Wrapper from "../../components/Wrapper";
import InputPassword from "../../components/InputPassword";
import axios from "axios";
import { IconChoice } from "../../utils/IconChoice";
import { Toast } from "../../components/Toast";
import { FeedbackAlert } from "../../components/FeedbackAlert";
import { useAlert } from "../../hooks/useAlert";
import { useAuth } from "../../hooks/useAuth";
import { URL as baseURL } from "../../utils/base";
import { useTranslation } from "react-i18next";

export default function Login() {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Deve ser um E-mail válido!")
      .required("E-mail é um campo obrigatório!"),
    password: Yup.string()
      .min(6, "A senha deve conter pelo menos 8 caracteres!")
      .max(15, "A senha deve conter no máximo 15 caracteres!")
      .required(),
  });

  const { register, handleSubmit, formState } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setToken, user } = useAuth();
  const { errors } = formState;
  const { open, close } = useAlert();

  const handleOpenAlertSuccess = () => {
    const content = (
      <FeedbackAlert.Root>
        <FeedbackAlert.Icon icon="checkcircle" />
        <FeedbackAlert.Title title="Bem-vindo(a)" name={`, ${user.fullName}`} />
        <FeedbackAlert.Description description="Sua conta foi criada com sucesso" />
      </FeedbackAlert.Root>
    );
    open(content);
  };

  const handleOpenAlertError = () => {
    const content = (
      <FeedbackAlert.Root>
        <FeedbackAlert.Icon icon="closecircle" />
        <FeedbackAlert.Title title="Falha ao realizar login" />
        <FeedbackAlert.Description description="Instabilidade no servidor" />
        <FeedbackAlert.Button onClick={close} label="Ok, fechar" />
      </FeedbackAlert.Root>
    );
    open(content);
  };

  const handleOpenToastError = () => {
    const content = (
      <Toast
        onClick={close}
        type={"error"}
        message={"E-mail e/ou senha incorretos"}
      >
        <IconChoice icon="close" width="24px" height="24px" color="#fff" />
      </Toast>
    );
    open(content);
    setTimeout(() => {
      close();
    }, 3000);
  };

  const handleSubmitForm = (body) => {
    axios
      .post(baseURL + "/auth/signin", body)
      .then((response) => {
        const token = response.data.accessToken;
        setToken(token);
        localStorage.setItem("@AccessToken", token);
        handleOpenAlertSuccess();
        setTimeout(() => {
          close();
          navigate("/login");
        }, 3000);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          handleOpenAlertError();
        }
        handleOpenToastError();
      });
  };

  return (
    <Wrapper>
      <div className={styles.card__container}>
        <section className={styles.card__body}>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div>
              <label htmlFor="email">{t("loginEmail")}</label>
              <input
                {...register("email")}
                autoFocus={true}
                type="email"
                name="email"
                id="email"
                placeholder="exemplo@usarp.com"
                required
              />
              {errors.email && (
                <p className={styles.card__error}>{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password">{t('loginPassword')}</label>
              <InputPassword
                label={"password"}
                register={register}
                type="password"
                name="password"
                id="password"
                minLength="6"
                required={errors.password ? true : false}
                placeholder="•••••••••"
              />
              {errors.password && (
                <p className={styles.card__error}>{errors.password.message}</p>
              )}

              <b>
                <Link to="/recover">{t('loginEsqueci')}</Link>
              </b>
            </div>
            <button
              disabled={!formState.isValid}
              className={styles.card__button}
              type="submit"
            >
              ENTRAR
            </button>
          </form>
        </section>
        <section className={styles.card__footer}>
          <p>
            Ainda não possui uma conta?
            <Link to="/cadastro">
              <b> Criar agora</b>
            </Link>
          </p>
        </section>
      </div>
    </Wrapper>
  );
}
