import { useState } from "react";
import { images } from "../../assets/images/images";
import styles from "./styles.module.scss";
import ProfileService from "./Profile.service";
import InputDropdown from "../../components/InputDropdown";

import { DataView } from "./DataView";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const PROFILE_TYPES = [
  {
    label: "Estudante de Graduação",
    value: "Estudante de Graduação",
  },
  {
    label: "Estudante de Pós-Graduação",
    value: "Estudante de Pós-Graduação",
  },
  { label: "Professor", value: "Professor" },
  {
    label: "Profissional da Indústria",
    value: "Profissional da Indústria",
  },
];

const GENDER_TYPES = [
  {
    label: "Feminino",
    value: "Feminino",
  },
  {
    label: "Masculino",
    value: "Masculino",
  },
  {
    label: "Não Binário",
    value: "Não Binário",
  },
  {
    label: "Prefiro não informar",
    value: "Prefiro não informar",
  },
];

export function Profile() {
  const [user, setUser] = useState(""); // Substitua "" pelo estado inicial adequado <null>
  const [editMode, setEditMode] = useState(false);

  const { handleAvatarUpload } = ProfileService();

  const toggleEditMode = () => {
    setEditMode(!editMode);
    // reset(user);
  };

  // const schema = Yup.object().shape({ fullname, email, organization, gender });

  // const { register, reset, handleSubmit, formState } = useForm({
  //   mode: "all",
  //   resolver: yupResolver(schema),
  //   defaultValues: {
  //     fullName: user.fullName,
  //     email: user.email,
  //     birthdate: user.birthdate,
  //     gender: user.gender,
  //     profile: user.profile,
  //     organization: user.organization,
  //   },
  // });

  // const { errors } = formState();

  if (user === null) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.Profile}>
      <header>
        <img
          src={user.avatar || images.defaultProfile}
          alt="Foto do usuário"
          width="80"
          height="80"
        />
        <p>{user.fullname || "undefined"}</p>
        <input
          type="file"
          id="avatar"
          accept="image/jpeg, image/png"
          onChange={handleAvatarUpload}
        />
        <label htmlFor="avatar" className={styles.inputAvatar}>
          Editar foto de perfil
        </label>
      </header>

      <hr />

      {!editMode ? (
        <section>
          <DataView legend="E-mail" data={user.email} id="viewEmail" />
          <DataView legend="Gênero" data={user.gender} id="viewGender" />
          <DataView
            legend="Data de nascimento"
            data={user.birthdate}
            id="viewBirthDate"
          />
          <DataView legend="Perfil" data={user.profile} id="viewProfile" />
          <DataView
            legend="Organização"
            data={user.organization}
            id="viewOrganization"
          />
          <button
            onClick={() => setEditMode(true)}
            className={styles.Profile__PrimaryButton}
            type="button"
          >
            Editar dados
          </button>
        </section>
      ) : (
        <section>
          <form className={styles.Profile__EditForm}>
            <div>
              <label htmlFor="fullName">Nome Completo</label>
              <input type="text" name="fullName" id="fullName" />
            </div>
            <div>
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" />
            </div>
            <div>
              <label htmlFor="birthdate">Data de nascimento</label>
              <input type="date" name="birthdate" id="birthdate" />
            </div>
            <div>
              <InputDropdown
                label="Perfil"
                registerName="profile"
                register={() => {}}
                name="profile"
                id="profile"
                data={PROFILE_TYPES}
              ></InputDropdown>
            </div>
            <div>
              <InputDropdown
                label="Gênero"
                registerName="gender"
                register={() => {}}
                name="gender"
                id="gender"
                data={GENDER_TYPES}
              ></InputDropdown>
            </div>
            <div>
              <label htmlFor="organization">Organização</label>
              <input type="text" name="organization" id="organization" />
              <p></p>
            </div>
            <button
              type="button"
              onClick={toggleEditMode}
              className={styles.Profile__SecondaryButton}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.Profile__PrimaryButton}>
              Salvar dados
            </button>
          </form>
          {/* <Modal.Root isOpen={modalVisibility}>
          <Modal.Icon icon="checkcircle" color="var(--white)" />
          <Modal.Text
            title="Perfil Atualizado"
            description="Mudanças salvas com sucesso"
          />
          <Modal.Button
            primaryButton={{
              label: "Voltar para perfil",
              onClick: () => setModalVisibility(false),
            }}
          />
        </Modal.Root> */}
        </section>
      )}
    </div>
  );
}
