import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { DataView } from "./DataView";
import { set, useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputDropdown from "../../components/InputDropdown";
import { FormSubmitContext } from "../../components/ConfigurationsLayout";
import { Modal } from "../../components/Modal";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { config } from "../../utils/config";
import { images } from "../../assets/images/images";

export function Profile() {
  const navigate = useNavigate(); // Inicialize o hook useNavigate
  const { user } = useAuth();
  const [modalVisibility, setModalVisibility] = useState(false);
  const { setAlert } = useContext(FormSubmitContext);

  const [userData, setUserData] = useState("");
  const [editMode, setEditMode] = useState(false);

  const createDateFromString = (dateString) => {
    // A string deve estar no formato "yyyy-MM-dd"
    // dd/mm/yyyy
    if (dateString === undefined || dateString === null || dateString === "") {
      return dateString;
    } else {
      const [dia, mes, ano] = dateString.split("/");
      return `${ano}-${mes}-${dia}`;
    }
  };

  const editarValores = (mode) => {
    setEditMode(mode);
    setUserData({
      fullName: userData.fullName,
      email: userData.email,
      birthdate: userData.birthdate,
      gender: userData.gender,
      profile: userData.profile,
      organization: userData.organization,
    });
    reset(userData);
  };

  useEffect(() => {
    axios
      .get(config.baseUrl + "/user", {
        params: {
          id: user.id,
        },
      })
      .then((res) => {
        res.data.birthdate = createDateFromString(res.data.birthdate);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setAlert(true);
      });
  }, []);

  const schema = Yup.object().shape({
    fullName: Yup.string().required("Nome Completo é um campo obrigatório!"),
    email: Yup.string().email("Deve ser um E-mail válido!").required("E-mail é um campo obrigatório!"),
    organization: Yup.string().required("Organização é um campo obrigatório!"),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: userData.fullName,
      email: userData.email,
      birthdate: userData.birthdate,
      gender: userData.gender,
      profile: userData.profile,
      organization: userData.organization,
    },
  });

  const { errors } = formState;

  // useEffect(() => {
  //   axios.get(config.baseUrl + '/user', {
  //       params: {
  //         id: user.id
  //       }
  //     })
  //     .then(res => {
  //       setUserData(res.data);
  //       reset(res.data);
  //     })
  //     .catch(() => {
  //       setAlert(true);
  //     });
  // }, [user.id, editMode, reset, setAlert]);

  // useEffect(() => {
  //   return () => {
  //     setAlert(false);
  //   };
  // }, [setAlert]);

  const handleSubmitForm = (data) => {
    // Converter a data para o formato DD/MM/AAAA
    const formattedBirthdate = data.birthdate.split("-").reverse().join("/"); // "yyyy-MM-dd" -> "dd/MM/yyyy"

    axios
      .put(config.baseUrl + "/user/update", {
        email: data.email,
        fullName: data.fullName,
        gender: data.gender,
        birthdate: formattedBirthdate, // Envia a data no formato "DD/MM/AAAA"
        profile: data.profile,
        organization: data.organization,
      })
      .then((res) => {
        console.log(res.data);
        res.data.birthdate = createDateFromString(res.data.birthdate);
        setUserData(res.data);
        setModalVisibility(true);
      })
      .catch((err) => {
        setAlert({
          message: "Desculpe, servidor indisponível no momento",
          icon: "wifioff",
          type: "warning",
        });
      });
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png"];
    const maxSize = 3 * 1024 * 1024; // 3MB

    if (!validTypes.includes(file.type)) {
      //validation message
      return;
    }

    if (file.size > maxSize) {
      //validation message
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    axios.put(`${URL}/user`, formData).then((response) => {
      setUserData((prevData) =>
        ({
          ...prevData,
          avatar: response.data.avatar, // Supondo que a resposta contenha a URL da nova imagem
        }.catch((error) => {
          setAlert({
            message: "Erro ao fazer upload da imagem",
            icon: "error",
            type: "warning",
          });
        }))
      );
    });
  };

  if (userData === null) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className={styles.Profile}>
      <header>
        <img src={userData.avatar || images.defaultProfile} alt="Foto do usuário" width="80" height="80" />
        <p>{userData.fullName || "undefined"}</p>
        <input
          type="file"
          id="avatar-input"
          accept="image/jpeg, image/png"
          onChange={handleAvatarUpload}
          style={{ display: "none" }}
        />
        <label htmlFor="avatar-input" className={styles.inputAvatar}>
          Editar foto de perfil
        </label>
      </header>
      <hr />
      {!editMode ? (
        <section>
          <DataView legend="E-mail" data={userData.email} id="viewEmail" />
          <DataView legend="Gênero" data={userData.gender} id="viewGender" />
          <DataView legend="Data de nascimento" data={userData.birthdate} id="viewBirthDate" />
          <DataView legend="Perfil" data={userData.profile} id="viewProfile" />
          <DataView legend="Organização" data={userData.organization} id="viewOrganization" />
          <button onClick={() => editarValores(true)} className={styles.Profile__PrimaryButton} type="button">
            Editar dados
          </button>
        </section>
      ) : (
        <section>
          <form onSubmit={handleSubmit(handleSubmitForm)} className={styles.Profile__EditForm}>
            <div>
              <label htmlFor="fullName">Nome Completo</label>
              <input
                {...register("fullName")}
                type="text"
                name="fullName"
                id="fullName"
                required={errors.fullName ? true : false}
              />
              {errors.fullName && <p className={styles.card__error}>{errors.fullName.message}</p>}
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
              {errors.email && <p className={styles.card__error}>{errors.email.message}</p>}
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
              {errors.birthdate && <p className={styles.card__error}>{errors.birthdate.message}</p>}
            </div>
            <div>
              <InputDropdown
                label="Perfil"
                registerName="profile"
                register={register}
                name="profile"
                id="profile"
                // data={[
                //   { label: "Estudante", value: "Estudante" },
                //   { label: "Professor", value: "Professor" },
                //   { label: "Profissional da indústria", value: "Profissional da indústria" },
                //   { label: "Outro", value: "Outro" },
                // ]}

                data={[
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
                ]}
              ></InputDropdown>
            </div>
            <div>
              <InputDropdown
                label="Gênero"
                registerName="gender"
                register={register}
                name="gender"
                id="gender"
                // data={[
                //   { label: "Feminino", value: "female" },
                //   { label: "Masculino", value: "male" },
                //   { label: "Transexual", value: "transsexual" },
                //   { label: "Não-binário", value: "non-binary" },
                // ]}

                data={[
                  { label: "Feminino", value: "Feminino" },
                  { label: "Masculino", value: "Masculino" },
                  { label: "Não-binário", value: "Não binário" },
                  {
                    label: "Prefiro não informar",
                    value: "Prefiro não informar",
                  },
                ]}
              ></InputDropdown>
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
              {errors.organization && <p className={styles.card__error}>{errors.organization.message}</p>}
            </div>
            <button onClick={() => editarValores(false)} className={styles.Profile__SecondaryButton} type="button">
              Cancelar
            </button>
            <button
              className={styles.Profile__PrimaryButton}
              type="submit"
              disabled={!formState.isDirty || !formState.isValid || formState.isSubmitSuccessful}
            >
              Salvar dados
            </button>
          </form>
          <Modal.Root isOpen={modalVisibility}>
            <Modal.Icon icon="checkcircle" color="var(--white)" />
            <Modal.Text title="Perfil Atualizado" description="Mudanças salvas com sucesso" />
            <Modal.Button
              primaryButton={{
                label: "Voltar para perfil",
                onClick: () => setModalVisibility(false),
              }}
            />
          </Modal.Root>
        </section>
      )}
    </div>
  );
}
