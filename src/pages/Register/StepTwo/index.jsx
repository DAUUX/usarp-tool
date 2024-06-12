import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import PasswordStrengthLevel from "../../../components/PasswordStrengthLevel";
import InputPassword from "../../../components/InputPassword";
import { useTranslation } from "react-i18next";

export default function StepTwo({ fullName, next, previous, children }) {
  const { t } = useTranslation();
  const schema = Yup.object().shape({
    password: Yup.string()
      .min(8, t("loginErrorSenhaMinima"))
      .max(15, t("loginErrorSenhaMaxima"))
      .matches(/[A-Z]/g, t("cadastrarErroSenhaMaiuscular"))
      .matches(/[a-z]/g, t("cadastrarErroSenhaMinuscular"))
      .matches(/[0-9]/g, t("cadastrarErroSenhaNumero"))
      .matches(/[#?!@$%^&*-]/g, t("cadastrarErroSenhaCaractere"))
      .required(),
  });

  const { register, handleSubmit, formState, getValues } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
    },
    criteriaMode: "all",
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
          {t("cadastrarStepTwoPart1")}
          <b>{fullName}!</b> {t("cadastrarStepTwoPart2")}
          <b>{t("cadastrarStepTwoPart3")}</b>
          {t("cadastrarStepTwoPart4")}
        </h6>
      </section>
      <section className={styles.card__body}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div>
            <label htmlFor="password">{t("loginPassword")}</label>
            <InputPassword
              register={register}
              label={"password"}
              autoFocus={true}
              name="password"
              id="password"
              placeholder="•••••••••"
              minLength="8"
              required={errors.password ? true : false}
            />
            {errors.password && (
              <p hidden className={styles.card__error}>
                {errors.password.message}
              </p>
            )}
            <p className={styles.card__warning}>{t("cadastrarSenhaForca")}</p>
            <PasswordStrengthLevel password={getValues("password")} />
          </div>
          <button
            className={styles.card__button}
            type="submit"
            disabled={!formState.isValid}
          >
            {t("cadastrarButaoContinua")}
          </button>
          <button
            className={styles.card__button}
            onClick={previous}
            type="button"
          >
            {t("cadastrarButaoVolta")}
          </button>
        </form>
      </section>
    </div>
  );
}
StepTwo.propTypes = {
  fullName: PropTypes.node.isRequired,
  next: PropTypes.func,
  previous: PropTypes.func,
  children: PropTypes.node,
};


