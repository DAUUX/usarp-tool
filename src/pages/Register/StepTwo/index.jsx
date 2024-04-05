import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import PasswordStrengthLevel from "../../../components/PasswordStrengthLevel";
import InputPassword from "../../../components/InputPassword";

export default function StepTwo({ fullName, next, previous, children }) {
  const schema = Yup.object().shape({
    password: Yup.string()
      .min(8, "A senha deve conter pelo menos 8 caracteres!")
      .matches(/[A-Z]/g, "A senha deve conter pelo menos uma letra maiúscula!")
      .matches(/[a-z]/g, "A senha deve conter pelo menos uma letra minúscula!")
      .matches(/[0-9]/g, "A senha deve conter pelo menos um número!")
      .matches(
        /[#?!@$%^&*-]/g,
        "A senha deve conter pelo menos um caractere especial!"
      )
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
          Muito bem, <b>{fullName}!</b> Estamos quase lá, agora crie uma{" "}
          <b>senha</b> segura para proteger sua conta.
        </h6>
      </section>
      <section className={styles.card__body}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div>
            <label htmlFor="password">Senha</label>
            <InputPassword
              register={register}
              label={"password"}
              autoFocus={true}
              name="password"
              id="password"
              placeholder="•••••••••"
              minLength="6"
              required={errors.password ? true : false}
            />
            {errors.password && (
              <p hidden className={styles.card__error}>
                {errors.password.message}
              </p>
            )}
            <p className={styles.card__warning}>
              Sua senha deve ter pelo menos 8 caracteres, com uma letra
              maiúscula e um caractere especial.
            </p>
            <PasswordStrengthLevel password={getValues("password")} />
          </div>
          <button
            className={styles.card__button}
            type="submit"
            disabled={!formState.isValid}
          >
            CONTINUAR
          </button>
          <button
            className={styles.card__button}
            onClick={previous}
            type="button"
          >
            VOLTAR
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
