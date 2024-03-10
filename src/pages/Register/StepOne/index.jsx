import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function StepOne({ next, children }) {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Deve ser um E-mail válido!")
      .required("E-mail é um campo obrigatório!"),
    fullName: Yup.string().required("Nome Completo é um campo obrigatório!"),
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
      <section className={styles.card__header}>
        <h6>
          Comece um <b>brainstorm</b> em menos <br />
          de <b>5 minutos</b> com o seu time
        </h6>
      </section>
      {children}
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
            <label htmlFor="fullName">Nome Completo</label>
            <input
              {...register("fullName")}
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Fulano..."
            />
            {errors.fullName && (
              <p className={styles.card__error}>{errors.fullName.message}</p>
            )}
          </div>
          <button className={styles.card__button} type="submit">
            PROSSEGUIR COM O CADASTRO
          </button>
        </form>
      </section>
      <section className={styles.card__terms}>
        <p>
          Ao criar uma conta, você afirma que concorda com os
          <b>&nbsp;Termos e Condições</b> da USARP Tool.
        </p>
      </section>
      <section className={styles.card__footer}>
        <p>
          Já tem uma conta?
          <Link to="/">
            <b>&nbsp;Entrar agora</b>
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
