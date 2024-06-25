import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import InputDropdown from "../../../components/InputDropdown";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export default function StepThree({ fullName, next, previous, children }) {
  const { t } = useTranslation();
  const schema = Yup.object().shape({
    birthdate: Yup.string().required(t("cadastrarCampoObrigatorio")),
    gender: Yup.string().required(t("cadastrarCampoObrigatorio")),
    profile: Yup.string().required(t("cadastrarPerfilObrigatorio")),
    organization: Yup.string().required(t("cadastrarOrganizacaoObrigatorio")),
  });
  function formatDate(date) {
    const [ano, mes, dia] = date.split("-");
    return `${dia}/${mes}/${ano}`;
  }
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
    const { birthdate, gender, profile, organization } = data;
    next({ birthdate: formatDate(birthdate), gender, profile, organization });
    console.log(data);
  };

  return (
    <div className={styles.card__container}>
      <section className={styles.card__header}>
        <h6>
          {t("cadastrarStepThreePart1")}, <b>{fullName}! </b>
          {t("cadastrarStepThreePart2")}
        </h6>
      </section>
      {children}
      <section className={styles.card__body}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div>
            <span>
              <label htmlFor="birthdate">
                {t("cadastrarCampoDataNascimento")}
              </label>
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
              label={t("cadastrarCampoGenero")}
              registerName="gender"
              register={register}
              nama="gender"
              id="gender"
              data={[
                { label: t("cadastrarCampoGeneroFeminino"), value: "Feminino" },
                {
                  label: t("cadastrarCampoGeneroMasculino"),
                  value: "Masculino",
                },
                { label: t("cadastrarCampoGeneroNB"), value: "Não binário" },
                {
                  label: t("cadastrarCampoGeneroPN"),
                  value: "Prefiro não informar",
                },
              ]}
              required={errors.gender ? true : false}
            >
              {errors.gender && (
                <p className={styles.card__error}>{errors.gender.message}</p>
              )}
            </InputDropdown>
          </div>
          <InputDropdown
            label={t("cadastrarCampoPerfil")}
            registerName="profile"
            register={register}
            nama="profile"
            id="profile"
            data={[
              {
                label: t("cadastrarCampoPerfilEstudanteGraduação"),
                value: "Estudante de Graduação",
              },
              {
                label: t("cadastrarCampoPerfilEstudantePos"),
                value: "Estudante de Pós-Graduação",
              },
              {
                label: t("cadastrarCampoPerfilProfessor"),
                value: "Professor",
              },
              {
                label: t("cadastrarCampoPerfilIndústria"),
                value: "Profissional da Indústria",
              }
            ]}
            required={errors.profile ? true : false}
          >
            {errors.profile && (
              <p className={styles.card__error}>{errors.profile.message}</p>
            )}
          </InputDropdown>
          <div>
            <label htmlFor="organization">
              {t("cadastrarCampoOrganizacao")}
            </label>
            <input
              {...register("organization")}
              type="text"
              name="organization"
              id="organization"
              placeholder={t("cadastrarCampoOrganizacaoPlaceholder")}
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
            {t("cadastrarButaoConcluir")}
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

StepThree.propTypes = {
  fullName: PropTypes.node.isRequired,
  next: PropTypes.func,
  previous: PropTypes.func,
  children: PropTypes.node,
};
