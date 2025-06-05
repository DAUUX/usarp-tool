import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Wrapper from "../../components/Wrapper";
import InputPassword from "../../components/InputPassword";
import { IconChoice } from "../../utils/IconChoice";
import { Toast } from "../../components/Toast";
import { FeedbackAlert } from "../../components/FeedbackAlert";
import { useAlert } from "../../hooks/useAlert";
import { useAuth } from "../../hooks/useAuth";
import { URL as baseURL } from "../../utils/base";
import { useTranslation } from "react-i18next";
import LoginService from "./login.service";
import { useState } from "react";

export default function Login() {
  const { t } = useTranslation();
  const schema = Yup.object().shape({
    email: Yup.string()
      .email(t("loginErrorEmailValido"))
      .required(t("loginErrorEmail")),
    password: Yup.string()
      .min(6, t("loginErrorSenhaMinima"))
      .max(15, t("loginErrorSenhaMaxima"))
      .required(),
  });
  const { register, handleSubmit, formState } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const { user } = useAuth();
  const { errors } = formState;
  const { close } = useAlert();
  const { Login } = LoginService(baseURL);
  const [toastError, setToastError] = useState();

  const alertSuccess = (
    <FeedbackAlert.Root>
      <FeedbackAlert.Icon icon="checkcircle" />
      <FeedbackAlert.Title
        title={t("loginAlertSucesso")}
        name={`, ${user.fullName}`}
      />
      <FeedbackAlert.Description description={t("loginAlertDescricao")} />
    </FeedbackAlert.Root>
  );

  const alertError = (
    <FeedbackAlert.Root>
      <FeedbackAlert.Icon icon="closecircle" />
      <FeedbackAlert.Title title={t("loginAlertErrorTitle")} />
      <FeedbackAlert.Description description={t("loginAlertErrorDes")} />
      <FeedbackAlert.Button onClick={close} label={t("loginAlertErrorBtn")} />
    </FeedbackAlert.Root>
  );

  const handleSubmitForm = async (body) => {
    try {
      await Login(body, alertSuccess, alertError);
      setToastError(false);
    } catch (error) {
      setToastError(true);
      setTimeout(() => {
        setToastError(false);
      }, 3000);
    }
  };

  const handleCloseToast = () => {
    setToastError(false);
  };
  return (
    <Wrapper>
      {toastError && (
        <Toast
          onClick={handleCloseToast}
          type={"error"}
          message={t("loginErrorToast")}
        >
          <IconChoice icon="close" />
        </Toast>
      )}
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
              <label htmlFor="password">{t("loginPassword")}</label>
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
                <Link to="/recover">{t("loginEsqueci")}</Link>
              </b>
            </div>
            <button
              disabled={!formState.isValid}
              className={styles.card__button}
              type="submit"
            >
              {t("loginButton")}
            </button>
          </form>
        </section>
        <section className={styles.card__footer}>
          <p>
            {t("loginSemCadastro")}
            <Link to="/cadastro">{t("loginCriarAgora")}</Link>
          </p>
        </section>
      </div>
    </Wrapper>
  );
}
