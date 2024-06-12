import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

export default function StepOne({ next, children }) {
  const { t } = useTranslation();
  const schema = Yup.object().shape({
    email: Yup.string()
      .email(t("loginErrorEmailValido"))
      .required(t("loginErrorEmail")),
    fullName: Yup.string().required(t("cadastrarNomeErro")),
  });

  const { register, handleSubmit, formState } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const { errors } = formState;
  const handleSubmitForm = (data) => {
    next(data);
  };

  return (
    <div className={styles.card__container}>
      {children}
      <section className={styles.card__header}>
        <h6>
          {t("cadastrarcabecalhoPart1")}
          <b>{t("cadastrarcabecalhoPart2")}</b> {t("cadastrarcabecalhoPart3")}
          <b>{t("cadastrarcabecalhoPart4")}</b> {t("cadastrarcabecalhoPart5")}
        </h6>
      </section>
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
              required={errors.email ? true : false}
            />
            {errors.email && (
              <p className={styles.card__error}>{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="fullName">{t("cadastrarNome")}</label>
            <input
              {...register("fullName")}
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Fulano..."
              required={errors.fullName ? true : false}
            />
            {errors.fullName && (
              <p className={styles.card__error}>{errors.fullName.message}</p>
            )}
          </div>
          <button
            className={styles.card__button}
            disabled={!formState.isValid}
            type="submit"
          >
            {t("cadastrarBotao")}
          </button>
        </form>
      </section>
      <section className={styles.card__terms}>
        <p>
          {t("cadastrarTermoPart1")}
          <b>&nbsp;{t("cadastrarTermoPart2")}</b> {t("cadastrarTermoPart3")}
        </p>
      </section>
      <section className={styles.card__footer}>
        <p>
          {t("cadastrarConta")}
          <Link to="/login">
            <b>&nbsp;{t("cadastrarEntrar")}</b>
          </Link>
        </p>
      </section>
    </div>
  );
}

StepOne.propTypes = {
  children: PropTypes.node,
  next: PropTypes.func,
};
