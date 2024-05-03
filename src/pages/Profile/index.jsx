import styles from "./styles.module.scss"
import { DataView } from "./DataView";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputDropdown from "../../components/InputDropdown";
import { useContext, useEffect } from 'react';
import { FormSubmitContext } from "../../components/ConfigurationsLayout";
import { Modal } from "../../components/Modal";

export function Profile() {

  const [editMode, setEditMode] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const { setAlert } = useContext(FormSubmitContext);

  const schema = Yup.object().shape({
    fullName: Yup.string().required("Nome Completo é um campo obrigatório!"),
    email: Yup.string()
      .email("Deve ser um E-mail válido!")
      .required("E-mail é um campo obrigatório!"),
    profile: Yup.string().required("Perfil é um campo obrigatório!"),
    organization: Yup.string().required("Organização é um campo obrigatório!")
  });

  const { register, handleSubmit, formState } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "Matheus Andrade Carvalho",
      email: "MateusAndrade_@bbb.com",
      birthdate: "1985-05-02",
      gender: "masculino",
      profile: "Analista de Requisitos",
      organization: "Organização WXYZ",
    },
  });

  const { errors } = formState;

  useEffect(() => {
    return () => {
      setAlert(false);
    };
  }, []);

  const handleSubmitForm = (data) => {
    setModalVisibility(true) // TO-DO: dados atualizados com sucesso
    setAlert({ // TO-DO: falha ao atualizar os dados
      message: "Desculpe, servidor indisponível no momento",
      icon: "wifioff",
      type: "warning"
    })
    console.log(data);
  };

  return (
    <div className={styles.Profile}>
      <header>
        <img
          src="../../src/assets/icons/userPlaceholder.svg"
          alt="Foto do usuário"
          width="80"
          height="80"
        />
        <p>Mateus Andrade</p>
        <button>Editar foto de perfil</button>
      </header>
      <hr/>
      {!editMode ? (
        <section>
          <DataView
            legend="E-mail"
            data="MateusAndrade_@bbb.com"
            id="viewEmail"
          />
          <DataView
            legend="Gênero"
            data="Homem Cis"
            id="viewGender"
          />
          <DataView
            legend="Data de nascimento"
            data="11/05/1985"
            id="viewBirthDate"
          />
          <DataView
            legend="Perfil"
            data="Analista de Requisitos"
            id="viewProfile"
          />
          <DataView
            legend="Organização"
            data="Organização WXYZ"
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
              <label htmlFor="profile">Perfil</label>
              <input
                {...register("profile")}
                type="text"
                name="profile"
                id="profile"
                required={errors.profile ? true : false}
              />
              {errors.profile && (
                <p className={styles.card__error}>{errors.profile.message}</p>
              )}
            </div>
            <div>
              <InputDropdown
                label="Gênero"
                registerName="gender"
                register={register}
                name="gender"
                id="gender"
                data={[
                  { label: "Feminino", value: "feminino" },
                  { label: "Masculino", value: "masculino" },
                  { label: "Transexual", value: "transexual" },
                  { label: "Não-binário", value: "nao-binário" },
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