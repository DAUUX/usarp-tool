import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import InputDropdown from "../../../components/InputDropdown";
import * as Yup from "yup";

export default function StepThree({ fullName, next, previous, children }) {
  const schema = Yup.object().shape({
    birthdate: Yup.string().required("Campo obrigatório!"),
    gender: Yup.string().required("Campo obrigatório!"),
    profile: Yup.string().required("Perfil é um campo obrigatório!"),
    organization: Yup.string().required("Organização é um campo obrigatório!"),
  });

  const { register, handleSubmit, formState } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      birthdate: "",
      gender: "",
      profile: "",
      organization: "",
    },
  });

  const { errors } = formState;

  const handleSubmitForm = (data) => {
    next(data);
  };

  return (
    <div className={styles.card__container}>
      <section className={styles.card__header}>
        <h6>
          Excelente, <b>{fullName}! </b>Para concluirmos seu cadastro, por favor
          nos informe os dados abaixo.
        </h6>
      </section>
      {children}
      <section className={styles.card__body}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div>
            <span>
              <label htmlFor="birthdate">Data de nascimento</label>
              <input
                {...register("birthdate")}
                type="date"
                autoFocus={true}
                name="birthdate"
                id="birthdate"
                required={errors.birthdate ? true : false}
              />
              {errors.birthdate && (
                <p className={styles.card__error}>{errors.birthdate.message}</p>
              )}
            </span>
            <InputDropdown
              label="Gênero"
              registerName="gender"
              register={register}
              nama="gender"
              id="gender"
              data={[
                { label: "Feminino", value: "feminino" },
                { label: "Masculino", value: "masculino" },
                { label: "Transexual", value: "transexual" },
                { label: "Não-binário", value: "nao-binário" },
              ]}
              required={errors.gender ? true : false}
            >
              {errors.gender && (
                <p className={styles.card__error}>{errors.gender.message}</p>
              )}
            </InputDropdown>
          </div>
          <InputDropdown
            label="Perfil"
            registerName="profile"
            register={register}
            nama="profile"
            id="profile"
            data={[
              { label: "Estudante", value: "Estudante" },
              { label: "Professor", value: "Professor" },
              { label: "Profissional da indústria ", value: "Profissional da indústria" },
              { label: "Outro", value: "Outro" },
            ]}
            required={errors.profile ? true : false}
          >
            {errors.profile && (
              <p className={styles.card__error}>{errors.profile.message}</p>
            )}
          </InputDropdown>
          <div>
            <label htmlFor="organization">Organização</label>
            <input
              {...register("organization")}
              type="text"
              name="organization"
              id="organization"
              placeholder="Ex: Instituição de ensino, empresa..."
              required={errors.organization ? true : false}
            />
            {errors.organization && (
              <p className={styles.card__error}>
                {errors.organization.message}
              </p>
            )}
          </div>
          <button
            className={styles.card__button}
            type="submit"
            disabled={!formState.isValid}
          >
            CONCLUIR CADASTRO
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

StepThree.propTypes = {
  fullName: PropTypes.node.isRequired,
  next: PropTypes.func,
  previous: PropTypes.func,
  children: PropTypes.node,
};
