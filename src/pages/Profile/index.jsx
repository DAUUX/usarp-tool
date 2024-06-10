import styles from "./styles.module.scss"
import { DataView } from "./DataView";
import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputDropdown from "../../components/InputDropdown";
import { FormSubmitContext } from "../../components/ConfigurationsLayout";
import { Modal } from "../../components/Modal";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { URL as baseURL } from "../../utils/base";

export function Profile() {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [userData, setUserData] = useState(null);
  const { setAlert } = useContext(FormSubmitContext);

  useEffect(() => {
    axios.get('/user', {
        params: {
          id: user.id
        }
      })
      .then(res => {
        setUserData(res.data);
      })
      .catch(err => {
        console.log(err);
        setAlert(true);
      });
  }, []);

  const schema = Yup.object().shape({
    fullName: Yup.string().required("Nome Completo é um campo obrigatório!"),
    email: Yup.string()
      .email("Deve ser um E-mail válido!")
      .required("E-mail é um campo obrigatório!"),
    organization: Yup.string().required("Organização é um campo obrigatório!")
  });

  const { register, handleSubmit, formState, reset } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: userData.fullName ?? '',
      email: userData.email ?? '',
      birthdate: userData.birthdate ?? '',
      gender: userData.gender ?? '',
      profile: userData.profile ?? '',
      organization: userData.organization ?? '',
    },
  });

  const { errors } = formState;

  useEffect(() => {
    axios.get(baseURL + '/user', {
        params: {
          id: user.id
        }
      })
      .then(res => {
        setUserData(res.data);
        reset(res.data);
      })
      .catch(() => {
        setAlert(true);
      });
  }, [user.id, editMode, reset, setAlert]);

  useEffect(() => {
    return () => {
      setAlert(false);
    };
  }, [setAlert]);

  const handleSubmitForm = (data) => {
    axios.put('/user/update', {
      email: data.email,
      fullName: data.fullName,
      gender: data.gender,
      birthdate: data.birthdate,
      profile: data.profile,
      organization: data.organization,
    })
      .then(res => {
        console.log(res.data);
        setModalVisibility(true);
      })
      .catch( err => {
        setAlert({
          message: "Desculpe, servidor indisponível no momento",
          icon: "wifioff",
          type: "warning"
        })
      })
  };

  if(userData === null) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.Profile}>
      <header>
        <img
          src="../../src/assets/icons/userPlaceholder.svg"
          alt="Foto do usuário"
          width="80"
          height="80"
        />
        <p>{user.fullName || "undefined"}</p>
        <button>Editar foto de perfil</button>
      </header>
      <hr/>
      {!editMode ? (
        <section>
          <DataView
            legend="E-mail"
            data={user.email}
            id="viewEmail"
          />
          <DataView
            legend="Gênero"
            data={userData.gender}
            id="viewGender"
          />
          <DataView
            legend="Data de nascimento"
            data={userData.birthdate}
            id="viewBirthDate"
          />
          <DataView
            legend="Perfil"
            data={userData.profile}
            id="viewProfile"
          />
          <DataView
            legend="Organização"
            data={userData.organization}
            id="viewOrganization"
          />
          <button
            onClick={() => setEditMode(true)}
            className={styles.Profile__PrimaryButton}
            type="button">
            Editar dados
          </button>
        </section>
        ) : (
        <section>
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className={styles.Profile__EditForm}
          >
            <div>
              <label htmlFor="fullName">Nome Completo</label>
              <input
                {...register("fullName")}
                type="text"
                name="fullName"
                id="fullName"
                required={errors.fullName ? true : false}
              />
              {errors.fullName && (
                <p className={styles.card__error}>{errors.fullName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email">E-mail</label>
              <input
                {...register("email")}
                type="email"
                name="email"
                id="email"
                required={errors.email ? true : false}
              />
              {errors.email && (
                <p className={styles.card__error}>{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="birthdate">Data de nascimento</label>
              <input
                {...register("birthdate")}
                type="date"
                name="birthdate"
                id="birthdate"
                required={errors.birthdate ? true : false}
              />
              {errors.birthdate && (
                <p className={styles.card__error}>{errors.birthdate.message}</p>
              )}
            </div>
            <div>
              <InputDropdown
                label="Perfil"
                registerName="profile"
                register={register}
                name="profile"
                id="profile"
                data={[
                  { label: "Estudante", value: "Estudante" },
                  { label: "Professor", value: "Professor" },
                  { label: "Profissional da indústria", value: "Profissional da indústria" },
                  { label: "Outro", value: "Outro" },
                ]}
              >
              </InputDropdown>
            </div>
            <div>
              <InputDropdown
                label="Gênero"
                registerName="gender"
                register={register}
                name="gender"
                id="gender"
                data={[
                  { label: "Feminino", value: "female" },
                  { label: "Masculino", value: "male" },
                  { label: "Transexual", value: "transsexual" },
                  { label: "Não-binário", value: "non-binary" },
                ]}
              >
              </InputDropdown>
            </div>
            <div>
              <label htmlFor="organization">Organização</label>
              <input
                {...register("organization")}
                type="text"
                name="organization"
                id="organization"
                required={errors.organization ? true : false}
              />
              {errors.organization && (
                <p className={styles.card__error}>{errors.organization.message}</p>
              )}
            </div>
            <button
              onClick={() => setEditMode(false)}
              className={styles.Profile__SecondaryButton}
              type="button">
              Cancelar
            </button>
            <button className={styles.Profile__PrimaryButton}
              type="submit"
              disabled={!formState.isDirty || !formState.isValid || formState.isSubmitSuccessful}>
                Salvar dados
            </button>
          </form>
          <Modal.Root isOpen={modalVisibility}>
            <Modal.Icon icon="checkcircle" color="var(--white)" />
            <Modal.Text
              title="Perfil Atualizado"
              description="Mudanças salvas com sucesso"
            />
            <Modal.Button
              primaryButton={{
                label: "Voltar para perfil",
                onClick: () => setModalVisibility(false)
              }}
            />
          </Modal.Root>
        </section>
      )}
    </div>
  )
}