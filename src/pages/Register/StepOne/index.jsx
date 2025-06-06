import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { IconChoice } from "../../../utils/IconChoice";
import { useEffect, useState } from "react";
import { Toast } from "../../../components/Toast";
import { useRegister } from "../contexts/RegisterContext";

export default function StepOne({ children }) {
  const { t } = useTranslation();
  const { formData, updateFormData, nextStep } = useRegister();
  const [toastError, setToastError] = useState();

  const schema = Yup.object().shape({
    email: Yup.string()
      .email(t("loginErrorEmailValido"))
      .required(t("loginErrorEmail")),
    fullName: Yup.string()
      .required(t("cadastrarNomeErro"))
      .matches(/^[A-Za-zÀ-ÿ\s]+$/, t("cadastrarNomeCaracteresInvalidos")),
  });

  const { register, handleSubmit, formState } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      email: formData.email,
      fullName: formData.fullName,
    },
    criteriaMode: "firstError",
  });

  const { errors } = formState;
  
  const handleSubmitForm = (data) => {
    updateFormData(data);
    nextStep();
  };
  const handleCloseToast = () => {
    setToastError(false);
  };

  useEffect(() => {
    if (errors.email || errors.fullName) {
      setToastError(true);
      return;
    }
    setToastError(false);
  }, [errors.email, errors.fullName]);

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
      {toastError && (
        <Toast
          onClick={handleCloseToast}
          type={"error"}
          message={t("cadastrarToast")}
        >
          <IconChoice icon="close" />
        </Toast>
      )}
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
          <Link to="/login">&nbsp;{t("cadastrarTermoPart2")}</Link>{" "}
          {t("cadastrarTermoPart3")}
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
};
